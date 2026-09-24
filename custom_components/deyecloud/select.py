"""DeyeCloud inverter mode selects (remote control, #13/#18)."""

from homeassistant.components.select import SelectEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .control_entity import DeyeControlEntity
from .control_payloads import ENERGY_PATTERNS, WORK_MODES


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up work mode and energy pattern selects."""
    entry_data = hass.data[DOMAIN][entry.entry_id]
    entities = []
    for sn in entry_data["inverters"]:
        entities.append(DeyeWorkModeSelect(entry_data, sn))
        entities.append(DeyeEnergyPatternSelect(entry_data, sn))
    async_add_entities(entities)


class _DeyeSelect(DeyeControlEntity, SelectEntity):
    _path: str
    _field: str
    _system_key: str

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        value = self._system.get(self._system_key) or await self.async_last_state_value()
        if value in self.options:
            self._attr_current_option = value

    async def async_select_option(self, option: str) -> None:
        await self._controller.async_command(
            self._path,
            {"deviceSn": self._device_sn, self._field: option},
        )
        self._attr_current_option = option
        self.async_write_ha_state()


class DeyeWorkModeSelect(_DeyeSelect):
    """Selling first / zero export to load / zero export to CT."""

    _attr_options = list(WORK_MODES)
    _path = "/order/sys/workMode/update"
    _field = "workMode"
    _system_key = "systemWorkMode"

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "work_mode", "Work mode", "mdi:transmission-tower-export")


class DeyeEnergyPatternSelect(_DeyeSelect):
    """Battery first / load first."""

    _attr_options = list(ENERGY_PATTERNS)
    _path = "/order/sys/energyPattern/update"
    _field = "energyPattern"
    _system_key = "energyPattern"

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "energy_pattern", "Energy pattern", "mdi:battery-sync")
