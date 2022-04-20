// APIs
export const API_HEADER_KEYS = {
  API_CLIENT_KEY: "X-Api-Client-Key",
  ANTI_FRAUD_METADATA: "X-Anti-Fraud-Metadata",
  FRAUD_METADATA: "X-Cash-Anti-Fraud-Metadata",
  API_VERSION: "x-cash-api-version",
  RE_CAPTCHA: "X-Cash-reCAPTCHA",
  IDEMPOTENCY_KEY: "Idempotency-Key",
  METRIC_DATA: "X-Cash-002",
};

export const API_DEFAULT_TIMEOUT = 30000;

export const NETWORK_ERROR_CODES = {
  CONNECTION_ABORTED: "ECONNABORTED",
};

export const METADATA_KEYS = {
  IP_ADDRESS: "ip_address",
  DEVICE_ID: "device_id",
  MOBILE_MODEL: "mobile_model",
  MOBILE_VENDOR: "mobile_vendor",
  OS_NAME: "os_name",
  USER_AGENT: "user_agent",
  DEVICE_TYPE: "device_type",
  BROWSER_NAME: "browser_name",
  BROWSER_VERSION: "browser_version",
  URL_DOMAIN_NAME: "url_domain_name",
  BROWSER_TIMEZONE: "browser_timezone",
  TIME_ZONE: "user_timezone",
  SCREEN_RESOLUTION: "screen_resolution",
  SCREEN_WIDTH: "screen_width",
  SCREEN_HEIGHT: "screen_height",
  COLOR_DEPTH: "color_depth",
  WINDOW_POSITION_X: "window_position_x",
  WINDOW_POSITION_Y: "window_position_y",
  IS_INCOGNITO: "is_incognito",
  LOCATION_LATITUDE: "location_latitude",
  LOCATION_LONGITUDE: "location_longitude",
  PIXEL_DEPTH: "pixel_depth",
  PIXEL_RATIO: "pixel_ratio",
  BATTERY_LEVEL: "battery_level",
  IS_BATTERY_CHARGING: "is_battery_charging",
  IS_CONNECTED_TO_WIFI: "is_connected_to_wifi",
};

export const API_STATUS = {
  UNAUTHORIZED: 401,
  INVALID_API_KEY: 403,
  NOT_FOUND: 404,
};