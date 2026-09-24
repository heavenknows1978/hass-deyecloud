"""DeyeCloud remote-control services (#13, #22)."""

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, device_registry as dr

from .const import DOMAIN
from .control_payloads import (
    STRATEGIES,
    WEEK_DAYS,
    WORK_MODES,
    ControlPayloadError,
    build_strategy_payload,
    build_tou_items,
    normalize_days,
)

SERVICE_SET_TIME_OF_USE = "set_time_of_use"
SERVICE_SET_BATTERY_STRATEGY = "set_battery_strategy"
SERVICE_READ_SETTINGS = "read_settings"

_TARGET = {
    vol.Optional("device_id"): cv.string,
    vol.Optional("device_sn"): cv.string,
}

_SLOT = vol.Schema({
    vol.Required("time"): cv.string,
    vol.Required("power"): vol.Coerce(int),
    vol.Required("soc"): vol.Coerce(int),
    vol.Optional("grid_charge", default=False): cv.boolean,
    vol.Optional("generation", default=True): cv.boolean,
})

SET_TIME_OF_USE_SCHEMA = vol.Schema({
    **_TARGET,
    vol.Optional("enabled", default=True): cv.boolean,
    vol.Optional("days"): vol.All(cv.ensure_list, [vol.In(WEEK_DAYS)]),
    vol.Required("slots"): vol.All(cv.ensure_list, [_SLOT]),
})

SET_BATTERY_STRATEGY_SCHEMA = vol.Schema({
    **_TARGET,
    vol.Required("strategy"): vol.In(STRATEGIES),
    vol.Required("target_soc"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100)),
    vol.Optional("power"): vol.All(vol.Coerce(int), vol.Range(min=0)),
    vol.Optional("work_mode"): vol.In(WORK_MODES),
})

READ_SETTINGS_SCHEMA = vol.Schema(_TARGET)


def _resolve_target(hass: HomeAssistant, call: ServiceCall) -> tuple[dict, str]:
    """Return (entry_data, device_sn) for the inverter a call targets."""
    device_sn = call.data.get("device_sn")
    device_id = call.data.get("device_id")
    if device_id and not device_sn:
        device = dr.async_get(hass).async_get(device_id)
        if device:
            device_sn = next(
                (ident for domain, ident in device.identifiers if domain == DOMAIN),
                None,
            )

    candidates = [
        (entry_data, sn)
        for entry_data in hass.data.get(DOMAIN, {}).values()
        if isinstance(entry_data, dict) and "controller" in entry_data
        for sn in entry_data["inverters"]
    ]
    if not candidates:
        raise ServiceValidationError(
            "Remote control is not enabled. Enable it under DeyeCloud → Configure."
        )
    if device_sn:
        for entry_data, sn in candidates:
            if sn == str(device_sn):
                return entry_data, sn
        raise ServiceValidationError(f"No controllable DeyeCloud inverter {device_sn}")
    if len(candidates) == 1:
        return candidates[0]
    raise ServiceValidationError(
        "Several inverters are available; set device_id or device_sn"
    )


async def _async_set_time_of_use(hass: HomeAssistant, call: ServiceCall) -> None:
    entry_data, sn = _resolve_target(hass, call)
    try:
        payload = {
            "deviceSn": sn,
            "touAction": "on" if call.data["enabled"] else "off",
            "touDays": normalize_days(call.data.get("days")),
            "timeUseSettingItems": build_tou_items(
                call.data["slots"],
                entry_data["inverters"][sn]["max_power"],
            ),
        }
    except ControlPayloadError as exc:
        raise ServiceValidationError(str(exc)) from exc
    await entry_data["controller"].async_command("/strategy/dynamicControl", payload)


async def _async_set_battery_strategy(hass: HomeAssistant, call: ServiceCall) -> None:
    entry_data, sn = _resolve_target(hass, call)
    max_power = entry_data["inverters"][sn]["max_power"]
    try:
        payload = build_strategy_payload(
            sn,
            call.data["strategy"],
            target_soc=call.data["target_soc"],
            power=call.data.get("power", max_power),
            max_power=max_power,
            work_mode=call.data.get("work_mode"),
        )
    except ControlPayloadError as exc:
        raise ServiceValidationError(str(exc)) from exc
    await entry_data["controller"].async_command("/strategy/dynamicControl", payload)


async def _async_read_settings(hass: HomeAssistant, call: ServiceCall) -> dict:
    entry_data, sn = _resolve_target(hass, call)
    return await entry_data["controller"].async_read_settings(sn)


def async_register_services(hass: HomeAssistant) -> None:
    """Register the DeyeCloud control services once per Home Assistant."""
    if hass.services.has_service(DOMAIN, SERVICE_SET_TIME_OF_USE):
        return

    async def set_time_of_use(call: ServiceCall) -> None:
        await _async_set_time_of_use(hass, call)

    async def set_battery_strategy(call: ServiceCall) -> None:
        await _async_set_battery_strategy(hass, call)

    async def read_settings(call: ServiceCall) -> dict:
        return await _async_read_settings(hass, call)

    hass.services.async_register(
        DOMAIN, SERVICE_SET_TIME_OF_USE, set_time_of_use, schema=SET_TIME_OF_USE_SCHEMA
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_BATTERY_STRATEGY,
        set_battery_strategy,
        schema=SET_BATTERY_STRATEGY_SCHEMA,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_READ_SETTINGS,
        read_settings,
        schema=READ_SETTINGS_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
