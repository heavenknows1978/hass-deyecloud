"""Pure payload builders for DeyeCloud remote-control commands.

Kept free of Home Assistant imports so the validation rules can be unit
tested. Endpoints and field names follow the official DeyeCloud OpenAPI
sample code (DeyeCloudDevelopers/deye-openapi-client-sample-code).
"""

import re

WORK_MODES = ("SELLING_FIRST", "ZERO_EXPORT_TO_LOAD", "ZERO_EXPORT_TO_CT")
ENERGY_PATTERNS = ("BATTERY_FIRST", "LOAD_FIRST")
BATTERY_PARAMETERS = ("MAX_CHARGE_CURRENT", "MAX_DISCHARGE_CURRENT")
POWER_TYPES = ("MAX_SELL_POWER", "MAX_SOLAR_POWER")
WEEK_DAYS = (
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
)
TOU_SLOT_COUNT = 6

# Battery strategies from the official dynamic-control samples. Every TOU slot
# gets the same target, so the strategy applies around the clock until changed.
STRATEGIES = ("force_charge", "self_consumption", "hold_soc", "feed_in")
_STRATEGY_TIMES = ("00:00", "04:00", "08:00", "12:00", "16:00", "20:00")

# /order/{orderId} status codes.
ORDER_CREATED = 0
ORDER_SENDING = 100
ORDER_SUCCESS = 666

_TIME_RE = re.compile(r"^([01]\d|2[0-3]):([0-5]\d)$")


class ControlPayloadError(ValueError):
    """Raised when a control request is invalid."""


def normalize_time(value) -> str:
    """Return HH:MM for "H:MM", "HH:MM" or "HH:MM:SS" input."""
    text = str(value or "").strip()
    parts = text.split(":")
    if len(parts) == 3:
        text = ":".join(parts[:2])
    elif len(parts) == 2 and len(parts[0]) == 1:
        text = f"0{text}"
    if not _TIME_RE.match(text):
        raise ControlPayloadError(f"Invalid time '{value}', expected HH:MM")
    return text


def _int_in_range(name: str, value, low: int, high: int) -> int:
    try:
        number = int(value)
    except (TypeError, ValueError) as exc:
        raise ControlPayloadError(f"{name} must be a whole number") from exc
    if not low <= number <= high:
        raise ControlPayloadError(f"{name} must be between {low} and {high}")
    return number


def normalize_days(days) -> list[str]:
    """Return TOU days in API order; empty/None means every day."""
    if not days:
        return list(WEEK_DAYS)
    wanted = {str(day).strip().upper() for day in days}
    unknown = wanted - set(WEEK_DAYS)
    if unknown:
        raise ControlPayloadError(f"Unknown day(s): {', '.join(sorted(unknown))}")
    return [day for day in WEEK_DAYS if day in wanted]


def build_tou_items(slots, max_power: int) -> list[dict]:
    """Validate six TOU slots and convert them to timeUseSettingItems."""
    slots = list(slots or [])
    if len(slots) != TOU_SLOT_COUNT:
        raise ControlPayloadError(
            f"Time of use needs exactly {TOU_SLOT_COUNT} slots, got {len(slots)}"
        )

    items = []
    seen_times = set()
    for index, slot in enumerate(slots, start=1):
        if not isinstance(slot, dict):
            raise ControlPayloadError(f"Slot {index} must be a mapping")
        time = normalize_time(slot.get("time"))
        if time in seen_times:
            raise ControlPayloadError(f"Slot {index} repeats start time {time}")
        seen_times.add(time)
        items.append({
            "time": time,
            "power": _int_in_range(f"Slot {index} power", slot.get("power"), 0, max_power),
            "soc": _int_in_range(f"Slot {index} soc", slot.get("soc"), 0, 100),
            "enableGridCharge": bool(slot.get("grid_charge", False)),
            "enableGeneration": bool(slot.get("generation", True)),
        })
    return items


def build_strategy_payload(
    device_sn: str,
    strategy: str,
    *,
    target_soc: int,
    power: int,
    max_power: int,
    work_mode: str | None = None,
) -> dict:
    """Build a /strategy/dynamicControl payload for a battery strategy.

    Mirrors the official samples:
    - force_charge: charge from the grid up to a high SOC (cheap tariff)
    - self_consumption: run on solar/battery down to a reserve SOC
    - hold_soc: keep the battery at a fixed SOC (idle)
    - feed_in: export as much as possible down to a reserve SOC
    """
    if strategy not in STRATEGIES:
        raise ControlPayloadError(f"Unknown strategy '{strategy}'")
    target_soc = _int_in_range("target_soc", target_soc, 0, 100)
    power = _int_in_range("power", power, 0, max_power)

    grid_charge = strategy == "force_charge"
    slot = {
        "power": power,
        "soc": target_soc,
        "enableGridCharge": grid_charge,
        "enableGeneration": True,
    }
    payload = {
        "deviceSn": str(device_sn),
        "touAction": "on",
        "touDays": list(WEEK_DAYS),
        "timeUseSettingItems": [dict(slot, time=time) for time in _STRATEGY_TIMES],
    }

    if strategy == "force_charge":
        payload["gridChargeAction"] = "on"
        payload["workMode"] = work_mode or "ZERO_EXPORT_TO_CT"
    elif strategy == "self_consumption":
        payload["solarSellAction"] = "on"
        payload["workMode"] = work_mode or "ZERO_EXPORT_TO_CT"
    elif strategy == "hold_soc":
        payload["solarSellAction"] = "on"
        payload["workMode"] = work_mode or "SELLING_FIRST"
    else:  # feed_in
        payload["solarSellAction"] = "on"
        payload["maxSellPower"] = max_power
        payload["maxSolarPower"] = max_power
        payload["workMode"] = work_mode or "SELLING_FIRST"

    if payload["workMode"] not in WORK_MODES:
        raise ControlPayloadError(f"Unknown work mode '{payload['workMode']}'")
    return payload


def order_finished(order: dict) -> bool:
    """Return True once /order/{orderId} reached a final status."""
    return order.get("status") not in (ORDER_CREATED, ORDER_SENDING)


def order_succeeded(order: dict) -> bool:
    """Return True if the inverter acknowledged the command."""
    return order.get("status") == ORDER_SUCCESS
