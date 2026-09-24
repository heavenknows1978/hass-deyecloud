"""DeyeCloud integration."""

from pathlib import Path
import logging

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import CONF_ENABLE_CONTROL, DOMAIN
from .control import DeyeCloudControlError, DeyeCloudController
from .control_entity import control_inverters
from .sensor import DeyeCloudCoordinator
from .services import async_register_services

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.BUTTON]
CONTROL_PLATFORMS: list[Platform] = [Platform.SWITCH, Platform.SELECT, Platform.NUMBER]

CARD_VERSION = "2.2.6"
CARD_STATIC_URL = "/deyecloud/frontend"
CARD_MODULE_URL = (
    f"{CARD_STATIC_URL}/deyecloud-energy-flow-card.js?v={CARD_VERSION}"
)
DATA_FRONTEND_MODULE_URL = "frontend_module_url"


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Serve and automatically load the bundled Lovelace card."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if domain_data.get(DATA_FRONTEND_MODULE_URL) == CARD_MODULE_URL:
        return

    frontend_dir = Path(__file__).parent / "frontend"
    card_file = frontend_dir / "deyecloud-energy-flow-card.js"
    if not card_file.is_file():
        _LOGGER.error("Bundled DeyeCloud frontend card is missing: %s", card_file)
        return

    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_STATIC_URL, str(frontend_dir), False)]
    )
    add_extra_js_url(hass, CARD_MODULE_URL)
    domain_data[DATA_FRONTEND_MODULE_URL] = CARD_MODULE_URL
    _LOGGER.info(
        "Registered bundled DeyeCloud Energy Flow card resource: %s",
        CARD_MODULE_URL,
    )


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the DeyeCloud integration and bundled dashboard card."""
    await _async_register_frontend(hass)
    async_register_services(hass)
    return True


async def _async_read_system_settings(controller, inverters) -> dict:
    """Read decoded /config/system values to seed control entity states."""
    system = {}
    for sn in inverters:
        try:
            values = await controller.async_read_system(sn)
        except DeyeCloudControlError as exc:
            _LOGGER.debug("Could not read system settings for %s: %s", sn, exc)
            continue
        if values:
            system[sn] = values
    return system


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up DeyeCloud from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    await _async_register_frontend(hass)
    async_register_services(hass)

    coordinator = DeyeCloudCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    entry_data = {"coordinator": coordinator, "platforms": list(PLATFORMS)}
    if entry.data.get(CONF_ENABLE_CONTROL):
        controller = DeyeCloudController(coordinator)
        inverters = control_inverters(coordinator)
        entry_data.update(
            controller=controller,
            inverters=inverters,
            system=await _async_read_system_settings(controller, inverters),
        )
        entry_data["platforms"] += CONTROL_PLATFORMS
    hass.data[DOMAIN][entry.entry_id] = entry_data

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    await hass.config_entries.async_forward_entry_setups(entry, entry_data["platforms"])

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a DeyeCloud config entry."""
    platforms = hass.data.get(DOMAIN, {}).get(entry.entry_id, {}).get("platforms", PLATFORMS)
    unload_ok = await hass.config_entries.async_unload_platforms(entry, platforms)

    if unload_ok:
        hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)

    return unload_ok


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Reload the DeyeCloud config entry."""
    unload_ok = await async_unload_entry(hass, entry)

    if not unload_ok:
        return False

    return await async_setup_entry(hass, entry)


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)
