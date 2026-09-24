# Changelog

## 2.4.1

- Control entities now show the inverter's real settings instead of `unknown`. Settings are read back from the inverter shortly after startup and every 30 minutes (`/strategy/dynamicControl/read`) and decoded for Deye single-phase hybrids (SUN-xK-SG0xLP1): work mode, grid charge, solar sell, time of use, max charge/discharge current, grid charge current and max sell power.
- `deyecloud.read_settings` now also returns the decoded values, including the six time-of-use slots.
- Energy pattern and max solar power stay unknown until set, because these inverters do not report them.
- Startup no longer waits for `/config/system`; settings are read in the background.

## 2.4.0

- Added experimental remote control (#13), off by default behind the new **Enable remote control** option:
  - Selects: work mode, energy pattern.
  - Switches: grid charge, solar sell, time of use.
  - Numbers: max charge/discharge current, grid charge current, max sell/solar power.
  - Services: `deyecloud.set_time_of_use`, `deyecloud.set_battery_strategy` (force charge, self consumption/backup reserve, hold SOC, feed-in) and `deyecloud.read_settings` (#18).
- Every command is confirmed through `/order/{orderId}`, retried once if the inverter does not answer, and reported as an error otherwise.
- The data coordinator is now created once per config entry and shared by all platforms, so an unreachable DeyeCloud now raises `ConfigEntryNotReady` before any platform is set up.

## 2.2.6

- Fixed sensor setup on Home Assistant 2026.8+ by passing the config entry to the data coordinator explicitly (#19). Minimum Home Assistant version is now 2024.11.
- Fixed Today sensors freezing on the last day of every month (#25). DeyeCloud returns no daily bucket for the in-progress last day of a month, so Today is now derived from the current-month total minus the closed days.
- Current-month sensors now refresh every 15 minutes instead of up to every 6 hours (#27).
- Added a configurable update interval (1–60 minutes) to the setup and options forms (#29). Changing only the interval or start month no longer re-validates credentials.
- Reduced API calls per poll: the station device list is cached for one hour.
- Micro inverters, batteries, meters, optimizers and other non-collector devices in a station are now discovered, and devices are named after their actual type (#26, #28).
- Fixed duplicate unique ID errors (`GeneratorFrequency`, `GenVoltage`) caused by repeated keys in `/device/measurePoints`.
- Added a selectable card language (Home Assistant / English / Russian / Vietnamese) and a Russian translation (#21, thanks @hacky-swan).

## 2.2.5

- Fixed the permanent loading spinner in Home Assistant's card picker.
- Mutated `window.customCards` in place instead of replacing the registry array.
- Added a fresh `deyecloud-energy-flow-card-v3` custom element to bypass stale browser registrations.
- Corrected the backend frontend-file existence check to validate the file that is actually served.
- Added stale DeyeCloud card metadata cleanup without breaking Home Assistant's registry reference.
- Preserved legacy YAML compatibility through the existing `custom:deyecloud-energy-flow-card` alias.

## 2.2.3

- Fixed the frontend resource cache key still using `v=2.2.1`.
- Disabled long-lived HTTP caching for the bundled development resource path.
- Disabled live card-picker preview to prevent `Custom element not found` race errors.
- Replaces stale `window.customCards` metadata entries when a newer card version loads.
- Registers the frontend resource from both integration setup paths for improved reliability.
- Added the exact registered module URL to the Home Assistant log.

## 2.2.2

- Redesigned the realtime diagram section with a cleaner, more spacious layout.
- Reduced visual crowding between Solar, Battery, Inverter, Grid and Home nodes.
- Made node cards larger and easier to read in narrow dashboard columns.
- Showed line power badges only when a power flow is active to reduce clutter.
- Fixed intermittent card render errors by hardening language detection and adding render error fallback.
- Replaced the `hass-more-info` event with `CustomEvent` for better compatibility.
- Added a safe in-card error state instead of a broken card when runtime issues occur.

# Changelog

## 2.2.0

- Bundled the new `custom:deyecloud-energy-flow-card` frontend card.
- Automatically serves and loads the card through the DeyeCloud integration.
- Added animated PV, battery, grid, inverter and load power-flow visualization.
- Added automatic entity discovery by `station_id` and `metric_key`.
- Added visual card editor, multi-station selection and Home Assistant 2026.6 entity suggestions.
- Added daily energy summary and live efficiency diagnostics.
- Added Vietnamese/English labels, responsive layout and light/dark theme support.
- Added normalized sensor attributes (`sensor_type`, `metric_key`, station metadata) for reliable frontend discovery.
