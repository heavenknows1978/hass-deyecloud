"""DeyeCloud inverter limits (remote control, #13)."""

from homeassistant.components.number import NumberEntity, NumberMode
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfElectricCurrent, UnitOfPower
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .control_entity import DeyeControlEntity

# Deye low-voltage hybrids accept up to 240 A on the battery side.
MAX_BATTERY_CURRENT = 240


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up battery current and power limit numbers."""
    entry_data = hass.data[DOMAIN][entry.entry_id]
    entities = []
    for sn in entry_data["inverters"]:
        entities.extend([
            DeyeBatteryCurrentNumber(entry_data, sn, "MAX_CHARGE_CURRENT", "max_charge_current", "Max charge current", "mdi:battery-arrow-up"),
            DeyeBatteryCurrentNumber(entry_data, sn, "MAX_DISCHARGE_CURRENT", "max_discharge_current", "Max discharge current", "mdi:battery-arrow-down"),
            DeyeGridChargeCurrentNumber(entry_data, sn),
            DeyePowerNumber(entry_data, sn, "MAX_SELL_POWER", "maxSellPower", "max_sell_power", "Max sell power", "mdi:transmission-tower-export"),
            DeyePowerNumber(entry_data, sn, "MAX_SOLAR_POWER", "maxSolarPower", "max_solar_power", "Max solar power", "mdi:solar-power-variant"),
        ])
    async_add_entities(entities)


class _DeyeNumber(DeyeControlEntity, NumberEntity):
    _attr_mode = NumberMode.BOX
    _system_key: str | None = None

    def _payload(self, value: int) -> tuple[str, dict]:
        raise NotImplementedError

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        value = self._system.get(self._system_key) if self._system_key else None
        if value is None:
            value = await self.async_last_state_value()
        try:
            self._attr_native_value = float(value) if value is not None else None
        except ValueError:
            self._attr_native_value = None

    async def async_set_native_value(self, value: float) -> None:
        path, payload = self._payload(int(round(value)))
        await self._controller.async_command(path, payload)
        self._attr_native_value = int(round(value))
        self.async_write_ha_state()


class DeyeBatteryCurrentNumber(_DeyeNumber):
    """Battery max charge / discharge current."""

    _attr_native_min_value = 0
    _attr_native_max_value = MAX_BATTERY_CURRENT
    _attr_native_step = 1
    _attr_native_unit_of_measurement = UnitOfElectricCurrent.AMPERE

    def __init__(self, entry_data, device_sn, parameter, key, name, icon):
        super().__init__(entry_data, device_sn, key, name, icon)
        self._parameter = parameter

    def _payload(self, value):
        # "paramterType" is the field name used by the DeyeCloud API.
        return "/order/battery/parameter/update", {
            "deviceSn": self._device_sn,
            "paramterType": self._parameter,
            "value": value,
        }


class DeyeGridChargeCurrentNumber(_DeyeNumber):
    """Battery charge current drawn from the grid."""

    _attr_native_min_value = 0
    _attr_native_max_value = MAX_BATTERY_CURRENT
    _attr_native_step = 1
    _attr_native_unit_of_measurement = UnitOfElectricCurrent.AMPERE

    def __init__(self, entry_data, device_sn):
        super().__init__(entry_data, device_sn, "grid_charge_current", "Grid charge current", "mdi:current-dc")

    def _payload(self, value):
        return "/strategy/dynamicControl", {
            "deviceSn": self._device_sn,
            "gridChargeAmpere": value,
        }


class DeyePowerNumber(_DeyeNumber):
    """Max sell / max solar power."""

    _attr_native_min_value = 0
    _attr_native_step = 100
    _attr_native_unit_of_measurement = UnitOfPower.WATT

    def __init__(self, entry_data, device_sn, power_type, system_key, key, name, icon):
        super().__init__(entry_data, device_sn, key, name, icon)
        self._power_type = power_type
        self._system_key = system_key
        # PV arrays are often oversized (e.g. maxSolarPower 12000 on a
        # smaller inverter, #18), so allow up to twice the rated power.
        current = self._system.get(system_key) or 0
        self._attr_native_max_value = max(2 * self._inverter["max_power"], int(current))

    def _payload(self, value):
        return "/order/sys/power/update", {
            "deviceSn": self._device_sn,
            "powerType": self._power_type,
            "value": value,
        }
