"""Pure data helpers for the DeyeCloud integration."""

_DAILY_ZERO_RECORD_KEYS = (
    "generationValue",
    "consumptionValue",
    "gridValue",
    "purchaseValue",
    "chargeValue",
    "dischargeValue",
)

_FLOAT_EPSILON = 0.001


def batched_device_serials(device_serials: list[str]) -> list[list[str]]:
    """Split serials into the maximum batch accepted by /device/latest."""
    return [
        device_serials[offset : offset + 10]
        for offset in range(0, len(device_serials), 10)
    ]


def empty_daily_record(day: str) -> dict:
    """Return an integration-generated zero daily record."""
    record = {
        "date": day,
        "_deyecloud_placeholder": True,
    }
    for key in _DAILY_ZERO_RECORD_KEYS:
        record[key] = 0.0
    return record


def _numeric_value(record: dict | None, key: str) -> float | None:
    """Return a numeric value from a daily/monthly record if possible."""
    if not record:
        return None
    try:
        value = record.get(key)
        if value is None or value == "":
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def records_look_like_same_daily_bucket(
    record: dict | None,
    reference: dict | None,
) -> bool:
    """Detect a daily record that is likely copied from the reference day."""
    if not record or not reference:
        return False

    matched_non_zero_values = 0
    reference_non_zero_keys = 0
    for key in _DAILY_ZERO_RECORD_KEYS:
        current = _numeric_value(record, key)
        previous = _numeric_value(reference, key)
        if previous is not None and previous > _FLOAT_EPSILON:
            reference_non_zero_keys += 1
        if current is None or previous is None:
            continue

        # The cloud can serve a slightly older snapshot of yesterday rather
        # than an exact copy, so allow the same 2% drift seen in issue logs.
        tolerance = max(_FLOAT_EPSILON, previous * 0.02)
        if previous > _FLOAT_EPSILON and abs(current - previous) <= tolerance:
            matched_non_zero_values += 1

    if reference_non_zero_keys == 0:
        return False

    required_matches = min(2, reference_non_zero_keys)
    return matched_non_zero_values >= required_matches


def should_reject_stale_today(
    record: dict | None,
    yesterday: dict | None,
    cached_today: dict | None,
    *,
    in_midnight_guard: bool,
) -> bool:
    """Return whether a Today candidate is demonstrably yesterday's bucket."""
    guarding_placeholder = bool(
        cached_today and cached_today.get("_deyecloud_placeholder")
    )
    return (
        (in_midnight_guard or guarding_placeholder)
        and records_look_like_same_daily_bucket(record, yesterday)
    )


def unique_keys(keys) -> list[str]:
    """Return non-empty string keys once each, preserving order.

    /device/measurePoints can list the same key twice (seen for
    GeneratorFrequency/GenVoltage), which produced duplicate unique IDs.
    """
    seen = set()
    result = []
    for key in keys:
        if isinstance(key, str) and key and key not in seen:
            seen.add(key)
            result.append(key)
    return result


def derive_today_from_month(
    day: str,
    month_record: dict | None,
    previous_days: list[dict],
    cached_today: dict | None,
) -> dict | None:
    """Derive Today as current-month total minus the month's earlier days.

    On the last day of a month DeyeCloud returns no daily bucket for the
    in-progress day: it needs endAt >= tomorrow, and any range ending in a
    month that has not started yet comes back empty (issue #25). The monthly
    bucket does include today, so subtract the already-closed days.
    """
    if not month_record:
        return None

    record = {"date": day, "_deyecloud_derived": True}
    for key in _DAILY_ZERO_RECORD_KEYS:
        month_total = _numeric_value(month_record, key)
        if month_total is None:
            record[key] = None
            continue
        closed = sum(_numeric_value(item, key) or 0.0 for item in previous_days)
        value = max(0.0, round(month_total - closed, 2))

        # Monthly and daily buckets are rounded separately, so the difference
        # can wobble by ~0.1 kWh. Today is total_increasing: never let it
        # drop within the same day or HA would count a meter reset.
        if cached_today and cached_today.get("date") == day:
            previous = _numeric_value(cached_today, key)
            if previous is not None and previous > value:
                value = previous
        record[key] = value

    return record


def optimizer_production(
    data_list,
    day: str,
    previous: dict | None = None,
) -> dict:
    """Today / current-month production of one optimizer.

    `data_list` is the `dataList` of /device/history with granularity 2
    (one bucket per day) requested from the first day of the month to
    `day`. Optimizers only report a daily `Production` bucket through the
    OpenAPI; their live power is not exposed (issue #28).
    """
    today = 0.0
    month = 0.0
    for bucket in data_list or []:
        if not isinstance(bucket, dict):
            continue
        value = None
        for item in bucket.get("itemList") or []:
            if isinstance(item, dict) and item.get("key") == "Production":
                try:
                    value = float(item.get("value"))
                except (TypeError, ValueError):
                    value = None
                break
        if value is None:
            continue
        month += value
        if str(bucket.get("time")) == day:
            today = value

    today = round(today, 2)
    month = round(month, 2)
    # Both are total_increasing meters: never let cloud rounding move them
    # backwards within the same day / month.
    if previous and previous.get("date") == day:
        today = max(today, previous.get("today") or 0.0)
    if previous and str(previous.get("date", ""))[:7] == day[:7]:
        month = max(month, previous.get("month") or 0.0)
    return {"date": day, "today": today, "month": month}
