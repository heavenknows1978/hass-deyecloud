"""Shared helpers for DeyeCloud remote-control entities."""

import logging

from homeassistant.const import EntityCategory
from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.restore_state import RestoreEntity

from .const import DOMAIN
from .control import settings_signal

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

    The state comes from the settings periodically read back from the
    inverter (dynamicControl/read, /config/system). Settings that cannot be
    decoded for a model keep the last value confirmed by the inverter
    (assumed state), restored across restarts.
    """

    # Key in DeyeCloudController.settings; None when it is never read back.
    _setting_key: str | None = None

    _attr_has_entity_name = True
    _attr_assumed_state = True
    _attr_entity_category = EntityCategory.CONFIG
    _attr_should_poll = False

    def __init__(self, entry_data: dict, device_sn: str, key: str, name: str, icon: str) -> None:
        self._controller = entry_data["controller"]
        self._device_sn = device_sn
        self._inverter = entry_data["inverters"][device_sn]
        self._attr_name = name
        self._attr_icon = icon
        self._attr_unique_id = f"{device_sn}_control_{key}"
        self._control_key = key

    @property
    def device_info(self):
        """Attach controls to the inverter device created by the sensors."""
        return {
            "identifiers": {(DOMAIN, self._device_sn)},
            "name": f"Deye Inverter {self._device_sn}",
            "manufacturer": "Deye",
            "model": "Inverter",
        }

    @property
    def extra_state_attributes(self) -> dict:
        """Let the energy-flow card discover controls by station."""
        attrs = {
            "station_id": self._inverter["station_id"],
            "device_sn": self._device_sn,
            "control_key": self._control_key,
        }
        read_at = self._controller.settings_read_at.get(self._device_sn)
        if read_at:
            attrs["settings_read_at"] = read_at
        return attrs

    def _apply_setting(self, value) -> None:
        """Store a restored (string) or read-back value as entity state."""
        raise NotImplementedError

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        last = await self.async_get_last_state()
        if last is not None and last.state not in ("unknown", "unavailable"):
            self._apply_setting(last.state)
        self._update_from_settings()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                settings_signal(self._device_sn),
                self._handle_settings,
            )
        )

    def _update_from_settings(self) -> bool:
        if not self._setting_key:
            return False
        value = self._controller.settings.get(self._device_sn, {}).get(self._setting_key)
        if value is None:
            return False
        self._apply_setting(value)
        return True

    @callback
    def _handle_settings(self) -> None:
        self._update_from_settings()
        # Always write: settings_read_at changed even if the value did not.
        self.async_write_ha_state()
