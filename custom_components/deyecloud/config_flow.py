from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    DOMAIN,
    CONF_USERNAME,
    CONF_PASSWORD,
    CONF_APP_ID,
    CONF_APP_SECRET,
    CONF_BASE_URL,
    CONF_START_MONTH,
    CONF_COMPANY_ID,
    CONF_CARD_LANGUAGE,
    DEFAULT_CARD_LANGUAGE,
    CARD_LANGUAGES,
)
from .api import async_get_token


DEFAULT_BASE_URL = "https://eu1-developer.deyecloud.com/v1.0"
DEFAULT_START_MONTH = "2024-01"

_CONNECTION_FIELDS = (
    CONF_USERNAME,
    CONF_PASSWORD,
    CONF_APP_ID,
    CONF_APP_SECRET,
    CONF_BASE_URL,
    CONF_COMPANY_ID,
)


def _data_schema(defaults: dict[str, Any] | None = None) -> vol.Schema:
    """Return config/options schema with defaults."""
    defaults = defaults or {}

    return vol.Schema({
        vol.Required(
            CONF_USERNAME,
            default=defaults.get(CONF_USERNAME, ""),
        ): str,
        vol.Required(
            CONF_PASSWORD,
            default=defaults.get(CONF_PASSWORD, ""),
        ): str,
        vol.Required(
            CONF_APP_ID,
            default=defaults.get(CONF_APP_ID, ""),
        ): str,
        vol.Required(
            CONF_APP_SECRET,
            default=defaults.get(CONF_APP_SECRET, ""),
        ): str,
        vol.Required(
            CONF_BASE_URL,
            default=defaults.get(CONF_BASE_URL, DEFAULT_BASE_URL),
        ): str,
        vol.Required(
            CONF_START_MONTH,
            default=defaults.get(CONF_START_MONTH, DEFAULT_START_MONTH),
        ): str,
        vol.Optional(
            CONF_COMPANY_ID,
            default=defaults.get(CONF_COMPANY_ID, ""),
        ): str,
        vol.Required(
            CONF_CARD_LANGUAGE,
            default=defaults.get(CONF_CARD_LANGUAGE, DEFAULT_CARD_LANGUAGE),
        ): vol.In(CARD_LANGUAGES),
    })


def _normalize_user_input(user_input: dict[str, Any]) -> dict[str, Any]:
    """Normalize form input before saving it to the config entry."""
    data = dict(user_input)

    for key in (
        CONF_USERNAME,
        CONF_PASSWORD,
        CONF_APP_ID,
        CONF_APP_SECRET,
        CONF_BASE_URL,
        CONF_START_MONTH,
        CONF_COMPANY_ID,
        CONF_CARD_LANGUAGE,
    ):
        if key in data and isinstance(data[key], str):
            data[key] = data[key].strip()

    # Keep old entries clean: do not persist an empty optional company_id.
    if not data.get(CONF_COMPANY_ID):
        data.pop(CONF_COMPANY_ID, None)

    return data


async def _async_validate_credentials_and_stations(hass, user_input: dict[str, Any]) -> None:
    """Validate credentials and ensure at least one station is accessible."""
    session = async_get_clientsession(hass)

    token = await async_get_token(
        session,
        user_input[CONF_USERNAME],
        user_input[CONF_PASSWORD],
        user_input[CONF_APP_ID],
        user_input[CONF_APP_SECRET],
        user_input[CONF_BASE_URL],
        user_input.get(CONF_COMPANY_ID),
    )

    station_url = f"{user_input[CONF_BASE_URL]}/station/list"
    headers = {"Authorization": f"Bearer {token}"}

    async with session.post(station_url, headers=headers, json={}, timeout=10) as resp:
        resp.raise_for_status()
        station_response = await resp.json()

    if not station_response.get("success", True):
        raise Exception(f"Station list request failed: {station_response.get('msg')}")

    stations = station_response.get("stationList") or []
    if not stations:
        raise NoStationsFound


class NoStationsFound(Exception):
    """Raised when credentials are valid but no stations are accessible."""


class DeyeCloudConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for DeyeCloud."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry):
        """Create the options flow."""
        return DeyeCloudOptionsFlowHandler(config_entry)

    async def async_step_user(self, user_input=None) -> FlowResult:
        """Handle the initial setup step."""
        errors = {}

        if user_input is not None:
            user_input = _normalize_user_input(user_input)

            unique_id = (
                f"{user_input[CONF_USERNAME]}:"
                f"{user_input.get(CONF_COMPANY_ID) or 'personal'}"
            )
            await self.async_set_unique_id(unique_id)
            self._abort_if_unique_id_configured()

            try:
                await _async_validate_credentials_and_stations(self.hass, user_input)

                return self.async_create_entry(
                    title=f"DeyeCloud - {user_input[CONF_USERNAME]}",
                    data=user_input,
                )

            except NoStationsFound:
                errors["base"] = "no_stations_found"
            except Exception:
                errors["base"] = "auth_failed"

        return self.async_show_form(
            step_id="user",
            data_schema=_data_schema(),
            errors=errors,
        )


class DeyeCloudOptionsFlowHandler(config_entries.OptionsFlow):
    """Handle DeyeCloud options flow.

    This flow updates entry.data because the integration currently reads
    credentials and API settings from entry.data in sensor.py and button.py.
    """

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize options flow."""
        self._config_entry = config_entry

    async def async_step_init(self, user_input=None) -> FlowResult:
        """Manage DeyeCloud configuration."""
        errors = {}

        current_data = dict(self._config_entry.data)

        if user_input is not None:
            user_input = _normalize_user_input(user_input)

            try:
                connection_changed = any(
                    user_input.get(key) != current_data.get(key)
                    for key in _CONNECTION_FIELDS
                )
                if connection_changed:
                    await _async_validate_credentials_and_stations(
                        self.hass,
                        user_input,
                    )

                self.hass.config_entries.async_update_entry(
                    self._config_entry,
                    title=f"DeyeCloud - {user_input[CONF_USERNAME]}",
                    data=user_input,
                )

                return self.async_create_entry(title="", data={})

            except NoStationsFound:
                errors["base"] = "no_stations_found"
            except Exception:
                errors["base"] = "auth_failed"

        return self.async_show_form(
            step_id="init",
            data_schema=_data_schema(current_data),
            errors=errors,
        )
