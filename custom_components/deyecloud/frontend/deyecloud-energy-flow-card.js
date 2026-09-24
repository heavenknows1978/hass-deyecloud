const CARD_VERSION = "2.5.2";
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
    locale: "vi-VN",
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
    controlsTitle: "Điều khiển inverter",
    controlsHint: "Thử nghiệm · mọi thay đổi đều cần xác nhận",
    settingsRead: "Đọc cài đặt",
    notRead: "Chưa đọc",
    modes: "Chế độ vận hành",
    functions: "Chức năng",
    limits: "Giới hạn",
    workMode: "Chế độ làm việc",
    energyPattern: "Ưu tiên năng lượng",
    modeSellingFirst: "Ưu tiên bán",
    modeZeroLoad: "Zero export tải",
    modeZeroCt: "Zero export CT",
    patternBattery: "Ưu tiên pin",
    patternLoad: "Ưu tiên tải",
    gridCharge: "Sạc từ lưới",
    solarSell: "Bán điện PV",
    timeOfUse: "Lịch TOU",
    on: "Bật",
    off: "Tắt",
    maxChargeCurrent: "Dòng sạc tối đa",
    maxDischargeCurrent: "Dòng xả tối đa",
    gridChargeCurrent: "Dòng sạc từ lưới",
    maxSellPower: "Công suất bán tối đa",
    maxSolarPower: "Công suất PV tối đa",
    touSchedule: "Lịch sạc/xả 24 giờ",
    touNow: "Hiện tại",
    touTarget: "SOC mục tiêu",
    touOff: "Lịch TOU đang tắt",
    confirmTitle: "Áp dụng xuống inverter?",
    apply: "Áp dụng",
    cancel: "Hủy",
    edit: "Sửa",
    sending: "Đang gửi tới inverter…",
    confirmed: "Inverter đã xác nhận",
    failed: "Inverter chưa xác nhận",
    outOfRange: "Giá trị phải từ {min} đến {max}",
    inverterLabel: "Inverter",
    editorControls: "Hiển thị điều khiển inverter",
  },
  ru: {
    locale: "ru-RU",
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
    controlsTitle: "Управление инвертором",
    controlsHint: "Экспериментально · каждое изменение требует подтверждения",
    settingsRead: "Настройки прочитаны",
    notRead: "Ещё не прочитаны",
    modes: "Режим работы",
    functions: "Функции",
    limits: "Ограничения",
    workMode: "Режим работы",
    energyPattern: "Приоритет энергии",
    modeSellingFirst: "Приоритет продажи",
    modeZeroLoad: "Нулевой экспорт (нагрузка)",
    modeZeroCt: "Нулевой экспорт (CT)",
    patternBattery: "Сначала батарея",
    patternLoad: "Сначала нагрузка",
    gridCharge: "Заряд от сети",
    solarSell: "Продажа PV",
    timeOfUse: "Расписание TOU",
    on: "Вкл",
    off: "Выкл",
    maxChargeCurrent: "Макс. ток заряда",
    maxDischargeCurrent: "Макс. ток разряда",
    gridChargeCurrent: "Ток заряда от сети",
    maxSellPower: "Макс. мощность продажи",
    maxSolarPower: "Макс. мощность PV",
    touSchedule: "Расписание заряда/разряда на 24 ч",
    touNow: "Сейчас",
    touTarget: "Целевой SOC",
    touOff: "Расписание TOU выключено",
    confirmTitle: "Применить на инверторе?",
    apply: "Применить",
    cancel: "Отмена",
    edit: "Изменить",
    sending: "Отправка на инвертор…",
    confirmed: "Инвертор подтвердил",
    failed: "Инвертор не подтвердил",
    outOfRange: "Значение должно быть от {min} до {max}",
    inverterLabel: "Инвертор",
    editorControls: "Показывать управление инвертором",
  },
  en: {
    locale: "en-US",
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
    controlsTitle: "Inverter control",
    controlsHint: "Experimental · every change needs confirmation",
    settingsRead: "Settings read",
    notRead: "Not read yet",
    modes: "Operating mode",
    functions: "Functions",
    limits: "Limits",
    workMode: "Work mode",
    energyPattern: "Energy priority",
    modeSellingFirst: "Selling first",
    modeZeroLoad: "Zero export to load",
    modeZeroCt: "Zero export to CT",
    patternBattery: "Battery first",
    patternLoad: "Load first",
    gridCharge: "Grid charge",
    solarSell: "Solar sell",
    timeOfUse: "Time of use",
    on: "On",
    off: "Off",
    maxChargeCurrent: "Max charge current",
    maxDischargeCurrent: "Max discharge current",
    gridChargeCurrent: "Grid charge current",
    maxSellPower: "Max sell power",
    maxSolarPower: "Max solar power",
    touSchedule: "24-hour charge schedule",
    touNow: "Now",
    touTarget: "Target SOC",
    touOff: "Time of use is off",
    confirmTitle: "Apply to the inverter?",
    apply: "Apply",
    cancel: "Cancel",
    edit: "Edit",
    sending: "Sending to the inverter…",
    confirmed: "Confirmed by the inverter",
    failed: "The inverter did not confirm",
    outOfRange: "Value must be between {min} and {max}",
    inverterLabel: "Inverter",
    editorControls: "Show inverter controls",
  },
};

function normalizeLanguage(value) {
  const language = String(value || "").toLowerCase().split(/[-_]/)[0];
  return STRINGS[language] ? language : "en";
}

function interfaceLanguage(hass) {
  return normalizeLanguage(
    hass?.language ||
      hass?.locale?.language ||
      document?.documentElement?.lang ||
      window?.navigator?.language
  );
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

function relativeTime(date, locale) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: seconds < 10 ? "auto" : "always",
    style: "short",
  });
  if (seconds < 10) return formatter.format(0, "second");
  if (seconds < 60) return formatter.format(-seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return formatter.format(-minutes, "minute");
  return formatter.format(-Math.round(minutes / 60), "hour");
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

function resolveLanguage(hass, stationId) {
  return integrationLanguage(hass, stationId) || interfaceLanguage(hass);
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
    this._ctrl = { confirm: null, pending: {}, toast: null, editing: null, draft: "", device: null };
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
    if (this._config.show_controls !== false) size += 3;
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
    return resolveLanguage(this._hass, this._selectedStationId());
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
      const t = STRINGS[language];
      const locale = t.locale;
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

    const controlDevices = this._controlDevices(stationId);
    const signature = JSON.stringify({
      stationIds,
      stationId,
      config: this._config,
      values,
      statusText,
      language,
      latest: latestDate?.toISOString(),
      controls: Object.values(controlDevices).flatMap((device) =>
        Object.values(device).map(({ entityId, stateObj }) => [
          entityId,
          stateObj.state,
          stateObj.attributes?.settings_read_at,
          stateObj.attributes?.slots,
        ])
      ),
      ctrl: this._ctrl,
      // Keeps the TOU "now" marker and relative times moving.
      minute: Math.floor(Date.now() / 60000),
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

    const controlsHtml = this._controlsSection(stationId, t, locale);
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
            <strong>${escapeHtml(relativeTime(latestDate, locale))}</strong>
          </div>
        </header>

        <div class="card-body ${controlsHtml ? "has-controls" : ""}">
        <div class="main-col">
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
        </div>
        ${controlsHtml ? `<div class="side-col">${controlsHtml}</div>` : ""}
        </div>
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
    this._wireControls();

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

  // ---------------------------------------------------------------------
  // Inverter controls (integration option "Enable remote control").
  // Every write goes through an explicit confirmation step because it
  // changes real inverter settings; the service call resolves only after
  // the inverter confirmed the command, so pending/success/failure states
  // reflect what actually happened.
  // ---------------------------------------------------------------------

  _controlDevices(stationId) {
    const devices = {};
    for (const [entityId, stateObj] of this._statesForStation(stationId)) {
      const attrs = stateObj.attributes || {};
      if (!attrs.control_key || !attrs.device_sn) continue;
      const sn = String(attrs.device_sn);
      devices[sn] = devices[sn] || {};
      devices[sn][attrs.control_key] = { entityId, stateObj };
    }
    return devices;
  }

  _selectedControlDevice(devices) {
    const serials = Object.keys(devices).sort();
    if (!serials.length) return null;
    return serials.includes(this._ctrl.device) ? this._ctrl.device : serials[0];
  }

  _setCtrl(patch) {
    this._ctrl = { ...this._ctrl, ...patch };
    this._lastRenderSignature = "";
    this._render();
  }

  _toast(kind, text) {
    clearTimeout(this._toastTimer);
    this._setCtrl({ toast: { kind, text } });
    this._toastTimer = setTimeout(() => this._setCtrl({ toast: null }), kind === "error" ? 9000 : 4500);
  }

  async _runConfirmed() {
    const request = this._ctrl.confirm;
    if (!request || !this._hass) return;
    const t = this._strings();
    this._setCtrl({ confirm: null, pending: { ...this._ctrl.pending, [request.entityId]: true } });
    try {
      await this._hass.callService(request.domain, request.service, {
        entity_id: request.entityId,
        ...request.data,
      });
      this._toast("success", `${t.confirmed} · ${request.label}: ${request.to}`);
    } catch (error) {
      const detail = error?.message || error?.error?.message || String(error || "");
      this._toast("error", `${t.failed} · ${request.label}${detail ? ` — ${detail}` : ""}`);
    } finally {
      const pending = { ...this._ctrl.pending };
      delete pending[request.entityId];
      this._setCtrl({ pending });
    }
  }

  _controlLabels(t) {
    return {
      workModes: {
        SELLING_FIRST: t.modeSellingFirst,
        ZERO_EXPORT_TO_LOAD: t.modeZeroLoad,
        ZERO_EXPORT_TO_CT: t.modeZeroCt,
      },
      patterns: { BATTERY_FIRST: t.patternBattery, LOAD_FIRST: t.patternLoad },
    };
  }

  _ctrlIcon(kind) {
    const icons = {
      mode: '<svg viewBox="0 0 24 24"><path d="M12 3 7 21M12 3l5 18M9 10h6M8 15h8"/><path d="M19 8h3m-1.5-1.5L22 8l-1.5 1.5"/></svg>',
      pattern: '<svg viewBox="0 0 24 24"><rect x="4" y="6" width="12" height="14" rx="2.5"/><path d="M8 3h4M19 9a4 4 0 0 1 0 6M21.5 7a7 7 0 0 1 0 10"/></svg>',
      grid_charge: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="14" height="12" rx="2.5"/><path d="M20 10v4M11 8.5 8 12.5h3l-1 3.5 3.5-4.5h-3z"/></svg>',
      solar_sell: '<svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="3"/><path d="M8 2.5v1.5M2.5 9H4M3.8 4.8l1 1M12.2 4.8l-1 1M13 16h8M18 13l3 3-3 3"/></svg>',
      time_of_use: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
      current_up: '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="16" rx="2.5"/><path d="M10 3h4M12 17v-7M9 12.5l3-3 3 3"/></svg>',
      current_down: '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="16" rx="2.5"/><path d="M10 3h4M12 9v7M9 13.5l3 3 3-3"/></svg>',
      current_grid: '<svg viewBox="0 0 24 24"><path d="M12 3 8 21M12 3l4 18M9.6 10h4.8M8.8 15h6.4"/><path d="M19 13v6M16.5 16.5 19 19l2.5-2.5"/></svg>',
      power_sell: '<svg viewBox="0 0 24 24"><path d="M4 12h12M11 7l5 5-5 5M20 4v16"/></svg>',
      power_solar: '<svg viewBox="0 0 24 24"><path d="M3 19 6 9h12l3 10z"/><path d="M4.5 14h15M9 9l-1 10M15 9l1 10M12 3v3M8 4l1 2M16 4l-1 2"/></svg>',
      edit: '<svg viewBox="0 0 24 24"><path d="m4 20 4-1 11-11-3-3L5 16z"/><path d="m14 6 3 3"/></svg>',
      shield: '<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="M12 8v5M12 16h.01"/></svg>',
    };
    return icons[kind] || icons.mode;
  }

  _touSegments(slots) {
    const toMinutes = (value) => {
      const [h, m] = String(value || "0:0").split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const sorted = [...(slots || [])]
      .map((slot) => ({ ...slot, start: toMinutes(slot.time) }))
      .sort((a, b) => a.start - b.start);
    const segments = [];
    sorted.forEach((slot, index) => {
      // Each slot runs until the next one starts; the last wraps past midnight.
      const end = index + 1 < sorted.length ? sorted[index + 1].start : sorted[0].start + 1440;
      if (end > 1440) {
        segments.push({ ...slot, from: slot.start, to: 1440 });
        if (end - 1440 > 0) segments.push({ ...slot, from: 0, to: end - 1440 });
      } else if (end > slot.start) {
        segments.push({ ...slot, from: slot.start, to: end });
      }
    });
    return segments.sort((a, b) => a.from - b.from);
  }

  _controlsSection(stationId, t, locale) {
    if (this._config.show_controls === false) return "";
    const devices = this._controlDevices(stationId);
    const sn = this._selectedControlDevice(devices);
    if (!sn) return "";
    const controls = devices[sn];
    const labels = this._controlLabels(t);
    const pending = this._ctrl.pending || {};
    const busy = Object.values(controls).some((c) => pending[c.entityId]);
    const known = (value) =>
      value !== undefined && value !== null && !["unknown", "unavailable", ""].includes(value);

    const readAt = Object.values(controls)
      .map((c) => c.stateObj.attributes?.settings_read_at)
      .filter(Boolean)
      .sort()
      .pop();

    const segmented = (key, title, icon, optionLabels) => {
      const control = controls[key];
      if (!control) return "";
      const current = control.stateObj.state;
      const options = control.stateObj.attributes?.options || Object.keys(optionLabels);
      const isPending = pending[control.entityId];
      return `
        <div class="ctrl-mode ${isPending ? "pending" : ""}">
          <div class="ctrl-mode-head">
            <span class="ctrl-icon mode-icon">${this._ctrlIcon(icon)}</span>
            <span>${escapeHtml(title)}</span>
            ${isPending ? '<i class="ctrl-spinner" aria-hidden="true"></i>' : ""}
          </div>
          <div class="segmented" role="radiogroup" aria-label="${escapeHtml(title)}">
            ${options.map((option) => `
              <button type="button" role="radio" aria-checked="${option === current}"
                class="segment ${option === current ? "selected" : ""}"
                data-ctrl-action="select" data-entity-id="${escapeHtml(control.entityId)}"
                data-value="${escapeHtml(option)}" data-label="${escapeHtml(title)}"
                data-from="${escapeHtml(optionLabels[current] || "—")}" data-to="${escapeHtml(optionLabels[option] || option)}"
                ${busy ? "disabled" : ""}>
                ${escapeHtml(optionLabels[option] || option)}
              </button>`).join("")}
          </div>
        </div>`;
    };

    const toggle = (key, title, icon, tone) => {
      const control = controls[key];
      if (!control) return "";
      const value = control.stateObj.state;
      const isOn = value === "on";
      const isPending = pending[control.entityId];
      const shown = known(value) ? (isOn ? t.on : t.off) : "—";
      return `
        <button type="button" class="ctrl-toggle ${tone} ${isOn ? "on" : ""} ${known(value) ? "" : "unknown"} ${isPending ? "pending" : ""}"
          role="switch" aria-checked="${isOn}"
          data-ctrl-action="toggle" data-entity-id="${escapeHtml(control.entityId)}"
          data-value="${isOn ? "off" : "on"}" data-label="${escapeHtml(title)}"
          data-from="${escapeHtml(shown)}" data-to="${escapeHtml(isOn ? t.off : t.on)}"
          ${busy ? "disabled" : ""}>
          <span class="ctrl-icon">${this._ctrlIcon(icon)}</span>
          <span class="ctrl-toggle-copy">
            <small>${escapeHtml(title)}</small>
            <strong>${escapeHtml(shown)}</strong>
          </span>
          ${isPending ? '<i class="ctrl-spinner" aria-hidden="true"></i>' : '<span class="switch-track" aria-hidden="true"><i></i></span>'}
        </button>`;
    };

    const limit = (key, title, icon, tone) => {
      const control = controls[key];
      if (!control) return "";
      const attrs = control.stateObj.attributes || {};
      const unit = attrs.unit_of_measurement || "";
      const raw = control.stateObj.state;
      const numeric = Number(raw);
      const hasValue = known(raw) && Number.isFinite(numeric);
      const display = hasValue ? numeric.toLocaleString(locale, { maximumFractionDigits: 0 }) : "—";
      const isPending = pending[control.entityId];
      if (this._ctrl.editing === control.entityId) {
        return `
          <div class="ctrl-limit ${tone} editing">
            <span class="ctrl-icon">${this._ctrlIcon(icon)}</span>
            <label class="ctrl-limit-copy">
              <small>${escapeHtml(title)}</small>
              <span class="ctrl-input-wrap">
                <input id="ctrl-edit-input" type="number" inputmode="numeric"
                  min="${escapeHtml(attrs.min ?? 0)}" max="${escapeHtml(attrs.max ?? "")}" step="${escapeHtml(attrs.step ?? 1)}"
                  value="${escapeHtml(this._ctrl.draft)}" />
                <em>${escapeHtml(unit)}</em>
              </span>
            </label>
            <span class="ctrl-edit-actions">
              <button type="button" class="icon-btn ok" data-ctrl-action="apply-edit"
                data-entity-id="${escapeHtml(control.entityId)}" data-label="${escapeHtml(title)}"
                data-from="${escapeHtml(hasValue ? `${display} ${unit}` : "—")}" data-unit="${escapeHtml(unit)}"
                data-min="${escapeHtml(attrs.min ?? 0)}" data-max="${escapeHtml(attrs.max ?? "")}"
                aria-label="${escapeHtml(t.apply)}">✓</button>
              <button type="button" class="icon-btn" data-ctrl-action="cancel-edit" aria-label="${escapeHtml(t.cancel)}">✕</button>
            </span>
          </div>`;
      }
      return `
        <button type="button" class="ctrl-limit ${tone} ${isPending ? "pending" : ""}"
          data-ctrl-action="edit" data-entity-id="${escapeHtml(control.entityId)}"
          data-value="${escapeHtml(hasValue ? String(Math.round(numeric)) : "")}"
          aria-label="${escapeHtml(`${t.edit} ${title}`)}" ${busy ? "disabled" : ""}>
          <span class="ctrl-icon">${this._ctrlIcon(icon)}</span>
          <span class="ctrl-limit-copy">
            <small>${escapeHtml(title)}</small>
            <strong>${escapeHtml(display)}${hasValue ? `<em>${escapeHtml(unit)}</em>` : ""}</strong>
          </span>
          ${isPending ? '<i class="ctrl-spinner" aria-hidden="true"></i>' : `<span class="ctrl-edit-icon" aria-hidden="true">${this._ctrlIcon("edit")}</span>`}
        </button>`;
    };

    // 24-hour time-of-use timeline: bar height = target SOC of each slot.
    const touState = controls.time_of_use?.stateObj;
    const slots = touState?.attributes?.slots || [];
    let touHtml = "";
    if (slots.length) {
      const segments = this._touSegments(slots);
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const active = segments.find((seg) => nowMinutes >= seg.from && nowMinutes < seg.to);
      const touOn = touState.state === "on";
      const fmt = (minutes) =>
        `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
      const endLabel = (minutes) => (minutes === 1440 ? "24:00" : fmt(minutes));
      touHtml = `
        <div class="tou-card ${touOn ? "" : "off"}">
          <div class="tou-head">
            <span class="ctrl-icon">${this._ctrlIcon("time_of_use")}</span>
            <div>
              <small>${escapeHtml(t.touSchedule)}</small>
              <strong>${touOn && active
                ? `${escapeHtml(t.touNow)} ${escapeHtml(fmt(active.from))}–${escapeHtml(endLabel(active.to))} · ${escapeHtml(t.touTarget)} ${escapeHtml(active.soc)}% · ${escapeHtml(formatPower(active.power, locale))}`
                : escapeHtml(t.touOff)}</strong>
            </div>
          </div>
          <div class="tou-track" role="img" aria-label="${escapeHtml(t.touSchedule)}">
            ${segments.map((seg) => `
              <div class="tou-seg ${seg === active ? "active" : ""}" style="flex:${seg.to - seg.from}"
                title="${escapeHtml(`${fmt(seg.from)}–${endLabel(seg.to)} · ${seg.soc}% · ${formatPower(seg.power, locale)}`)}">
                <i style="height:${clamp(Number(seg.soc) || 0, 4, 100)}%"></i>
                ${seg.to - seg.from >= 90 ? `<span>${escapeHtml(seg.soc)}%</span>` : ""}
              </div>`).join("")}
            <b class="tou-now" style="left:${(nowMinutes / 1440) * 100}%"></b>
          </div>
          <div class="tou-axis" aria-hidden="true"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
        </div>`;
    }

    const serials = Object.keys(devices).sort();
    const inverterPicker = serials.length > 1
      ? `<label class="ctrl-inverter"><span>${escapeHtml(t.inverterLabel)}</span>
           <select id="ctrl-inverter">${serials.map((id) => `<option value="${escapeHtml(id)}" ${id === sn ? "selected" : ""}>${escapeHtml(id)}</option>`).join("")}</select>
         </label>`
      : "";

    const confirm = this._ctrl.confirm;
    const confirmHtml = confirm
      ? `
        <div class="ctrl-confirm" role="alertdialog" aria-live="assertive">
          <span class="ctrl-icon warn">${this._ctrlIcon("shield")}</span>
          <div class="ctrl-confirm-copy">
            <strong>${escapeHtml(t.confirmTitle)}</strong>
            <span>${escapeHtml(confirm.label)}: <s>${escapeHtml(confirm.from)}</s> → <b>${escapeHtml(confirm.to)}</b></span>
          </div>
          <div class="ctrl-confirm-actions">
            <button type="button" class="btn ghost" data-ctrl-action="cancel-confirm">${escapeHtml(t.cancel)}</button>
            <button type="button" class="btn primary" data-ctrl-action="confirm">${escapeHtml(t.apply)}</button>
          </div>
        </div>`
      : "";
    const toast = this._ctrl.toast;
    const statusHtml = busy
      ? `<div class="ctrl-toast info" role="status"><i class="ctrl-spinner"></i>${escapeHtml(t.sending)}</div>`
      : toast
        ? `<div class="ctrl-toast ${toast.kind}" role="status">${escapeHtml(toast.text)}</div>`
        : "";

    return `
      <section class="control-section">
        <div class="section-heading">
          <div>
            <span class="section-kicker ctrl-kicker">CTRL</span>
            <h3>${escapeHtml(t.controlsTitle)}</h3>
          </div>
          <span class="ctrl-meta">
            ${escapeHtml(t.settingsRead)} · <b>${escapeHtml(readAt ? relativeTime(new Date(readAt), locale) : t.notRead)}</b>
          </span>
        </div>
        <p class="ctrl-hint">${this._ctrlIcon("shield")}<span>${escapeHtml(t.controlsHint)}</span></p>
        ${inverterPicker}
        ${controls.work_mode || controls.energy_pattern ? `
          <div class="ctrl-group">
            <span class="ctrl-group-label">${escapeHtml(t.modes)}</span>
            <div class="ctrl-modes">
              ${segmented("work_mode", t.workMode, "mode", labels.workModes)}
              ${segmented("energy_pattern", t.energyPattern, "pattern", labels.patterns)}
            </div>
          </div>` : ""}
        <div class="ctrl-group">
          <span class="ctrl-group-label">${escapeHtml(t.functions)}</span>
          <div class="ctrl-toggles">
            ${toggle("grid_charge", t.gridCharge, "grid_charge", "grid")}
            ${toggle("solar_sell", t.solarSell, "solar_sell", "solar")}
            ${toggle("time_of_use", t.timeOfUse, "time_of_use", "battery")}
          </div>
          ${touHtml}
        </div>
        <div class="ctrl-group">
          <span class="ctrl-group-label">${escapeHtml(t.limits)}</span>
          <div class="ctrl-limits">
            ${limit("max_charge_current", t.maxChargeCurrent, "current_up", "battery")}
            ${limit("max_discharge_current", t.maxDischargeCurrent, "current_down", "battery")}
            ${limit("grid_charge_current", t.gridChargeCurrent, "current_grid", "grid")}
            ${limit("max_sell_power", t.maxSellPower, "power_sell", "grid")}
            ${limit("max_solar_power", t.maxSolarPower, "power_solar", "solar")}
          </div>
        </div>
        ${confirmHtml}
        ${statusHtml}
      </section>`;
  }

  _wireControls() {
    const root = this.shadowRoot;
    const t = this._strings();
    root.getElementById("ctrl-inverter")?.addEventListener("change", (event) =>
      this._setCtrl({ device: event.target.value, editing: null, confirm: null })
    );
    root.querySelectorAll("[data-ctrl-action]").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        const data = element.dataset;
        switch (data.ctrlAction) {
          case "select":
            if (element.classList.contains("selected")) return;
            this._setCtrl({
              editing: null,
              confirm: {
                entityId: data.entityId, domain: "select", service: "select_option",
                data: { option: data.value }, label: data.label, from: data.from, to: data.to,
              },
            });
            break;
          case "toggle":
            this._setCtrl({
              editing: null,
              confirm: {
                entityId: data.entityId, domain: "switch", service: data.value === "on" ? "turn_on" : "turn_off",
                data: {}, label: data.label, from: data.from, to: data.to,
              },
            });
            break;
          case "edit":
            this._setCtrl({ editing: data.entityId, draft: data.value || "", confirm: null });
            break;
          case "cancel-edit":
            this._setCtrl({ editing: null, draft: "" });
            break;
          case "apply-edit": {
            const value = Number(this._ctrl.draft);
            const min = Number(data.min);
            const max = data.max === "" ? Number.POSITIVE_INFINITY : Number(data.max);
            if (this._ctrl.draft === "" || !Number.isFinite(value) || value < min || value > max) {
              this._toast("error", t.outOfRange.replace("{min}", data.min).replace("{max}", data.max || "∞"));
              return;
            }
            this._setCtrl({
              editing: null,
              confirm: {
                entityId: data.entityId, domain: "number", service: "set_value",
                data: { value }, label: data.label, from: data.from,
                to: `${value.toLocaleString(t.locale)} ${data.unit}`.trim(),
              },
            });
            break;
          }
          case "cancel-confirm":
            this._setCtrl({ confirm: null });
            break;
          case "confirm":
            this._runConfirmed();
            break;
          default:
        }
      });
    });

    const input = root.getElementById("ctrl-edit-input");
    if (input) {
      input.addEventListener("input", (event) => { this._ctrl.draft = event.target.value; });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") root.querySelector('[data-ctrl-action="apply-edit"]')?.click();
        if (event.key === "Escape") this._setCtrl({ editing: null, draft: "" });
      });
      // Re-renders (new sensor values) must not steal the field being edited.
      input.focus();
    }
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
          font-size: clamp(10px, 1.4cqw, 12px);
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
          gap: clamp(6px, 1.2cqw, 12px);
          width: min(100%, 240px);
          min-height: 98px;
          padding: clamp(10px, 1.4cqw, 15px);
          text-align: left;
          color: var(--deye-text);
          background: color-mix(in srgb, var(--deye-card) 92%, transparent);
          border: 1px solid var(--deye-border);
          border-radius: clamp(13px, 2.2cqw, 20px);
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
          flex: 0 0 clamp(30px, 5.4cqw, 53px);
          width: clamp(30px, 5.4cqw, 53px);
          height: clamp(30px, 5.4cqw, 53px);
          display: grid;
          place-items: center;
        }
        .node-icon svg { width: 100%; height: 100%; overflow: visible; }
        .node-copy { min-width: 0; display: flex; flex-direction: column; }
        .node-title { color: var(--deye-muted); font-size: clamp(10px, 1.2cqw, 12px); line-height: 1.15; }
        .node-copy strong { color: var(--deye-text); font-size: clamp(16px, 1.9cqw, 26px); line-height: 1.25; white-space: nowrap; }
        .node-status { color: currentColor; font-size: clamp(10px, 1.1cqw, 12px); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .node-badge {
          position: absolute;
          right: 7px;
          top: 7px;
          padding: 3px 6px;
          border-radius: 999px;
          background: var(--deye-battery-soft);
          color: var(--deye-battery);
          font-size: clamp(8px, 1.3cqw, 10px);
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

        @container (max-width: 560px) {
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
          /* Stack icon above text so labels keep one line in narrow cards. */
          .flow-node {
            width: 100%;
            min-height: 0;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            padding: 10px 6px 9px;
            text-align: center;
          }
          .inverter-node { min-height: 0; }
          .node-icon { flex: 0 0 auto; width: 30px; height: 30px; }
          .node-copy { align-items: center; max-width: 100%; }
          .node-title {
            display: block;
            max-width: 100%;
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .node-copy strong { font-size: clamp(13px, 3.4cqw, 16px); }
          .node-status { max-width: 100%; font-size: 10px; }
          .node-badge { right: 6px; top: 6px; }
          /* The nodes already show these values; in narrow cards the
             floating labels would sit on top of the nodes. */
          .flow-label { display: none; }
          .performance-section { margin-inline: 8px; padding: 10px; }
          .efficiency-strip { gap: 8px; }
          .efficiency-item { min-height: 78px; gap: 9px; padding: 10px; }
          .ring { flex-basis: 48px; width: 48px; height: 48px; }
          .ring::before { inset: 5px; }
          .efficiency-copy span { font-size: 10px; }
          .efficiency-copy strong { font-size: 11px; }
          .balance-item { padding: 11px 12px; }
          .daily-section { margin-inline: 8px; padding: 12px; }
          .daily-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
          .daily-metric { min-height: 62px; grid-template-columns: auto minmax(0, 1fr); gap: 9px; padding: 10px; }
          .daily-icon { flex-basis: 34px; width: 34px; height: 34px; border-radius: 11px; }
          .daily-icon svg { width: 18px; height: 18px; }
          .daily-open { display: none; }
          .daily-metric strong { font-size: 14px; }
          .section-heading > span { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-line, .status-badge.online i { animation: none !important; }
          .flow-node, .daily-metric { transition: none; }
        }

        /* ---------------- Two-column layout ----------------
           Each column is its own size container, so every @container rule
           and cqw size inside adapts to the column it sits in. */
        .main-col, .side-col { min-width: 0; container-type: inline-size; }
        @container (min-width: 1000px) {
          .card-body.has-controls {
            display: grid;
            grid-template-columns: minmax(0, 1.45fr) minmax(380px, 1fr);
            align-items: start;
          }
          .card-body.has-controls .side-col .control-section { margin: 4px 16px 18px 4px; }
          .card-body.has-controls .main-col > .daily-section { margin-right: 8px; }
          .card-body.has-controls .main-col > .performance-section { margin-right: 8px; }
        }

        /* ---------------- Inverter controls ---------------- */
        .control-section {
          position: relative;
          margin: 14px 16px 18px;
          padding: 16px;
          border: 1px solid var(--deye-border);
          border-radius: 20px;
          background:
            linear-gradient(160deg, color-mix(in srgb, var(--deye-battery-soft) 42%, transparent), transparent 38%),
            color-mix(in srgb, var(--deye-card) 97%, var(--deye-surface) 3%);
        }
        .main-col:has(> .daily-section:last-child) + .side-col .control-section { margin-top: -4px; }
        .ctrl-kicker { color: var(--deye-battery); background: var(--deye-battery-soft); }
        .ctrl-meta { color: var(--deye-muted); font-size: 11px; text-align: right; }
        .ctrl-meta b { color: var(--deye-text); font-weight: 650; }
        .ctrl-hint {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: -4px 0 14px;
          color: var(--deye-muted);
          font-size: 11px;
        }
        .ctrl-hint svg {
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .ctrl-inverter { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: var(--deye-muted); font-size: 12px; }
        .ctrl-inverter select {
          border: 1px solid var(--deye-border);
          border-radius: 9px;
          padding: 4px 26px 4px 8px;
          color: var(--deye-text);
          background: var(--deye-card);
        }
        .ctrl-group + .ctrl-group { margin-top: 16px; }
        .ctrl-group-label {
          display: block;
          margin: 0 0 8px 2px;
          color: var(--deye-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .ctrl-icon {
          flex: 0 0 38px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: currentColor;
          background: color-mix(in srgb, currentColor 13%, transparent);
        }
        .ctrl-icon svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .ctrl-icon.warn { color: #d78c00; }

        /* Segmented mode pickers */
        .ctrl-modes { display: grid; gap: 10px; }
        .ctrl-mode {
          padding: 12px;
          border: 1px solid var(--deye-border);
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 96%, transparent);
          color: var(--deye-grid);
        }
        .ctrl-mode-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: var(--deye-text); font-size: 13px; font-weight: 700; }
        .ctrl-mode-head .ctrl-icon { color: var(--deye-grid); width: 32px; height: 32px; flex-basis: 32px; border-radius: 10px; }
        .ctrl-mode-head .ctrl-icon svg { width: 17px; height: 17px; }
        .ctrl-mode-head .ctrl-spinner { margin-left: auto; }
        .segmented {
          display: grid;
          grid-auto-columns: minmax(0, 1fr);
          grid-auto-flow: column;
          gap: 4px;
          padding: 4px;
          border-radius: 13px;
          background: color-mix(in srgb, var(--deye-muted) 11%, transparent);
        }
        .segment {
          min-width: 0;
          min-height: 38px;
          padding: 7px 8px;
          border: 0;
          border-radius: 10px;
          color: var(--deye-muted);
          background: transparent;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
          cursor: pointer;
          transition: background .18s ease, color .18s ease, box-shadow .18s ease;
        }
        .segment:hover:not(:disabled):not(.selected) { color: var(--deye-text); background: color-mix(in srgb, var(--deye-card) 60%, transparent); }
        .segment.selected {
          color: var(--deye-grid);
          background: var(--deye-card);
          box-shadow: 0 2px 8px rgba(18, 28, 45, .12), inset 0 0 0 1px color-mix(in srgb, var(--deye-grid) 30%, transparent);
          cursor: default;
        }
        .segment:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
        .segment:disabled { cursor: not-allowed; opacity: .55; }
        .ctrl-mode.pending .segmented { opacity: .6; }

        /* Toggle tiles */
        .ctrl-toggles { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; }
        .ctrl-toggle, .ctrl-limit {
          position: relative;
          min-width: 0;
          min-height: 68px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 12px;
          text-align: left;
          color: var(--deye-muted);
          border: 1px solid var(--deye-border);
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 96%, transparent);
          box-shadow: 0 5px 16px rgba(18, 28, 45, .035);
          cursor: pointer;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .ctrl-toggle.grid, .ctrl-limit.grid { --tone: var(--deye-grid); }
        .ctrl-toggle.solar, .ctrl-limit.solar { --tone: var(--deye-solar); }
        .ctrl-toggle.battery, .ctrl-limit.battery { --tone: var(--deye-battery); }
        .ctrl-toggle .ctrl-icon, .ctrl-limit .ctrl-icon { color: var(--tone); }
        .ctrl-toggle:hover:not(:disabled), .ctrl-limit:hover:not(:disabled):not(.editing) {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--tone) 30%, var(--deye-border));
          box-shadow: 0 9px 22px rgba(18, 28, 45, .075);
        }
        .ctrl-toggle:focus-visible, .ctrl-limit:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .ctrl-toggle:disabled, .ctrl-limit:disabled { cursor: not-allowed; opacity: .6; transform: none; }
        .ctrl-toggle.on {
          border-color: color-mix(in srgb, var(--tone) 38%, var(--deye-border));
          background: color-mix(in srgb, var(--deye-card) 90%, var(--tone) 10%);
        }
        .ctrl-toggle-copy, .ctrl-limit-copy { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .ctrl-toggle small, .ctrl-limit small {
          color: var(--deye-muted);
          font-size: 11px;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ctrl-toggle strong, .ctrl-limit strong {
          color: var(--deye-text);
          font-size: 15px;
          line-height: 1.15;
          white-space: nowrap;
        }
        .ctrl-toggle.on strong { color: color-mix(in srgb, var(--tone) 80%, var(--deye-text)); }
        .ctrl-limit strong em, .ctrl-input-wrap em {
          margin-left: 3px;
          color: var(--deye-muted);
          font-size: 11px;
          font-style: normal;
          font-weight: 650;
        }
        .switch-track {
          position: relative;
          width: 38px;
          height: 22px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--deye-muted) 28%, transparent);
          transition: background .2s ease;
        }
        .switch-track i {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, .25);
          transition: transform .2s ease;
        }
        .ctrl-toggle.on .switch-track { background: var(--tone); }
        .ctrl-toggle.on .switch-track i { transform: translateX(16px); }
        .ctrl-toggle.unknown .switch-track { background: repeating-linear-gradient(45deg, color-mix(in srgb, var(--deye-muted) 22%, transparent) 0 4px, transparent 4px 8px); }

        /* Limit tiles */
        .ctrl-limits { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .ctrl-edit-icon { width: 16px; height: 16px; color: var(--deye-muted); opacity: .6; transition: opacity .18s ease; }
        .ctrl-edit-icon svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
        .ctrl-limit:hover .ctrl-edit-icon { opacity: 1; }
        .ctrl-limit.editing {
          cursor: default;
          border-color: color-mix(in srgb, var(--tone) 55%, var(--deye-border));
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 16%, transparent);
        }
        .ctrl-input-wrap { display: flex; align-items: baseline; }
        .ctrl-input-wrap input::-webkit-outer-spin-button,
        .ctrl-input-wrap input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .ctrl-input-wrap input {
          -moz-appearance: textfield;
          appearance: textfield;
          width: 100%;
          min-width: 0;
          padding: 2px 0;
          border: 0;
          border-bottom: 2px solid color-mix(in srgb, var(--tone) 60%, transparent);
          outline: none;
          color: var(--deye-text);
          background: transparent;
          font: inherit;
          font-size: 15px;
          font-weight: 700;
        }
        .ctrl-edit-actions { display: flex; gap: 6px; }
        .icon-btn {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 1px solid var(--deye-border);
          border-radius: 10px;
          color: var(--deye-muted);
          background: var(--deye-card);
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }
        .icon-btn.ok { color: #fff; border-color: transparent; background: var(--tone); }
        .icon-btn:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

        /* Time-of-use timeline */
        .tou-card {
          margin-top: 10px;
          padding: 12px 14px 10px;
          border: 1px solid var(--deye-border);
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 96%, transparent);
          color: var(--deye-battery);
        }
        .tou-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .tou-head .ctrl-icon { width: 32px; height: 32px; flex-basis: 32px; border-radius: 10px; }
        .tou-head .ctrl-icon svg { width: 17px; height: 17px; }
        .tou-head small { display: block; color: var(--deye-muted); font-size: 11px; }
        .tou-head strong { display: block; margin-top: 2px; color: var(--deye-text); font-size: 12px; font-weight: 700; }
        .tou-track {
          position: relative;
          display: flex;
          gap: 3px;
          height: 64px;
          padding: 4px;
          border-radius: 13px;
          background: color-mix(in srgb, var(--deye-muted) 9%, transparent);
        }
        .tou-seg {
          position: relative;
          min-width: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
          border-radius: 9px;
          background: color-mix(in srgb, var(--deye-battery) 8%, transparent);
        }
        .tou-seg i {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 9px 9px 0 0;
          background: linear-gradient(180deg, color-mix(in srgb, var(--deye-battery) 55%, white), color-mix(in srgb, var(--deye-battery) 78%, transparent));
          opacity: .55;
          transition: height .3s ease;
        }
        .tou-seg.active i { opacity: 1; }
        .tou-seg.active { box-shadow: inset 0 0 0 2px var(--deye-battery); }
        .tou-seg span {
          position: relative;
          z-index: 1;
          margin-bottom: 5px;
          padding: 1px 5px;
          border-radius: 999px;
          color: var(--deye-text);
          background: color-mix(in srgb, var(--deye-card) 82%, transparent);
          font-size: 10px;
          font-weight: 800;
        }
        .tou-now {
          position: absolute;
          top: -3px;
          bottom: -3px;
          width: 2px;
          margin-left: -1px;
          border-radius: 2px;
          background: var(--deye-load);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--deye-load) 20%, transparent);
          z-index: 2;
        }
        .tou-now::before {
          content: "";
          position: absolute;
          top: -4px;
          left: -3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--deye-load);
        }
        .tou-axis { display: flex; justify-content: space-between; margin-top: 6px; padding: 0 2px; color: var(--deye-muted); font-size: 10px; font-variant-numeric: tabular-nums; }
        .tou-card.off .tou-seg i { opacity: .2; }
        .tou-card.off .tou-seg.active { box-shadow: none; }

        /* Confirmation + status */
        .ctrl-confirm {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 12px 14px;
          border: 1px solid color-mix(in srgb, #d78c00 36%, var(--deye-border));
          border-radius: 17px;
          background: color-mix(in srgb, var(--deye-card) 88%, var(--deye-solar-soft) 12%);
          box-shadow: 0 10px 26px rgba(18, 28, 45, .1);
          animation: ctrlRise .22s ease-out;
        }
        .ctrl-confirm-copy { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .ctrl-confirm-copy strong { font-size: 13px; }
        .ctrl-confirm-copy span { color: var(--deye-muted); font-size: 12px; overflow-wrap: anywhere; }
        .ctrl-confirm-copy s { opacity: .75; }
        .ctrl-confirm-copy b { color: var(--deye-text); }
        .ctrl-confirm-actions { display: flex; gap: 8px; }
        .btn {
          min-height: 36px;
          padding: 7px 15px;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }
        .btn.ghost { color: var(--deye-text); background: transparent; border: 1px solid var(--deye-border); }
        .btn.primary {
          color: #fff;
          border: 0;
          background: linear-gradient(135deg, color-mix(in srgb, var(--deye-battery) 82%, white), var(--deye-battery));
          box-shadow: 0 6px 16px color-mix(in srgb, var(--deye-battery) 35%, transparent);
        }
        .btn:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .ctrl-toast {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 12px;
          padding: 10px 13px;
          border-radius: 13px;
          font-size: 12px;
          font-weight: 650;
          overflow-wrap: anywhere;
          animation: ctrlRise .22s ease-out;
        }
        .ctrl-toast.info { color: var(--deye-grid); background: var(--deye-grid-soft); }
        .ctrl-toast.success { color: var(--deye-battery); background: var(--deye-battery-soft); }
        .ctrl-toast.error { color: var(--deye-load); background: var(--deye-load-soft); }
        .ctrl-spinner {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          border-radius: 50%;
          border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
          border-top-color: currentColor;
          animation: ctrlSpin .8s linear infinite;
        }
        .ctrl-toggle .ctrl-spinner, .ctrl-limit .ctrl-spinner { color: var(--tone); }
        @keyframes ctrlSpin { to { transform: rotate(360deg); } }
        @keyframes ctrlRise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        @container (min-width: 640px) {
          /* Three switch tiles in a row only when each keeps its full label. */
          .ctrl-toggles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @container (min-width: 720px) {
          .ctrl-modes { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
          .ctrl-limits { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @container (max-width: 520px) {
          .ctrl-toggle { min-height: 58px; }
          .segment { font-size: 11px; padding: 6px 4px; }
        }
        @container (max-width: 560px) {
          .control-section { margin-inline: 8px; padding: 12px; }
          .ctrl-limits { gap: 8px; }
          .ctrl-limit { grid-template-columns: minmax(0, 1fr) auto; padding: 11px; }
          .ctrl-limit .ctrl-icon { display: none; }
          .ctrl-limit.editing { grid-column: 1 / -1; grid-template-columns: minmax(0, 1fr) auto; }
          .ctrl-confirm { grid-template-columns: auto minmax(0, 1fr); }
          .ctrl-confirm-actions { grid-column: 1 / -1; justify-content: flex-end; }
          .ctrl-meta { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctrl-toggle, .ctrl-limit, .segment, .switch-track i, .tou-seg i { transition: none; }
          .ctrl-confirm, .ctrl-toast { animation: none; }
          .ctrl-spinner { animation-duration: 2.4s; }
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
    return resolveLanguage(this._hass, stationId);
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
        ${this._switch("show_controls", t.editorControls, this._config.show_controls !== false)}
        <p class="hint">${escapeHtml(t.dataHint)}</p>
      </div>`;

    this.shadowRoot.getElementById("station")?.addEventListener("change", (event) =>
      this._setValue("station_id", event.target.value || undefined)
    );
    this.shadowRoot.getElementById("title")?.addEventListener("change", (event) =>
      this._setValue("title", event.target.value.trim() || undefined)
    );
    ["show_daily", "show_efficiency", "animation", "show_controls"].forEach((key) => {
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
const pickerStrings = STRINGS[interfaceLanguage()];
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
