# const.py
DOMAIN = "deyecloud"
CONF_USERNAME = "username"
CONF_PASSWORD = "password"
CONF_APP_ID = "app_id"
CONF_APP_SECRET = "app_secret"
CONF_BASE_URL = "base_url"
CONF_START_MONTH = "start_month"
CONF_CARD_LANGUAGE = "card_language"

DEFAULT_CARD_LANGUAGE = "auto"
CARD_LANGUAGES = {
    "auto": "Home Assistant",
    "en": "English",
    "ru": "Русский",
    "vi": "Tiếng Việt",
}

# Optional. Required for some DeyeCloud installer/business accounts.
# When set, token requests include companyId and stations are queried in the
# business/company context instead of the personal-user context.
CONF_COMPANY_ID = "company_id"

# Polling interval in minutes. DeyeCloud announced OpenAPI quotas/rate limits,
# so users need to be able to back off without patching the source (#29).
CONF_SCAN_INTERVAL = "scan_interval"
DEFAULT_SCAN_INTERVAL = 1
MIN_SCAN_INTERVAL = 1
MAX_SCAN_INTERVAL = 60
