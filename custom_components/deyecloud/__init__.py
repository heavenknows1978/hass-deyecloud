"""DeyeCloud integration."""

from pathlib import Path
import logging

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.BUTTON]

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
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up DeyeCloud from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    await _async_register_frontend(hass)

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a DeyeCloud config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

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
