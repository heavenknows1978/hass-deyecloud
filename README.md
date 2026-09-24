
## 👤 Owner

- **Name**: Trần Công Tuấn Anh  
- **GitHub**: [@heavenknows1978](https://github.com/heavenknows1978)  
- **Repo**: [hass-deyecloud](https://github.com/heavenknows1978/hass-deyecloud)  
- **License**: MIT

# 🌞 Deye Cloud Home Assistant Integration

A custom integration to connect your Home Assistant with your Deye solar inverter via the official Deye Cloud API.

---

## 📥 Features

- 🟢 Fetch monthly data: generation, consumption, battery, grid import/export, fetching recent days information, fetching current device status
- 📈 Sensors for current & last month, today, yesterday...
- 🔃 Auto refresh every minute (no YAML needed)
- ✅ Clean and simple setup via UI
- ⚡ Bundled **DeyeCloud Energy Flow** Lovelace card (no separate frontend install)
- 🖼️ Animated realtime PV → inverter → load / battery / grid diagram
- 🔎 Automatic entity discovery by `station_id`, with multi-station selector
- 🌗 Responsive light/dark design with Vietnamese and English labels

---

## 🛠 Installation

### Option 1: Manual

1. Download or clone this repository
2. Copy `custom_components/deyecloud/` into your `/config/custom_components/` directory in Home Assistant
3. Restart Home Assistant
4. Go to **Settings → Devices & Services → Add Integration → DeyeCloud**
5. Fill in your credentials and API details

### Option 2: Via HACS

1. Go to HACS → Integrations → 3-dot menu → Custom repositories
2. Add: `https://github.com/heavenknows1978/hass-deyecloud` (as Integration)
3. Search for "DeyeCloud" in HACS Integrations and install
4. Restart Home Assistant and add via UI

---


## ⚡ Bundled Energy Flow Card

Version 2.2.0 includes a dashboard card inside the integration itself. The integration serves and loads the card module automatically, so you do **not** need to install Sunsynk Power Flow Card or add a Lovelace resource manually.

After updating the integration and restarting Home Assistant:

1. Open a dashboard and choose **Edit dashboard → Add card**.
2. Search for **DeyeCloud Energy Flow**.
3. Select the station and options in the visual editor.

Minimal YAML:

```yaml
type: custom:deyecloud-energy-flow-card
```

Full example:

```yaml
type: custom:deyecloud-energy-flow-card
station_id: "12345678"   # optional; auto-selected when only one station exists
title: FJC Solar Plant    # optional
show_daily: true
show_efficiency: true
animation: true
```

The card automatically uses the integration's station sensors for:

- Live solar generation and home consumption
- Grid import/export direction and power
- Battery charging/discharging direction, power and SOC
- Today's production, consumption, import, export, charge and discharge
- Instant self-sufficiency, on-site PV use and power-balance diagnostics

Each diagram node can be tapped to open the corresponding Home Assistant entity. The animation updates whenever Home Assistant receives a new state; the DeyeCloud integration currently polls the cloud every minute.

If the browser still has the old frontend after an update, restart Home Assistant and perform one hard refresh (`Ctrl+F5`).

---

## 🔐 Get your API Credentials

### Step 1 – Register developer account

👉 Go to: https://developer.deyecloud.com/home  
→ Register or login with your Deye Cloud credentials

### Step 2 – Create a new App

👉 Go to: https://developer.deyecloud.com/app  
→ Click **“Create App”**  
→ You'll get:

- `App ID`
- `App Secret`

Use these during integration setup.

### Step 3 – Choose correct Base URL

Depending on your region:

| Region | Base URL |
|--------|----------|
| 🇪🇺 Europe | `https://eu1-developer.deyecloud.com/v1.0` |
| 🇺🇸 US     | `https://us1-developer.deyecloud.com/v1.0` |

---

## ⚙️ Configuration Fields

| Field       | Description |
|-------------|-------------|
| Username    | Your Deye Cloud Username / Email |
| Password    | Your Deye password |
| App ID      | From developer portal |
| App Secret  | From developer portal |
| Base URL    | Based on your region |
| Start Month | First month to fetch history from (e.g. `2024-01`) |
| Company ID  | Optional. Required for some installer/business accounts |
| Update interval | Polling interval in minutes (1–60, default 1). Raise it if DeyeCloud API quotas are reached. Can be changed later under **Configure** without re-entering credentials. |

---

## 📸 Dashboard

The bundled card provides a complete visual power-flow dashboard. A ready-to-paste example is included in [`deyecloud-card.yaml`](deyecloud-card.yaml).

---

## 🧾 Troubleshooting

- Check **Settings → System → Logs** for errors
- Ensure you restarted HA after copying files
- Ensure `custom_components/deyecloud/` has correct permissions

---

## 📄 License

[MIT License](LICENSE)
