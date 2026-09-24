"""Shared helpers for DeyeCloud remote-control entities."""

import logging

from homeassistant.const import EntityCategory
from homeassistant.helpers.restore_state import RestoreEntity

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

# Used when the inverter does not report RatedPower.
DEFAULT_MAX_POWER = 50000


def _rated_power(device: dict) -> int:
    for item in device.get("dataList") or []:
        if item.get("key") == "RatedPower":
            try:
                value = int(float(item.get("value")))
            except (TypeError, ValueError):
                break
            if value > 0:
                return value
    return DEFAULT_MAX_POWER


def control_inverters(coordinator) -> dict[str, dict]:
    """Return {serial: {"station_id", "max_power"}} for controllable inverters."""
    inverters = {}
    for station_id, station in (coordinator.data or {}).items():
        for sn, device in (station.get("devices") or {}).items():
            if device.get("deviceType") == "INVERTER":
                inverters[str(sn)] = {
                    "station_id": str(station_id),
                    "max_power": _rated_power(device),
                }
    return inverters


class DeyeControlEntity(RestoreEntity):
    """Base for entities that change an inverter setting.

    Most inverters cannot report these settings back in a decoded form, so the
    entities keep the last value confirmed by the inverter (assumed state) and
    restore it across restarts. Values from /config/system seed the state on
    inverters that support that endpoint.
    """

    _attr_has_entity_name = True
    _attr_assumed_state = True
    _attr_entity_category = EntityCategory.CONFIG
    _attr_should_poll = False

    def __init__(self, entry_data: dict, device_sn: str, key: str, name: str, icon: str) -> None:
        self._controller = entry_data["controller"]
        self._system = entry_data.get("system", {}).get(device_sn) or {}
        self._device_sn = device_sn
        self._inverter = entry_data["inverters"][device_sn]
        self._attr_name = name
        self._attr_icon = icon
        self._attr_unique_id = f"{device_sn}_control_{key}"

    @property
    def device_info(self):
        """Attach controls to the inverter device created by the sensors."""
        return {
            "identifiers": {(DOMAIN, self._device_sn)},
            "name": f"Deye Inverter {self._device_sn}",
            "manufacturer": "Deye",
            "model": "Inverter",
        }

    async def async_last_state_value(self) -> str | None:
        """Return the restored state, ignoring unknown/unavailable."""
        last = await self.async_get_last_state()
        if last is None or last.state in ("unknown", "unavailable"):
            return None
        return last.state
