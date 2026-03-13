import hashlib
import aiohttp

def _sha256(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest().lower()

async def async_get_token(session: aiohttp.ClientSession, username, password, app_id, app_secret, base_url):
    url = f"{base_url}/account/token?appId={app_id}"
    payload = {
        "appSecret": app_secret,
        "email": username,
        "password": _sha256(password),
    }
    async with session.post(url, json=payload, timeout=10) as resp:
        resp.raise_for_status()
        j = await resp.json()
        if not j.get("success"):
            raise Exception(f"Token request failed: {j.get('msg')}")
        return j["accessToken"]

async def async_control_solar_sell(session: aiohttp.ClientSession, token, base_url, device_sn, is_enable):
    """Send Solar Sell control command."""
    url = f"{base_url}/order/sys/solarSell/control"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    action = "on" if is_enable else "off"
    
    payload = {
        "action": action,
        "deviceSn": device_sn
    }
    
    async with session.post(url, json=payload, headers=headers, timeout=10) as resp:
        resp.raise_for_status()
        return await resp.json()
