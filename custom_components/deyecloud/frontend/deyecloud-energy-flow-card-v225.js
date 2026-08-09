const CARD_VERSION = "2.2.6";
const CARD_TAG = "deyecloud-energy-flow-card-v3";
const LEGACY_CARD_TAG = "deyecloud-energy-flow-card";
const EDITOR_TAG = "deyecloud-energy-flow-card-v3-editor";
const LEGACY_EDITOR_TAG = "deyecloud-energy-flow-card-editor";

const POWER_METRICS = {
  solar_power: {
    sensorType: "station_latest",
    metricKey: "generationPower",
    legacyMetric: "Solar Generation Power",
  },
  load_power: {
    sensorType: "station_latest",
    metricKey: "consumptionPower",
    legacyMetric: "Load Power",
  },
  grid_export_power: {
    sensorType: "station_latest",
    metricKey: "gridPower",
    legacyMetric: "Grid Export Power",
  },
  grid_import_power: {
    sensorType: "station_latest",
    metricKey: "purchasePower",
    legacyMetric: "Grid Import Power",
  },
  grid_net_power: {
    sensorType: "station_latest",
    metricKey: "wirePower",
    legacyMetric: "Grid Net Power",
  },
  battery_charge_power: {
    sensorType: "station_latest",
    metricKey: "chargePower",
    legacyMetric: "Battery Charge Power",
  },
  battery_discharge_power: {
    sensorType: "station_latest",
    metricKey: "dischargePower",
    legacyMetric: "Battery Discharge Power",
  },
  battery_power: {
    sensorType: "station_latest",
    metricKey: "batteryPower",
    legacyMetric: "Battery Power",
  },
  battery_soc: {
    sensorType: "station_latest",
    metricKey: "batterySOC",
    legacyMetric: "Battery State of Charge",
  },
};

const DAILY_METRICS = {
  solar_today: { metricKey: "generationValue", name: "Solar Generation" },
  load_today: { metricKey: "consumptionValue", name: "Daily Consumption" },
  grid_export_today: { metricKey: "gridValue", name: "Daily Grid Export" },
  grid_import_today: { metricKey: "purchaseValue", name: "Daily Grid Import" },
  battery_charge_today: { metricKey: "chargeValue", name: "Daily Battery Charge" },
  battery_discharge_today: { metricKey: "dischargeValue", name: "Daily Battery Discharge" },
};

const STRINGS = {
  vi: {
    defaultTitle: "Deye Solar Energy Flow",
    live: "Đang hoạt động",
    delayed: "Dữ liệu trễ",
    unavailable: "Không có dữ liệu",
    updated: "Cập nhật",
    station: "Trạm",
    solar: "Điện mặt trời",
    inverter: "Inverter",
    home: "Tải sử dụng",
    battery: "Pin lưu trữ",
    grid: "Điện lưới",
    generating: "Đang phát",
    idle: "Đang chờ",
    charging: "Đang sạc",
    discharging: "Đang xả",
    importing: "Đang mua điện",
    exporting: "Đang bán điện",
    balanced: "Cân bằng",
    supplying: "Đang cấp tải",
    today: "Năng lượng hôm nay",
    solarToday: "Sản lượng PV",
    loadToday: "Tiêu thụ",
    importToday: "Mua từ lưới",
    exportToday: "Bán lên lưới",
    chargeToday: "Sạc pin",
    dischargeToday: "Xả pin",
    selfSufficiency: "Tự chủ tức thời",
    solarUtilization: "PV dùng tại chỗ",
    powerBalance: "Sai lệch công suất",
    dataHint: "Card tự động tìm các sensor DeyeCloud theo station_id.",
    noStation: "Chưa tìm thấy sensor của DeyeCloud",
    noStationHelp:
      "Hãy kiểm tra integration đã tạo sensor và tải lại trang Home Assistant.",
    editorStation: "Trạm DeyeCloud",
    editorTitle: "Tiêu đề tùy chỉnh",
    editorDaily: "Hiển thị năng lượng hôm nay",
    editorEfficiency: "Hiển thị chỉ số hiệu quả",
    editorAnimation: "Hiệu ứng luồng điện",
    auto: "Tự động",
    entityDetails: "Bấm vào từng khối để mở chi tiết entity",
    excellent: "Rất tốt",
    balancedLevel: "Cân bằng",
    monitoring: "Cần theo dõi",
    diagramLabel: "Luồng năng lượng mặt trời theo thời gian thực",
    errorTitle: "Không thể hiển thị card DeyeCloud",
    errorHelp:
      "Thử tải lại trình duyệt (Ctrl+F5). Nếu vẫn lỗi, hãy cập nhật integration lên bản mới nhất.",
    unknownError: "Lỗi không xác định",
    cardName: "Luồng năng lượng DeyeCloud",
    cardDescription: "Luồng điện mặt trời, pin, lưới và tải theo thời gian thực.",
  },
  ru: {
    defaultTitle: "Потоки энергии Deye",
    live: "В реальном времени",
    delayed: "Данные задерживаются",
    unavailable: "Недоступно",
    updated: "Обновлено",
    station: "Станция",
    solar: "Солнечные панели",
    inverter: "Инвертор",
    home: "Потребление дома",
    battery: "Аккумулятор",
    grid: "Электросеть",
    generating: "Генерация",
    idle: "Ожидание",
    charging: "Зарядка",
    discharging: "Разрядка",
    importing: "Потребление из сети",
    exporting: "Отдача в сеть",
    balanced: "Баланс",
    supplying: "Питание нагрузки",
    today: "Энергия за сегодня",
    solarToday: "Выработка",
    loadToday: "Потребление",
    importToday: "Получено из сети",
    exportToday: "Отдано в сеть",
    chargeToday: "Заряд аккумулятора",
    dischargeToday: "Разряд аккумулятора",
    selfSufficiency: "Текущая автономность",
    solarUtilization: "Использование солнечной энергии",
    powerBalance: "Дисбаланс мощности",
    dataHint: "Карточка автоматически находит сенсоры DeyeCloud по station_id.",
    noStation: "Сенсоры DeyeCloud не найдены",
    noStationHelp:
      "Убедитесь, что интеграция создала сенсоры, затем перезагрузите Home Assistant.",
    editorStation: "Станция DeyeCloud",
    editorTitle: "Собственный заголовок",
    editorDaily: "Показывать энергию за сегодня",
    editorEfficiency: "Показывать показатели эффективности",
    editorAnimation: "Анимация потоков энергии",
    auto: "Автоматически",
    entityDetails: "Нажмите на блок, чтобы открыть сведения о сущности",
    excellent: "Отлично",
    balancedLevel: "Сбалансировано",
    monitoring: "Требует внимания",
    diagramLabel: "Потоки солнечной энергии в реальном времени",
    errorTitle: "Не удалось отобразить карточку DeyeCloud",
    errorHelp:
      "Перезагрузите страницу в браузере (Ctrl+F5). Если ошибка повторится, обновите интеграцию до последней версии.",
    unknownError: "Неизвестная ошибка",
    cardName: "Потоки энергии DeyeCloud",
    cardDescription: "Потоки энергии солнца, аккумулятора, сети и нагрузки в реальном времени.",
  },
  en: {
    defaultTitle: "Deye Solar Energy Flow",
    live: "Live",
    delayed: "Delayed data",
    unavailable: "Unavailable",
    updated: "Updated",
    station: "Station",
    solar: "Solar array",
    inverter: "Inverter",
    home: "Home load",
    battery: "Battery",
    grid: "Utility grid",
    generating: "Generating",
    idle: "Idle",
    charging: "Charging",
    discharging: "Discharging",
    importing: "Importing",
    exporting: "Exporting",
    balanced: "Balanced",
    supplying: "Supplying load",
    today: "Today's energy",
    solarToday: "PV production",
    loadToday: "Consumption",
    importToday: "Grid import",
    exportToday: "Grid export",
    chargeToday: "Battery charge",
    dischargeToday: "Battery discharge",
    selfSufficiency: "Live self-sufficiency",
    solarUtilization: "On-site PV use",
    powerBalance: "Power imbalance",
    dataHint: "The card automatically discovers DeyeCloud sensors by station_id.",
    noStation: "No DeyeCloud sensors found",
    noStationHelp:
      "Check that the integration created sensors, then reload Home Assistant.",
    editorStation: "DeyeCloud station",
    editorTitle: "Custom title",
    editorDaily: "Show today's energy",
    editorEfficiency: "Show efficiency indicators",
    editorAnimation: "Animate power flow",
    auto: "Automatic",
    entityDetails: "Tap a node to open entity details",
    excellent: "Excellent",
    balancedLevel: "Balanced",
    monitoring: "Monitoring",
    diagramLabel: "Realtime solar energy flow",
    errorTitle: "Unable to display DeyeCloud card",
    errorHelp:
      "Try reloading the browser (Ctrl+F5). If the error persists, update the integration to the latest version.",
    unknownError: "Unknown error",
    cardName: "DeyeCloud Energy Flow",
    cardDescription: "Realtime solar, battery, grid and load power flow.",
  },
};

function browserLanguage() {
  const rawLanguage =
    document?.documentElement?.lang || window?.navigator?.language || "en";
  const language = String(rawLanguage).toLowerCase();
  if (language.startsWith("vi")) return "vi";
  if (language.startsWith("ru")) return "ru";
  return "en";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function stateNumber(stateObj) {
  if (!stateObj || ["unknown", "unavailable", "none", ""].includes(stateObj.state)) {
    return null;
  }
  const value = Number.parseFloat(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function stateUnit(stateObj, fallback = "") {
  return stateObj?.attributes?.unit_of_measurement || fallback;
}

function formatPower(value, locale = "en") {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const absolute = Math.abs(value);
  if (absolute >= 1000) {
    return `${(value / 1000).toLocaleString(locale, {
      minimumFractionDigits: absolute >= 10000 ? 1 : 2,
      maximumFractionDigits: 2,
    })} kW`;
  }
  return `${Math.round(value).toLocaleString(locale)} W`;
}

function formatEnergy(value, locale = "en") {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${value.toLocaleString(locale, {
    minimumFractionDigits: value < 10 ? 2 : 1,
    maximumFractionDigits: 2,
  })} kWh`;
}

function formatPercent(value, locale = "en") {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${Math.round(value).toLocaleString(locale)}%`;
}

function relativeTime(date, language) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (language === "ru") {
    if (seconds < 10) return "только что";
    if (seconds < 60) return `${seconds} с назад`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} мин назад`;
    return `${Math.round(minutes / 60)} ч назад`;
  }
  if (seconds < 10) return language === "vi" ? "vừa xong" : "just now";
  if (seconds < 60) return language === "vi" ? `${seconds} giây trước` : `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return language === "vi" ? `${minutes} phút trước` : `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return language === "vi" ? `${hours} giờ trước` : `${hours}h ago`;
}

function integrationLanguage(hass, stationId) {
  const stateObj = Object.values(hass?.states || {}).find((candidate) => {
    const attrs = candidate?.attributes || {};
    return (
      attrs.deyecloud_card_language &&
      (stationId === null ||
        stationId === undefined ||
        String(attrs.station_id) === String(stationId))
    );
  });
  const language = String(
    stateObj?.attributes?.deyecloud_card_language || ""
  ).toLowerCase();
  return STRINGS[language] ? language : null;
}

function iconSolar() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="48" cy="15" r="7" class="icon-sun" />
      <path d="M48 2v5M48 23v5M35 15h5M56 15h5M39 6l4 4M53 20l4 4M57 6l-4 4M43 20l-4 4" class="icon-line" />
      <path d="M10 27h35l7 25H4z" class="icon-panel" />
      <path d="M13 34h34M10 42h39M21 27l-4 25M34 27l4 25M28 52v7M16 59h25" class="icon-grid" />
    </svg>`;
}

function iconInverter() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="13" y="5" width="38" height="54" rx="9" class="icon-shell" />
      <circle cx="32" cy="23" r="10" class="icon-screen" />
      <path d="M24 23c3-6 6 6 9 0s6 6 9 0" class="icon-wave" />
      <path d="M23 43h18M27 49h10" class="icon-line" />
    </svg>`;
}

function iconHome() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 31 32 9l26 22" class="icon-roof" />
      <path d="M12 28v28h40V28L32 13z" class="icon-house" />
      <path d="M27 56V39h10v17M18 34h8v8h-8zM39 34h8v8h-8z" class="icon-detail" />
    </svg>`;
}

function iconGrid() {
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4 16 60M32 4l16 56M22 24h20M16 43h32M10 60h44" class="icon-tower" />
      <path d="M24 13h16M20 31h24M13 50h38" class="icon-line" />
    </svg>`;
}

function iconBattery(soc) {
  const fillHeight = clamp(Number.isFinite(soc) ? soc : 0, 0, 100) * 0.36;
  const fillY = 50 - fillHeight;
  return `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="20" y="5" width="24" height="5" rx="2" class="icon-terminal" />
      <rect x="12" y="9" width="40" height="48" rx="8" class="icon-battery-shell" />
      <rect x="17" y="${fillY.toFixed(1)}" width="30" height="${fillHeight.toFixed(1)}" rx="4" class="icon-battery-fill" />
      <path d="m34 18-9 16h8l-3 13 10-18h-8z" class="icon-bolt" />
    </svg>`;
}

class DeyeCloudEnergyFlowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
    this._runtimeStationId = null;
    this._lastRenderSignature = "";
  }

  static getStubConfig() {
    return {
      show_daily: true,
      show_efficiency: true,
      animation: true,
    };
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TAG);
  }

  setConfig(config) {
    // Home Assistant may briefly call setConfig with an empty or incomplete
    // value while the card picker/editor is being initialized. Never throw
    // here: throwing makes Home Assistant replace the card with the generic
    // "Configuration error" card.
    const normalized =
      config && typeof config === "object" && !Array.isArray(config)
        ? config
        : {};

    this._config = {
      show_daily: true,
      show_efficiency: true,
      animation: true,
      ...normalized,
    };
    this._runtimeStationId = normalized.station_id
      ? String(normalized.station_id)
      : null;
    this._lastRenderSignature = "";
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    let size = 5;
    if (this._config.show_efficiency !== false) size += 1;
    if (this._config.show_daily !== false) size += 2;
    return size;
  }

  getGridOptions() {
    return {
      columns: 12,
      rows: this._config.show_daily === false ? 6 : 8,
      min_columns: 6,
      min_rows: 5,
    };
  }

  _language() {
    const configuredLanguage = integrationLanguage(
      this._hass,
      this._selectedStationId()
    );
    if (configuredLanguage) return configuredLanguage;

    const rawLanguage =
      this._hass?.language ||
      this._hass?.locale?.language ||
      window?.navigator?.language ||
      "en";
    const language = String(rawLanguage).toLowerCase();
    if (language.startsWith("vi")) return "vi";
    if (language.startsWith("ru")) return "ru";
    return "en";
  }

  _strings() {
    return STRINGS[this._language()];
  }

  _allDeyeStates() {
    if (!this._hass?.states) return [];
    return Object.entries(this._hass.states).filter(([, stateObj]) =>
      stateObj?.attributes?.station_id !== undefined
    );
  }

  _stationIds() {
    const ids = new Set();
    for (const [, stateObj] of this._allDeyeStates()) {
      const id = stateObj.attributes.station_id;
      if (id !== null && id !== undefined && String(id).trim()) ids.add(String(id));
    }
    return [...ids].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }

  _selectedStationId() {
    const ids = this._stationIds();
    const configured = this._config.station_id ? String(this._config.station_id) : null;
    const candidate = this._runtimeStationId || configured;
    if (candidate && ids.includes(candidate)) return candidate;
    if (candidate && ids.length === 0) return candidate;
    return ids[0] || null;
  }

  _statesForStation(stationId) {
    return this._allDeyeStates().filter(
      ([, stateObj]) => String(stateObj.attributes.station_id) === String(stationId)
    );
  }

  _findEntity(metricName, stationId) {
    const override = this._config.entities?.[metricName];
    if (override && this._hass?.states?.[override]) {
      return { entityId: override, stateObj: this._hass.states[override] };
    }

    const powerDefinition = POWER_METRICS[metricName];
    const dailyDefinition = DAILY_METRICS[metricName];
    const candidates = this._statesForStation(stationId);
    let match;

    if (powerDefinition) {
      match = candidates.find(([, stateObj]) => {
        const attrs = stateObj.attributes || {};
        return (
          attrs.sensor_type === powerDefinition.sensorType &&
          attrs.metric_key === powerDefinition.metricKey
        );
      });

      if (!match) {
        match = candidates.find(([, stateObj]) => {
          const attrs = stateObj.attributes || {};
          const friendly = String(attrs.friendly_name || "").toLowerCase();
          return (
            attrs.metric_key === powerDefinition.metricKey ||
            attrs.metric === powerDefinition.legacyMetric ||
            friendly.includes(powerDefinition.legacyMetric.toLowerCase())
          );
        });
      }
    }

    if (dailyDefinition) {
      match = candidates.find(([, stateObj]) => {
        const attrs = stateObj.attributes || {};
        return (
          attrs.sensor_type === "daily" &&
          attrs.metric_key === dailyDefinition.metricKey &&
          attrs.relative_day === "today"
        );
      });

      if (!match) {
        match = candidates.find(([, stateObj]) => {
          const attrs = stateObj.attributes || {};
          const friendly = String(attrs.friendly_name || "").toLowerCase();
          return (
            attrs.relative_day === "today" &&
            (attrs.metric_key === dailyDefinition.metricKey ||
              friendly.includes(dailyDefinition.name.toLowerCase()))
          );
        });
      }
    }

    return match ? { entityId: match[0], stateObj: match[1] } : null;
  }

  _stationName(stationId) {
    if (this._config.title) return this._config.title;
    const candidates = this._statesForStation(stationId);
    const named = candidates.find(([, stateObj]) => stateObj.attributes?.station_name);
    return named?.[1]?.attributes?.station_name || this._strings().defaultTitle;
  }

  _latestEntityDate(entities) {
    const dates = entities
      .map((entry) => entry?.stateObj?.last_updated || entry?.stateObj?.last_changed)
      .filter(Boolean)
      .map((value) => new Date(value))
      .filter((value) => !Number.isNaN(value.getTime()));
    if (!dates.length) return null;
    return new Date(Math.max(...dates.map((value) => value.getTime())));
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  _render() {
    if (!this.shadowRoot || !this._hass) return;

    try {
      const language = this._language();
      const locale = { en: "en-US", ru: "ru-RU", vi: "vi-VN" }[language];
      const t = this._strings();
      const stationIds = this._stationIds();
      const stationId = this._selectedStationId();

      if (!stationId) {
        this.shadowRoot.innerHTML = `
          ${this._styles()}
          <ha-card class="empty-card">
            <div class="empty-visual">${iconSolar()}</div>
            <h2>${escapeHtml(t.noStation)}</h2>
            <p>${escapeHtml(t.noStationHelp)}</p>
            <span>${escapeHtml(t.dataHint)}</span>
          </ha-card>`;
        return;
      }

    const entity = (name) => this._findEntity(name, stationId);
    const entities = {
      solar: entity("solar_power"),
      load: entity("load_power"),
      gridExport: entity("grid_export_power"),
      gridImport: entity("grid_import_power"),
      gridNet: entity("grid_net_power"),
      batteryCharge: entity("battery_charge_power"),
      batteryDischarge: entity("battery_discharge_power"),
      battery: entity("battery_power"),
      soc: entity("battery_soc"),
      solarToday: entity("solar_today"),
      loadToday: entity("load_today"),
      gridExportToday: entity("grid_export_today"),
      gridImportToday: entity("grid_import_today"),
      batteryChargeToday: entity("battery_charge_today"),
      batteryDischargeToday: entity("battery_discharge_today"),
    };

    const values = {
      solar: Math.max(0, stateNumber(entities.solar?.stateObj) ?? 0),
      load: Math.max(0, stateNumber(entities.load?.stateObj) ?? 0),
      gridExport: Math.max(0, stateNumber(entities.gridExport?.stateObj) ?? 0),
      gridImport: Math.max(0, stateNumber(entities.gridImport?.stateObj) ?? 0),
      batteryCharge: Math.max(0, stateNumber(entities.batteryCharge?.stateObj) ?? 0),
      batteryDischarge: Math.max(0, stateNumber(entities.batteryDischarge?.stateObj) ?? 0),
      battery: stateNumber(entities.battery?.stateObj),
      soc: stateNumber(entities.soc?.stateObj),
      solarToday: stateNumber(entities.solarToday?.stateObj),
      loadToday: stateNumber(entities.loadToday?.stateObj),
      gridExportToday: stateNumber(entities.gridExportToday?.stateObj),
      gridImportToday: stateNumber(entities.gridImportToday?.stateObj),
      batteryChargeToday: stateNumber(entities.batteryChargeToday?.stateObj),
      batteryDischargeToday: stateNumber(entities.batteryDischargeToday?.stateObj),
    };

    const allCurrentEntities = [
      entities.solar,
      entities.load,
      entities.gridExport,
      entities.gridImport,
      entities.batteryCharge,
      entities.batteryDischarge,
      entities.soc,
    ];
    const latestDate = this._latestEntityDate(allCurrentEntities);
    const ageMs = latestDate ? Date.now() - latestDate.getTime() : Number.POSITIVE_INFINITY;
    const currentAvailable = allCurrentEntities.some((item) => stateNumber(item?.stateObj) !== null);
    const isLive = currentAvailable && ageMs <= 3 * 60 * 1000;
    const statusText = !currentAvailable ? t.unavailable : isLive ? t.live : t.delayed;
    const statusClass = !currentAvailable ? "offline" : isLive ? "online" : "delayed";

    const threshold = 5;
    const solarActive = values.solar > threshold;
    const loadActive = values.load > threshold;
    const gridImportActive = values.gridImport > threshold;
    const gridExportActive = values.gridExport > threshold;
    const batteryChargeActive = values.batteryCharge > threshold;
    const batteryDischargeActive = values.batteryDischarge > threshold;

    let batteryStatus = t.idle;
    if (batteryChargeActive) batteryStatus = t.charging;
    if (batteryDischargeActive) batteryStatus = t.discharging;

    let gridStatus = t.balanced;
    if (gridImportActive) gridStatus = t.importing;
    if (gridExportActive) gridStatus = t.exporting;

    const gridDisplayPower = gridImportActive
      ? values.gridImport
      : gridExportActive
        ? values.gridExport
        : Math.abs(stateNumber(entities.gridNet?.stateObj) ?? 0);
    const batteryDisplayPower = batteryChargeActive
      ? values.batteryCharge
      : batteryDischargeActive
        ? values.batteryDischarge
        : Math.abs(values.battery ?? 0);

    const selfSufficiency = values.load > threshold
      ? clamp(((values.load - values.gridImport) / values.load) * 100, 0, 100)
      : null;
    const solarUtilization = values.solar > threshold
      ? clamp(((values.solar - values.gridExport) / values.solar) * 100, 0, 100)
      : null;
    const balance =
      values.solar + values.gridImport + values.batteryDischarge -
      values.load - values.gridExport - values.batteryCharge;

    const signature = JSON.stringify({
      stationIds,
      stationId,
      config: this._config,
      values,
      statusText,
      language,
      latest: latestDate?.toISOString(),
    });
    if (signature === this._lastRenderSignature) return;
    this._lastRenderSignature = signature;

    const stationSelector = stationIds.length > 1
      ? `
        <label class="station-select-wrap">
          <span>${escapeHtml(t.station)}</span>
          <select id="station-select" aria-label="${escapeHtml(t.editorStation)}">
            ${stationIds
              .map(
                (id) =>
                  `<option value="${escapeHtml(id)}" ${id === stationId ? "selected" : ""}>${escapeHtml(id)}</option>`
              )
              .join("")}
          </select>
        </label>`
      : `<span class="station-id">${escapeHtml(t.station)} ${escapeHtml(stationId)}</span>`;

    const animationClass = this._config.animation === false ? "no-animation" : "";
    const node = ({ className, title, status, value, icon, entityId, badge }) => `
      <button class="flow-node ${className}" data-entity="${escapeHtml(entityId || "")}" ${entityId ? "" : "disabled"}>
        <span class="node-icon">${icon}</span>
        <span class="node-copy">
          <span class="node-title">${escapeHtml(title)}</span>
          <strong>${escapeHtml(value)}</strong>
          <span class="node-status">${escapeHtml(status)}</span>
        </span>
        ${badge ? `<span class="node-badge">${escapeHtml(badge)}</span>` : ""}
      </button>`;

    const dailyCards = [
      ["sun", t.solarToday, values.solarToday, entities.solarToday?.entityId],
      ["home", t.loadToday, values.loadToday, entities.loadToday?.entityId],
      ["import", t.importToday, values.gridImportToday, entities.gridImportToday?.entityId],
      ["export", t.exportToday, values.gridExportToday, entities.gridExportToday?.entityId],
      ["charge", t.chargeToday, values.batteryChargeToday, entities.batteryChargeToday?.entityId],
      ["discharge", t.dischargeToday, values.batteryDischargeToday, entities.batteryDischargeToday?.entityId],
    ];

    this.shadowRoot.innerHTML = `
      ${this._styles()}
      <ha-card class="energy-card ${animationClass}">
        <header class="card-header">
          <div class="brand-mark">${iconSolar()}</div>
          <div class="header-copy">
            <h2>${escapeHtml(this._stationName(stationId))}</h2>
            <div class="header-meta">
              ${stationSelector}
              <span class="status-badge ${statusClass}"><i></i>${escapeHtml(statusText)}</span>
            </div>
          </div>
          <div class="updated-at">
            <span>${escapeHtml(t.updated)}</span>
            <strong>${escapeHtml(relativeTime(latestDate, language))}</strong>
          </div>
        </header>

        <section class="diagram-stage" aria-label="${escapeHtml(t.diagramLabel)}">
          <div class="ambient ambient-one"></div>
          <div class="ambient ambient-two"></div>
          <svg class="flow-svg" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <path class="flow-base" d="M500 120 C500 160 500 190 500 238" />
            <path class="flow-base" d="M232 320 C290 320 336 320 392 320" />
            <path class="flow-base" d="M608 320 C664 320 710 320 768 320" />
            <path class="flow-base" d="M500 402 C500 442 500 478 500 520" />

            ${solarActive ? '<path class="flow-line solar-flow" d="M500 120 C500 160 500 190 500 238" />' : ""}
            ${batteryChargeActive || batteryDischargeActive ? `<path class="flow-line battery-flow ${batteryChargeActive ? "reverse" : ""}" d="M232 320 C290 320 336 320 392 320" />` : ""}
            ${gridImportActive || gridExportActive ? `<path class="flow-line grid-flow ${gridImportActive ? "reverse" : ""}" d="M608 320 C664 320 710 320 768 320" />` : ""}
            ${loadActive ? '<path class="flow-line load-flow" d="M500 402 C500 442 500 478 500 520" />' : ""}
          </svg>

          ${solarActive ? `<span class="flow-label solar-label">${escapeHtml(formatPower(values.solar, locale))}</span>` : ""}
          ${(batteryChargeActive || batteryDischargeActive) ? `<span class="flow-label battery-label">${escapeHtml(formatPower(batteryDisplayPower, locale))}</span>` : ""}
          ${(gridImportActive || gridExportActive) ? `<span class="flow-label grid-label">${escapeHtml(formatPower(gridDisplayPower, locale))}</span>` : ""}
          ${loadActive ? `<span class="flow-label load-label">${escapeHtml(formatPower(values.load, locale))}</span>` : ""}

          <div class="diagram-grid">
            <div class="node-slot solar-slot">
              ${node({
                className: `solar-node ${solarActive ? "active" : ""}`,
                title: t.solar,
                status: solarActive ? t.generating : t.idle,
                value: formatPower(values.solar, locale),
                icon: iconSolar(),
                entityId: entities.solar?.entityId,
              })}
            </div>
            <div class="node-slot battery-slot">
              ${node({
                className: `battery-node ${batteryChargeActive || batteryDischargeActive ? "active" : ""}`,
                title: t.battery,
                status: batteryStatus,
                value: formatPower(batteryDisplayPower, locale),
                icon: iconBattery(values.soc),
                entityId: entities.soc?.entityId || entities.battery?.entityId,
                badge: formatPercent(values.soc, locale),
              })}
            </div>
            <div class="node-slot inverter-slot">
              ${node({
                className: "inverter-node active",
                title: t.inverter,
                status: currentAvailable ? t.supplying : t.unavailable,
                value: formatPower(values.load + values.gridExport + values.batteryCharge, locale),
                icon: iconInverter(),
                entityId: entities.load?.entityId || entities.solar?.entityId,
              })}
            </div>
            <div class="node-slot grid-slot">
              ${node({
                className: `grid-node ${gridImportActive || gridExportActive ? "active" : ""}`,
                title: t.grid,
                status: gridStatus,
                value: formatPower(gridDisplayPower, locale),
                icon: iconGrid(),
                entityId: (gridImportActive ? entities.gridImport : entities.gridExport)?.entityId || entities.gridNet?.entityId,
              })}
            </div>
            <div class="node-slot home-slot">
              ${node({
                className: `home-node ${loadActive ? "active" : ""}`,
                title: t.home,
                status: loadActive ? t.supplying : t.idle,
                value: formatPower(values.load, locale),
                icon: iconHome(),
                entityId: entities.load?.entityId,
              })}
            </div>
          </div>
        </section>

        ${this._config.show_efficiency === false ? "" : `
          <section class="performance-section">
            <div class="efficiency-strip">
              ${this._efficiencyItem(t.selfSufficiency, selfSufficiency, "self", locale, t)}
              ${this._efficiencyItem(t.solarUtilization, solarUtilization, "solar", locale, t)}
            </div>
            <div class="balance-item ${Math.abs(balance) <= 80 ? "good" : "warn"}">
              <span class="balance-icon">${this._miniIcon("balance")}</span>
              <div class="balance-copy">
                <span>${escapeHtml(t.powerBalance)}</span>
                <small>${escapeHtml(Math.abs(balance) <= 80 ? t.balancedLevel : t.monitoring)}</small>
              </div>
              <strong>${escapeHtml(formatPower(balance, locale))}</strong>
              <div class="balance-line" aria-hidden="true">
                <i style="width:${clamp(Math.abs(balance) / 20, 4, 100)}%"></i>
              </div>
            </div>
          </section>`}

        ${this._config.show_daily === false ? "" : `
          <section class="daily-section">
            <div class="section-heading">
              <div>
                <span class="section-kicker">24H</span>
                <h3>${escapeHtml(t.today)}</h3>
              </div>
              <span>${escapeHtml(t.entityDetails)}</span>
            </div>
            <div class="daily-grid">
              ${dailyCards.map(([kind, label, value, entityId]) => `
                <button class="daily-metric ${kind}" data-entity="${escapeHtml(entityId || "")}" ${entityId ? "" : "disabled"}>
                  <span class="daily-icon">${this._miniIcon(kind)}</span>
                  <span class="daily-copy">
                    <small>${escapeHtml(label)}</small>
                    <strong>${escapeHtml(formatEnergy(value, locale))}</strong>
                  </span>
                  ${entityId ? '<span class="daily-open" aria-hidden="true">›</span>' : ''}
                </button>`).join("")}
            </div>
          </section>`}
      </ha-card>`;

    const select = this.shadowRoot.getElementById("station-select");
    if (select) {
      select.addEventListener("change", (event) => {
        this._runtimeStationId = event.target.value;
        this._lastRenderSignature = "";
        this._render();
      });
    }

    this.shadowRoot.querySelectorAll("[data-entity]").forEach((element) => {
      const entityId = element.dataset.entity;
      if (!entityId) return;
      element.addEventListener("click", () => this._moreInfo(entityId));
    });

    } catch (error) {
      console.error("DeyeCloud Energy Flow Card render error", error);
      this._renderError(error);
    }
  }

  _renderError(error) {
    const t = this._strings();
    const details = error?.message ? escapeHtml(error.message) : t.unknownError;
    this.shadowRoot.innerHTML = `
      ${this._styles()}
      <ha-card class="empty-card error-card">
        <div class="empty-visual">${this._miniIcon("balance")}</div>
        <h2>${escapeHtml(t.errorTitle)}</h2>
        <p>${escapeHtml(t.errorHelp)}</p>
        <code>${details}</code>
      </ha-card>`;
  }

  _efficiencyItem(label, value, kind, locale, t) {
    const pct = Number.isFinite(value) ? clamp(value, 0, 100) : 0;
    const level = pct >= 75 ? t.excellent : pct >= 40 ? t.balancedLevel : t.monitoring;
    return `
      <div class="efficiency-item ${kind}">
        <div class="ring" style="--progress:${pct * 3.6}deg">
          <span>${escapeHtml(formatPercent(value, locale))}</span>
        </div>
        <div class="efficiency-copy">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(level)}</strong>
        </div>
      </div>`;
  }

  _miniIcon(kind) {
    const icons = {
      sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
      home: '<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z"/></svg>',
      import: '<svg viewBox="0 0 24 24"><path d="M4 12h14M13 7l5 5-5 5M4 5v14"/></svg>',
      export: '<svg viewBox="0 0 24 24"><path d="M20 12H6M11 7l-5 5 5 5M20 5v14"/></svg>',
      charge: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="3"/><path d="M9 2h6M12 8v8M8 12h8"/></svg>',
      discharge: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="3"/><path d="M9 2h6M8 12h8"/></svg>',
      balance: '<svg viewBox="0 0 24 24"><path d="m13 2-8 12h6l-1 8 9-13h-6z"/></svg>',
    };
    return icons[kind] || icons.sun;
  }

  _styles() {
    return `
      <style>
        :host {
          display: block;
          container-type: inline-size;
          --deye-solar: #ffb31a;
          --deye-solar-soft: rgba(255, 179, 26, 0.18);
          --deye-battery: #20b486;
          --deye-battery-soft: rgba(32, 180, 134, 0.17);
          --deye-grid: #4d82f3;
          --deye-grid-soft: rgba(77, 130, 243, 0.17);
          --deye-load: #f06665;
          --deye-load-soft: rgba(240, 102, 101, 0.16);
          --deye-inverter: var(--primary-color, #4d82f3);
          --deye-text: var(--primary-text-color, #20242c);
          --deye-muted: var(--secondary-text-color, #6f7682);
          --deye-card: var(--ha-card-background, var(--card-background-color, #fff));
          --deye-surface: color-mix(in srgb, var(--deye-card) 92%, var(--primary-color, #4d82f3) 8%);
          --deye-border: color-mix(in srgb, var(--deye-muted) 21%, transparent);
          color: var(--deye-text);
        }

        * { box-sizing: border-box; }
        button, select { font: inherit; }

        ha-card.energy-card {
          position: relative;
          overflow: hidden;
          border-radius: var(--ha-card-border-radius, 22px);
          background:
            radial-gradient(circle at 8% 0%, var(--deye-solar-soft), transparent 28%),
            radial-gradient(circle at 100% 30%, var(--deye-grid-soft), transparent 31%),
            var(--deye-card);
          border: 1px solid var(--ha-card-border-color, var(--deye-border));
          box-shadow: var(--ha-card-box-shadow, 0 12px 35px rgba(18, 28, 45, 0.08));
        }

        .card-header {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          padding: 18px 20px 10px;
        }

        .brand-mark {
          width: 48px;
          height: 48px;
          padding: 8px;
          border-radius: 15px;
          background: var(--deye-solar-soft);
          color: var(--deye-solar);
        }
        .brand-mark svg { width: 100%; height: 100%; }

        .header-copy { min-width: 0; }
        .header-copy h2 {
          margin: 0 0 5px;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .header-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .station-id,
        .station-select-wrap {
          color: var(--deye-muted);
          font-size: 12px;
        }
        .station-select-wrap { display: inline-flex; align-items: center; gap: 6px; }
        .station-select-wrap select {
          max-width: 130px;
          border: 1px solid var(--deye-border);
          border-radius: 9px;
          padding: 3px 24px 3px 7px;
          color: var(--deye-text);
          background: var(--deye-card);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 24px;
          padding: 3px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .02em;
        }
        .status-badge i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 0 4px color-mix(in srgb, currentColor 18%, transparent);
        }
        .status-badge.online { color: var(--deye-battery); background: var(--deye-battery-soft); }
        .status-badge.delayed { color: #d78c00; background: var(--deye-solar-soft); }
        .status-badge.offline { color: var(--deye-load); background: var(--deye-load-soft); }
        .status-badge.online i { animation: livePulse 1.8s ease-out infinite; }

        .updated-at { text-align: right; font-size: 11px; color: var(--deye-muted); }
        .updated-at span, .updated-at strong { display: block; }
        .updated-at strong { margin-top: 2px; color: var(--deye-text); font-weight: 650; }

        .diagram-stage {
          position: relative;
          width: calc(100% - 24px);
          margin: 4px 12px 0;
          aspect-ratio: 4 / 3;
          min-height: 400px;
          max-height: 580px;
          overflow: hidden;
          border-radius: 24px;
          background:
            radial-gradient(circle at 50% 10%, color-mix(in srgb, var(--deye-solar-soft) 65%, transparent), transparent 28%),
            radial-gradient(circle at 12% 62%, color-mix(in srgb, var(--deye-battery-soft) 55%, transparent), transparent 24%),
            radial-gradient(circle at 88% 62%, color-mix(in srgb, var(--deye-grid-soft) 55%, transparent), transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--primary-color, #4d82f3) 6%, transparent), transparent 40%),
            color-mix(in srgb, var(--deye-card) 96%, transparent);
          border: 1px solid var(--deye-border);
          isolation: isolate;
        }

        .ambient {
          position: absolute;
          border-radius: 50%;
          filter: blur(30px);
          opacity: .3;
          pointer-events: none;
        }
        .ambient-one { width: 28%; height: 35%; left: 35%; top: 0; background: var(--deye-solar-soft); }
        .ambient-two { width: 30%; height: 40%; right: 0; top: 30%; background: var(--deye-grid-soft); }

        .flow-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
        .flow-base {
          fill: none;
          stroke: var(--deye-border);
          stroke-width: 9;
          stroke-linecap: round;
        }
        .flow-line {
          fill: none;
          stroke: currentColor;
          stroke-width: 7;
          stroke-linecap: round;
          stroke-dasharray: 3 18;
          animation: flowForward 1.25s linear infinite;
          filter: drop-shadow(0 0 5px currentColor);
        }
        .flow-line.reverse { animation-direction: reverse; }
        .solar-flow { color: var(--deye-solar); }
        .battery-flow { color: var(--deye-battery); }
        .grid-flow { color: var(--deye-grid); }
        .load-flow { color: var(--deye-load); }
        .no-animation .flow-line { animation: none; stroke-dasharray: none; }

        .flow-label {
          position: absolute;
          z-index: 4;
          padding: 5px 10px;
          border: 1px solid var(--deye-border);
          border-radius: 999px;
          background: color-mix(in srgb, var(--deye-card) 94%, transparent);
          backdrop-filter: blur(8px);
          box-shadow: 0 6px 18px rgba(20, 28, 45, .08);
          color: var(--deye-text);
          font-size: clamp(10px, 1.4vw, 12px);
          line-height: 1;
          font-weight: 800;
          white-space: nowrap;
        }
        .solar-label { left: 50%; top: 26%; transform: translate(-50%, -50%); color: color-mix(in srgb, var(--deye-solar) 82%, var(--deye-text)); }
        .battery-label { left: 31.5%; top: 49%; transform: translate(-50%, -50%); color: var(--deye-battery); }
        .grid-label { left: 68.5%; top: 49%; transform: translate(-50%, -50%); color: var(--deye-grid); }
        .load-label { left: 50%; top: 72.5%; transform: translate(-50%, -50%); color: var(--deye-load); }

        .diagram-grid {
          position: absolute;
          inset: 16px;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(210px, 1.18fr) minmax(0, 1fr);
          grid-template-rows: minmax(90px, 1fr) minmax(110px, 1.15fr) minmax(90px, 1fr);
          gap: 16px 18px;
          align-items: center;
        }
        .node-slot { min-width: 0; display: flex; align-items: center; justify-content: center; }
        .solar-slot { grid-column: 2; grid-row: 1; }
        .battery-slot { grid-column: 1; grid-row: 2; justify-content: flex-start; }
        .inverter-slot { grid-column: 2; grid-row: 2; }
        .grid-slot { grid-column: 3; grid-row: 2; justify-content: flex-end; }
        .home-slot { grid-column: 2; grid-row: 3; }

        .flow-node {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.2vw, 12px);
          width: min(100%, 240px);
          min-height: 98px;
          padding: clamp(10px, 1.4vw, 15px);
          text-align: left;
          color: var(--deye-text);
          background: color-mix(in srgb, var(--deye-card) 92%, transparent);
          border: 1px solid var(--deye-border);
          border-radius: clamp(13px, 2.2vw, 20px);
          box-shadow: 0 10px 25px rgba(19, 28, 45, .09);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .flow-node:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(19, 28, 45, .13); }
        .flow-node:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .flow-node:disabled { cursor: default; opacity: .72; }
        .flow-node.active { border-color: color-mix(in srgb, currentColor 38%, var(--deye-border)); }

        .solar-node { color: var(--deye-solar); }
        .battery-node { color: var(--deye-battery); }
        .inverter-node { color: var(--deye-inverter); width: min(100%, 220px); min-height: 108px; }
        .grid-node { color: var(--deye-grid); }
        .home-node { color: var(--deye-load); }

        .node-icon {
          flex: 0 0 clamp(30px, 5.4vw, 53px);
          width: clamp(30px, 5.4vw, 53px);
          height: clamp(30px, 5.4vw, 53px);
          display: grid;
          place-items: center;
        }
        .node-icon svg { width: 100%; height: 100%; overflow: visible; }
        .node-copy { min-width: 0; display: flex; flex-direction: column; }
        .node-title { color: var(--deye-muted); font-size: clamp(10px, 1.2vw, 12px); line-height: 1.15; }
        .node-copy strong { color: var(--deye-text); font-size: clamp(16px, 1.9vw, 26px); line-height: 1.25; white-space: nowrap; }
        .node-status { color: currentColor; font-size: clamp(10px, 1.1vw, 12px); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .node-badge {
          position: absolute;
          right: 7px;
          top: 7px;
          padding: 3px 6px;
          border-radius: 999px;
          background: var(--deye-battery-soft);
          color: var(--deye-battery);
          font-size: clamp(8px, 1.3vw, 10px);
          font-weight: 800;
        }

        .icon-line, .icon-grid, .icon-wave, .icon-detail, .icon-tower, .icon-roof {
          fill: none;
          stroke: currentColor;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .icon-sun { fill: currentColor; opacity: .9; }
        .icon-panel { fill: currentColor; opacity: .17; stroke: currentColor; stroke-width: 2.4; stroke-linejoin: round; }
        .icon-shell, .icon-house { fill: currentColor; opacity: .12; stroke: currentColor; stroke-width: 2.4; }
        .icon-screen { fill: currentColor; opacity: .12; stroke: currentColor; stroke-width: 2.4; }
        .icon-terminal { fill: currentColor; opacity: .75; }
        .icon-battery-shell { fill: none; stroke: currentColor; stroke-width: 2.6; }
        .icon-battery-fill { fill: currentColor; opacity: .32; }
        .icon-bolt { fill: currentColor; opacity: .95; }

        .performance-section {
          margin: 14px 16px 0;
          padding: 14px;
          border: 1px solid var(--deye-border);
          border-radius: 20px;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--deye-grid-soft) 48%, transparent), transparent 44%),
            color-mix(in srgb, var(--deye-card) 96%, var(--deye-surface) 4%);
        }
        .efficiency-strip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .efficiency-item {
          min-width: 0;
          min-height: 88px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          border-radius: 17px;
          border: 1px solid color-mix(in srgb, currentColor 18%, var(--deye-border));
          background: color-mix(in srgb, var(--deye-card) 94%, currentColor 6%);
          box-shadow: 0 6px 18px rgba(18, 28, 45, .045);
        }
        .efficiency-copy { min-width: 0; display: flex; flex-direction: column; gap: 5px; }
        .efficiency-copy span {
          color: var(--deye-muted);
          font-size: 11px;
          line-height: 1.25;
        }
        .efficiency-copy strong {
          color: var(--deye-text);
          font-size: 13px;
          line-height: 1.2;
          font-weight: 750;
        }
        .ring {
          --progress: 0deg;
          flex: 0 0 58px;
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: conic-gradient(currentColor var(--progress), color-mix(in srgb, currentColor 12%, var(--deye-border)) 0);
          position: relative;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 10%, transparent);
        }
        .ring::before {
          content: "";
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          background: var(--deye-card);
          box-shadow: inset 0 0 0 1px var(--deye-border);
        }
        .ring span {
          position: relative;
          z-index: 1;
          color: var(--deye-text);
          font-size: 12px;
          font-weight: 800;
        }
        .efficiency-item.self { color: var(--deye-grid); }
        .efficiency-item.solar { color: var(--deye-solar); }

        .balance-item {
          min-width: 0;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          column-gap: 12px;
          row-gap: 8px;
          margin-top: 12px;
          padding: 13px 15px;
          border: 1px solid color-mix(in srgb, var(--deye-battery) 24%, var(--deye-border));
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 94%, var(--deye-battery-soft) 6%);
        }
        .balance-item.warn {
          border-color: color-mix(in srgb, var(--deye-load) 28%, var(--deye-border));
          background: color-mix(in srgb, var(--deye-card) 94%, var(--deye-load-soft) 6%);
        }
        .balance-icon {
          grid-row: 1 / span 2;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: var(--deye-battery);
          background: var(--deye-battery-soft);
        }
        .balance-item.warn .balance-icon { color: var(--deye-load); background: var(--deye-load-soft); }
        .balance-icon svg {
          width: 22px;
          height: 22px;
          fill: currentColor;
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .balance-copy { min-width: 0; }
        .balance-copy span { display: block; color: var(--deye-muted); font-size: 11px; }
        .balance-copy small { display: block; margin-top: 3px; color: var(--deye-text); font-size: 11px; font-weight: 700; }
        .balance-item > strong { font-size: 19px; line-height: 1.1; white-space: nowrap; }
        .balance-line {
          grid-column: 2 / -1;
          width: 100%;
          height: 7px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--deye-muted) 14%, transparent);
          overflow: hidden;
        }
        .balance-line i {
          display: block;
          height: 100%;
          max-width: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, color-mix(in srgb, var(--deye-battery) 70%, white), var(--deye-battery));
        }
        .balance-item.warn .balance-line i {
          background: linear-gradient(90deg, color-mix(in srgb, var(--deye-load) 72%, white), var(--deye-load));
        }

        .daily-section {
          margin: 14px 16px 18px;
          padding: 16px;
          border: 1px solid var(--deye-border);
          border-radius: 20px;
          background: color-mix(in srgb, var(--deye-card) 97%, var(--deye-surface) 3%);
        }
        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }
        .section-heading > div { display: flex; align-items: center; gap: 9px; min-width: 0; }
        .section-heading h3 { margin: 0; font-size: 16px; line-height: 1.2; }
        .section-heading > span { color: var(--deye-muted); font-size: 10px; text-align: right; }
        .section-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          height: 25px;
          padding: 0 8px;
          border-radius: 999px;
          color: var(--deye-grid);
          background: var(--deye-grid-soft);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .05em;
        }
        .daily-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }
        .daily-metric {
          position: relative;
          min-width: 0;
          min-height: 76px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          overflow: hidden;
          text-align: left;
          color: var(--deye-text);
          border: 1px solid var(--deye-border);
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 96%, transparent);
          box-shadow: 0 5px 16px rgba(18, 28, 45, .035);
          cursor: pointer;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .daily-metric::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          border-radius: 17px 0 0 17px;
          background: currentColor;
          opacity: .7;
        }
        .daily-metric:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, currentColor 24%, var(--deye-border));
          box-shadow: 0 9px 22px rgba(18, 28, 45, .075);
          background: color-mix(in srgb, var(--deye-card) 93%, currentColor 7%);
        }
        .daily-metric:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .daily-metric:disabled { cursor: default; opacity: .62; }
        .daily-metric.sun { color: var(--deye-solar); }
        .daily-metric.home { color: var(--deye-load); }
        .daily-metric.import, .daily-metric.export { color: var(--deye-grid); }
        .daily-metric.charge, .daily-metric.discharge { color: var(--deye-battery); }
        .daily-icon {
          flex: 0 0 42px;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: var(--deye-solar-soft);
          color: var(--deye-solar);
        }
        .daily-metric.home .daily-icon { background: var(--deye-load-soft); color: var(--deye-load); }
        .daily-metric.import .daily-icon, .daily-metric.export .daily-icon { background: var(--deye-grid-soft); color: var(--deye-grid); }
        .daily-metric.charge .daily-icon, .daily-metric.discharge .daily-icon { background: var(--deye-battery-soft); color: var(--deye-battery); }
        .daily-icon svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .daily-copy { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .daily-metric small {
          display: block;
          color: var(--deye-muted);
          font-size: 11px;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .daily-metric strong {
          display: block;
          color: var(--deye-text);
          font-size: 15px;
          line-height: 1.15;
          white-space: nowrap;
        }
        .daily-open {
          align-self: center;
          color: color-mix(in srgb, currentColor 78%, var(--deye-muted));
          font-size: 24px;
          font-weight: 300;
          line-height: 1;
          opacity: .65;
          transform: translateY(-1px);
        }

        @container (min-width: 720px) {
          .performance-section { display: grid; grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr); gap: 12px; }
          .balance-item { margin-top: 0; }
          .daily-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @container (max-width: 520px) {
          .diagram-stage { aspect-ratio: 1 / 1.02; min-height: 370px; }
          .diagram-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr) minmax(0, 1fr);
            gap: 10px;
          }
          .flow-node { min-height: 88px; }
          .node-copy strong { font-size: 14px; }
        }


        .empty-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 280px;
          padding: 28px;
          text-align: center;
          border-radius: var(--ha-card-border-radius, 20px);
        }
        .empty-visual { width: 84px; height: 84px; padding: 16px; border-radius: 24px; color: var(--deye-solar); background: var(--deye-solar-soft); }
        .empty-visual svg { width: 100%; height: 100%; }
        .empty-card h2 { margin: 18px 0 6px; font-size: 18px; }
        .empty-card p { margin: 0; color: var(--deye-muted); }
        .empty-card > span { margin-top: 12px; color: var(--deye-muted); font-size: 11px; }
        .error-card code {
          display: block;
          max-width: 100%;
          margin-top: 14px;
          padding: 10px 12px;
          overflow: auto;
          border-radius: 12px;
          background: color-mix(in srgb, var(--deye-load-soft) 42%, transparent);
          color: var(--deye-load);
          font-size: 12px;
          white-space: normal;
          word-break: break-word;
        }

        @keyframes flowForward { to { stroke-dashoffset: -42; } }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 35%, transparent); }
          70% { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        @media (max-width: 560px) {
          .card-header { grid-template-columns: auto minmax(0, 1fr); padding: 15px 14px 8px; }
          .updated-at { display: none; }
          .brand-mark { width: 42px; height: 42px; }
          .diagram-stage { width: calc(100% - 16px); margin-inline: 8px; min-height: 360px; aspect-ratio: 1 / 1; }
          .diagram-grid {
            inset: 14px 10px;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: auto auto auto;
            gap: 10px 8px;
          }
          .flow-node { width: 100%; min-height: 84px; padding: 8px; }
          .inverter-node { min-height: 92px; }
          .node-icon { flex-basis: 28px; width: 28px; height: 28px; }
          .node-title { display: block; font-size: 9px; }
          .node-copy strong { font-size: clamp(12px, 3.2vw, 16px); }
          .node-status { font-size: 9px; }
          .flow-label { padding: 3px 6px; font-size: 10px; }
          .battery-label { left: 30%; top: 49%; }
          .grid-label { left: 70%; top: 49%; }
          .performance-section { margin-inline: 8px; padding: 10px; }
          .efficiency-strip { gap: 8px; }
          .efficiency-item { min-height: 78px; gap: 9px; padding: 10px; }
          .ring { flex-basis: 48px; width: 48px; height: 48px; }
          .ring::before { inset: 5px; }
          .efficiency-copy span { font-size: 10px; }
          .efficiency-copy strong { font-size: 11px; }
          .balance-item { padding: 11px 12px; }
          .daily-section { margin-inline: 8px; padding: 12px; }
          .daily-grid { grid-template-columns: 1fr; gap: 8px; }
          .daily-metric { min-height: 68px; padding: 11px 12px; }
          .section-heading > span { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-line, .status-badge.online i { animation: none !important; }
          .flow-node, .daily-metric { transition: none; }
        }
      </style>`;
  }
}

class DeyeCloudEnergyFlowCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  _language() {
    const stationId = this._config.station_id
      ? String(this._config.station_id)
      : this._stationIds()[0];
    const configuredLanguage = integrationLanguage(this._hass, stationId);
    if (configuredLanguage) return configuredLanguage;

    const rawLanguage =
      this._hass?.language ||
      this._hass?.locale?.language ||
      window?.navigator?.language ||
      "en";
    const language = String(rawLanguage).toLowerCase();
    if (language.startsWith("vi")) return "vi";
    if (language.startsWith("ru")) return "ru";
    return "en";
  }

  _stationIds() {
    if (!this._hass?.states) return [];
    const ids = new Set();
    Object.values(this._hass.states).forEach((stateObj) => {
      const id = stateObj?.attributes?.station_id;
      if (id !== undefined && id !== null && String(id).trim()) ids.add(String(id));
    });
    return [...ids].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }

  _setValue(key, value) {
    const next = { ...this._config };
    if (value === undefined || value === null || value === "") delete next[key];
    else next[key] = value;
    this._config = next;
    const event = new CustomEvent("config-changed", {
      detail: { config: next },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _render() {
    if (!this.shadowRoot) return;
    const t = STRINGS[this._language()];
    const stationIds = this._stationIds();
    const selected = this._config.station_id ? String(this._config.station_id) : "";
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; color: var(--primary-text-color); }
        .editor { display: grid; gap: 16px; padding: 8px 0; }
        label { display: grid; gap: 6px; font-size: 13px; color: var(--secondary-text-color); }
        input[type="text"], select {
          width: 100%;
          min-height: 42px;
          padding: 8px 11px;
          color: var(--primary-text-color);
          background: var(--card-background-color);
          border: 1px solid var(--divider-color);
          border-radius: 10px;
          font: inherit;
        }
        .switch-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .switch-row label { color: var(--primary-text-color); }
        input[type="checkbox"] { width: 19px; height: 19px; accent-color: var(--primary-color); }
        .hint { margin: 0; color: var(--secondary-text-color); font-size: 12px; }
      </style>
      <div class="editor">
        <label>
          <span>${escapeHtml(t.editorStation)}</span>
          <select id="station">
            <option value="">${escapeHtml(t.auto)}</option>
            ${stationIds.map((id) => `<option value="${escapeHtml(id)}" ${selected === id ? "selected" : ""}>${escapeHtml(id)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>${escapeHtml(t.editorTitle)}</span>
          <input id="title" type="text" value="${escapeHtml(this._config.title || "")}" placeholder="${escapeHtml(t.defaultTitle)}" />
        </label>
        ${this._switch("show_daily", t.editorDaily, this._config.show_daily !== false)}
        ${this._switch("show_efficiency", t.editorEfficiency, this._config.show_efficiency !== false)}
        ${this._switch("animation", t.editorAnimation, this._config.animation !== false)}
        <p class="hint">${escapeHtml(t.dataHint)}</p>
      </div>`;

    this.shadowRoot.getElementById("station")?.addEventListener("change", (event) =>
      this._setValue("station_id", event.target.value || undefined)
    );
    this.shadowRoot.getElementById("title")?.addEventListener("change", (event) =>
      this._setValue("title", event.target.value.trim() || undefined)
    );
    ["show_daily", "show_efficiency", "animation"].forEach((key) => {
      this.shadowRoot.getElementById(key)?.addEventListener("change", (event) =>
        this._setValue(key, event.target.checked)
      );
    });
  }

  _switch(key, label, checked) {
    return `
      <div class="switch-row">
        <label for="${key}">${escapeHtml(label)}</label>
        <input id="${key}" type="checkbox" ${checked ? "checked" : ""} />
      </div>`;
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, DeyeCloudEnergyFlowCard);
}
if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, DeyeCloudEnergyFlowCardEditor);
}

// Backward compatibility for dashboards that already use
// custom:deyecloud-energy-flow-card. A separate subclass is required because
// the Custom Elements specification does not allow registering one constructor
// under two tag names.
if (!customElements.get(LEGACY_CARD_TAG)) {
  class DeyeCloudEnergyFlowCardLegacy extends DeyeCloudEnergyFlowCard {}
  customElements.define(LEGACY_CARD_TAG, DeyeCloudEnergyFlowCardLegacy);
}
if (!customElements.get(LEGACY_EDITOR_TAG)) {
  class DeyeCloudEnergyFlowCardEditorLegacy extends DeyeCloudEnergyFlowCardEditor {}
  customElements.define(LEGACY_EDITOR_TAG, DeyeCloudEnergyFlowCardEditorLegacy);
}

// IMPORTANT: mutate the existing registry in place. Home Assistant keeps a
// reference to the original array; assigning a new array makes the card picker
// wait forever for stale metadata and leaves a permanent spinner.
const customCardsRegistry = window.customCards || (window.customCards = []);
const pickerStrings = STRINGS[browserLanguage()];
const cardMetadata = {
  type: CARD_TAG,
  name: pickerStrings.cardName,
  preview: false,
  description: pickerStrings.cardDescription,
  documentationURL: "https://github.com/heavenknows1978/hass-deyecloud",
  getEntitySuggestion: (hass, entityId) => {
    const stationId = hass?.states?.[entityId]?.attributes?.station_id;
    if (stationId === undefined || stationId === null) return null;
    return {
      config: {
        type: `custom:${CARD_TAG}`,
        station_id: String(stationId),
        show_daily: true,
        show_efficiency: true,
        animation: true,
      },
    };
  },
};

for (let index = customCardsRegistry.length - 1; index >= 0; index -= 1) {
  const type = String(customCardsRegistry[index]?.type || "");
  if (type.startsWith("deyecloud-energy-flow-card")) {
    customCardsRegistry.splice(index, 1);
  }
}

if (customElements.get(CARD_TAG)) {
  customCardsRegistry.push(cardMetadata);
} else {
  console.error(
    `DeyeCloud card picker registration skipped: custom element ${CARD_TAG} was not defined.`
  );
}

console.info(
  `%c DeyeCloud Energy Flow Card %c v${CARD_VERSION} `,
  "color: white; background: #1c9b70; font-weight: 700; padding: 3px 6px; border-radius: 4px 0 0 4px;",
  "color: #1c9b70; background: #e8f7f2; font-weight: 700; padding: 3px 6px; border-radius: 0 4px 4px 0;"
);
