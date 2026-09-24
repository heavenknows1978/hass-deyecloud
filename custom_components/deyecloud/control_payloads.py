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


# Register map of Deye single-phase low-voltage hybrids (SUN-xK-SG0xLP1), as
# returned by /strategy/dynamicControl/read (hex address -> value). Other
# models use different addresses and are left undecoded.
_SINGLE_PHASE_MARKERS = ("00F4", "00F8")
_WORK_MODE_BY_VALUE = {0: "SELLING_FIRST", 1: "ZERO_EXPORT_TO_LOAD", 2: "ZERO_EXPORT_TO_CT"}
_TOU_TIME_BASE = 0x00FA
_TOU_POWER_BASE = 0x0100
_TOU_SOC_BASE = 0x010C


def _register(registers: dict, address: int):
    value = registers.get(f"{address:04X}")
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def decode_settings(registers: dict | None) -> dict:
    """Decode the dynamic-control register map into entity values.

    Returns only the settings that could be decoded; unknown models give {}.
    """
    registers = {str(k).upper().zfill(4): v for k, v in (registers or {}).items()}
    if not all(marker in registers for marker in _SINGLE_PHASE_MARKERS):
        return {}

    settings = {}
    work_mode = _register(registers, 0x00F4)
    if work_mode is not None and int(work_mode) in _WORK_MODE_BY_VALUE:
        settings["work_mode"] = _WORK_MODE_BY_VALUE[int(work_mode)]
    for key, address in (("solar_sell", 0x00F7), ("grid_charge", 0x00E8)):
        value = _register(registers, address)
        if value is not None:
            settings[key] = bool(int(value))
    tou = _register(registers, 0x00F8)
    if tou is not None:
        settings["time_of_use"] = bool(int(tou) & 1)
    for key, address in (
        ("max_charge_current", 0x00D2),
        ("max_discharge_current", 0x00D3),
        ("grid_charge_current", 0x00E6),
        ("max_sell_power", 0x00F5),
    ):
        value = _register(registers, address)
        if value is not None:
            settings[key] = int(value)

    slots = []
    for index in range(TOU_SLOT_COUNT):
        time = _register(registers, _TOU_TIME_BASE + index)
        power = _register(registers, _TOU_POWER_BASE + index)
        soc = _register(registers, _TOU_SOC_BASE + index)
        if time is None or power is None or soc is None:
            break
        hhmm = int(time)
        slots.append({
            "time": f"{hhmm // 100:02d}:{hhmm % 100:02d}",
            "power": int(power),
            "soc": int(soc),
        })
    if len(slots) == TOU_SLOT_COUNT:
        settings["time_of_use_slots"] = slots
    return settings


# Energy pattern is not part of the dynamic-control read. On single-phase
# hybrids it lives in holding register 0x00F3 and is read with a Modbus
# function-3 request through /order/customControl.
ENERGY_PATTERN_REGISTER = 0x00F3
_ENERGY_PATTERN_BY_VALUE = {0: "BATTERY_FIRST", 1: "LOAD_FIRST"}


def _modbus_crc(data: bytes) -> int:
    crc = 0xFFFF
    for byte in data:
        crc ^= byte
        for _ in range(8):
            crc = (crc >> 1) ^ 0xA001 if crc & 1 else crc >> 1
    return crc


def build_modbus_read(register: int, count: int = 1, slave: int = 1) -> str:
    """Return a Modbus RTU "read holding registers" frame as spaced hex."""
    frame = bytes([slave, 3, register >> 8, register & 0xFF, count >> 8, count & 0xFF])
    crc = _modbus_crc(frame)
    frame += bytes([crc & 0xFF, crc >> 8])
    return " ".join(f"{byte:02X}" for byte in frame)


def parse_modbus_read(response: str | None) -> list[int] | None:
    """Return register values from a function-3 response, or None if invalid."""
    try:
        data = bytes.fromhex(str(response or "").replace(" ", ""))
    except ValueError:
        return None
    if len(data) < 5 or data[1] != 3 or len(data) < 3 + data[2] + 2:
        return None
    if _modbus_crc(data[: 3 + data[2]]) != data[3 + data[2]] | (data[4 + data[2]] << 8):
        return None
    return [(data[3 + i] << 8) | data[4 + i] for i in range(0, data[2], 2)]


def decode_energy_pattern(values: list[int] | None) -> str | None:
    """Map the energy-pattern register value to the API option."""
    if not values:
        return None
    return _ENERGY_PATTERN_BY_VALUE.get(values[0])
