"""Remote control of Deye inverters through the DeyeCloud OpenAPI (#13)."""

import asyncio
from datetime import datetime, timezone
import json
import logging

import aiohttp

from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_send

from .const import DOMAIN
from .control_payloads import decode_settings, order_finished, order_succeeded

_LOGGER = logging.getLogger(__name__)

# Commands are delivered through the logger, which usually answers within a
# few seconds but can take a minute when the link is busy.
ORDER_POLL_INTERVAL = 3
ORDER_TIMEOUT = 90
# Settings writes are idempotent, so a command the inverter did not answer
# (seen as status 500 / error "540") is retried once.
ORDER_ATTEMPTS = 2


def settings_signal(device_sn: str) -> str:
    """Dispatcher signal sent when an inverter's settings were read."""
    return f"{DOMAIN}_settings_{device_sn}"


class DeyeCloudControlError(HomeAssistantError):
    """Raised when DeyeCloud rejects or the inverter does not confirm a command."""


class DeyeCloudController:
    """Send commands for the devices of one config entry and confirm them."""

    def __init__(self, coordinator) -> None:
        self._coordinator = coordinator
        # One command at a time per inverter: DeyeCloud queues orders per
        # device and overlapping writes make the result ambiguous.
        self._locks: dict[str, asyncio.Lock] = {}
        # Last decoded settings per inverter, see decode_settings().
        self.settings: dict[str, dict] = {}
        self.settings_read_at: dict[str, str] = {}

    async def _request(self, method: str, path: str, payload: dict | None = None) -> dict:
        coordinator = self._coordinator
        for attempt in range(2):
            token = await coordinator.async_ensure_token()
            try:
                async with coordinator.session.request(
                    method,
                    f"{coordinator.base_url}{path}",
                    headers={"Authorization": f"Bearer {token}"},
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=15),
                ) as resp:
                    if resp.status == 401 and attempt == 0:
                        coordinator.invalidate_token()
                        continue
                    resp.raise_for_status()
                    return await resp.json(content_type=None)
            except (aiohttp.ClientError, asyncio.TimeoutError) as exc:
                raise DeyeCloudControlError(f"DeyeCloud request {path} failed: {exc}") from exc
        raise DeyeCloudControlError(f"DeyeCloud request {path} was not authorized")

    async def _async_wait_for_order(self, order_id) -> dict:
        loop = asyncio.get_running_loop()
        deadline = loop.time() + ORDER_TIMEOUT
        while True:
            await asyncio.sleep(ORDER_POLL_INTERVAL)
            order = await self._request("GET", f"/order/{order_id}")
            if order_finished(order):
                return order
            if loop.time() >= deadline:
                return order

    async def async_command(self, path: str, payload: dict) -> dict:
        """Send a command and wait until the inverter confirms it."""
        device_sn = str(payload.get("deviceSn"))
        lock = self._locks.setdefault(device_sn, asyncio.Lock())
        async with lock:
            last_error = "no response"
            for attempt in range(1, ORDER_ATTEMPTS + 1):
                response = await self._request("POST", path, payload)
                if not response.get("success"):
                    raise DeyeCloudControlError(
                        f"DeyeCloud rejected {path}: {response.get('msg') or response.get('code')}"
                    )
                order_id = response.get("orderId")
                if not order_id:
                    # Some endpoints apply synchronously and return no order.
                    return response

                order = await self._async_wait_for_order(order_id)
                if order_succeeded(order):
                    _LOGGER.info("DeyeCloud command %s confirmed for %s (order %s)", path, device_sn, order_id)
                    return order

                last_error = (
                    f"status {order.get('status')}, error {order.get('error')}"
                    if order_finished(order)
                    else "timed out waiting for the inverter"
                )
                _LOGGER.warning(
                    "DeyeCloud command %s for %s not confirmed (attempt %d/%d): %s",
                    path,
                    device_sn,
                    attempt,
                    ORDER_ATTEMPTS,
                    last_error,
                )
            raise DeyeCloudControlError(
                f"Inverter {device_sn} did not confirm {path}: {last_error}"
            )

    async def async_read_settings(self, device_sn: str) -> dict:
        """Read the inverter settings that dynamic control can change.

        Returns the raw register map (hex address -> value) reported by the
        inverter, plus the decoded /config/system values where supported.
        """
        order = await self.async_command(
            "/strategy/dynamicControl/read",
            {"deviceSn": str(device_sn)},
        )
        registers = order.get("analysisResult")
        if isinstance(registers, str):
            try:
                registers = json.loads(registers)
            except ValueError:
                registers = {"raw": registers}

        result = {
            "device_sn": str(device_sn),
            "registers": registers or {},
            "decoded": decode_settings(registers),
        }
        system = await self.async_read_system(device_sn)
        if system:
            result["system"] = system
        return result

    async def async_refresh_settings(self, device_sn: str) -> dict:
        """Read settings from the inverter and push them to the entities."""
        result = await self.async_read_settings(device_sn)
        settings = dict(result["decoded"])
        system = result.get("system") or {}
        # Decoded /config/system values are authoritative where available.
        for key, system_key in (
            ("work_mode", "systemWorkMode"),
            ("energy_pattern", "energyPattern"),
            ("max_sell_power", "maxSellPower"),
            ("max_solar_power", "maxSolarPower"),
        ):
            if system.get(system_key) is not None:
                settings[key] = system[system_key]
        self.settings[str(device_sn)] = settings
        self.settings_read_at[str(device_sn)] = datetime.now(timezone.utc).isoformat()
        async_dispatcher_send(self._coordinator.hass, settings_signal(str(device_sn)))
        return settings

    async def async_read_system(self, device_sn: str) -> dict | None:
        """Return decoded /config/system values, or None if unsupported.

        Some inverters answer "config point not supported" (2106001).
        """
        response = await self._request("POST", "/config/system", {"deviceSn": str(device_sn)})
        if not response.get("success"):
            return None
        return {
            key: response[key]
            for key in (
                "systemWorkMode",
                "energyPattern",
                "maxSellPower",
                "maxSolarPower",
                "zeroExportPower",
            )
            if key in response
        }
