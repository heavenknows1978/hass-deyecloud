"""DeyeCloud inverter switches (remote control, #13)."""

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .control_entity import DeyeControlEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up grid charge, solar sell and time-of-use switches."""
    entry_data = hass.data[DOMAIN][entry.entry_id]
    entities = []
    for sn in entry_data["inverters"]:
        entities.append(DeyeGridChargeSwitch(entry_data, sn))
        entities.append(DeyeSolarSellSwitch(entry_data, sn))
        entities.append(DeyeTimeOfUseSwitch(entry_data, sn))
    async_add_entities(entities)


class _DeyeSwitch(DeyeControlEntity, SwitchEntity):
    _path: str

    def _payload(self, on: bool) -> dict:
        raise NotImplementedError

    def _apply_setting(self, value) -> None:
        if isinstance(value, bool):
            self._attr_is_on = value
        elif value in ("on", "off"):
            self._attr_is_on = value == "on"

    async def _async_set(self, on: bool) -> None:
        await self._controller.async_command(self._path, self._payload(on))
        self._attr_is_on = on
        self.async_write_ha_state()

    async def async_turn_on(self, **kwargs) -> None:
        await self._async_set(True)

    async def async_turn_off(self, **kwargs) -> None:
        await self._async_set(False)


class DeyeGridChargeSwitch(_DeyeSwitch):
    """Allow charging the battery from the grid."""

    _path = "/order/battery/modeControl"
    _setting_key = "grid_charge"

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "grid_charge", "Grid charge", "mdi:battery-charging-high")

    def _payload(self, on: bool) -> dict:
        return {
            "deviceSn": self._device_sn,
            "batteryModeType": "GRID_CHARGE",
            "action": "on" if on else "off",
        }


class DeyeSolarSellSwitch(_DeyeSwitch):
    """Allow exporting solar power to the grid."""

    _path = "/order/sys/solarSell/control"
    _setting_key = "solar_sell"

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "solar_sell", "Solar sell", "mdi:solar-power")

    def _payload(self, on: bool) -> dict:
        return {"deviceSn": self._device_sn, "action": "on" if on else "off"}


class DeyeTimeOfUseSwitch(_DeyeSwitch):
    """Enable the inverter's time-of-use schedule."""

    _path = "/strategy/dynamicControl"
    _setting_key = "time_of_use"

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "time_of_use", "Time of use", "mdi:clock-time-four-outline")

    @property
    def extra_state_attributes(self) -> dict:
        attrs = super().extra_state_attributes
        slots = self._controller.settings.get(self._device_sn, {}).get("time_of_use_slots")
        if slots:
            attrs["slots"] = slots
        return attrs

    def _payload(self, on: bool) -> dict:
        # Fields left out of dynamicControl keep their current value, so this
        # only toggles the schedule without touching its slots.
        return {"deviceSn": self._device_sn, "touAction": "on" if on else "off"}
