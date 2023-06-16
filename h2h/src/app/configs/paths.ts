export const ROOT = process.env.NODE_ENV !== "production" ? "dev_h2h" : "H2H";

// export const BINARY_ROOT = `${ROOT}/bin`;

// export const CONFIG_FILE_ROOT = `configs`;
export const APP_CONFIG_FILE = "h2h_config.yml";

export const DOWNLOAD_CONFIG_ROOT = "download_configs";
export const DEFAULT_DOWNLOAD_CONFIG_FILE = `${DOWNLOAD_CONFIG_ROOT}/default_config.yml`;

export const HISTORY_ROOT = "history";
export const HISTORY_INDEX = `${HISTORY_ROOT}/index.yml`;
export const HISTORY_PATH = (vid: string) => `${HISTORY_ROOT}/${vid}.yml`;

export const TEMP_ROOT = "temp";

// export const ASSETS = `${process.env.PUBLIC_URL}/assets`;
// export const ASSETS = process.env.PUBLIC_URL + "/assets";
export const ASSETS = "assets";
// export const IMAGES = `${ASSETS}/images`;
export const IMAGES = `/images`;
export const FLAG_PATH = (flag: string) => `${IMAGES}/flags/${flag}.svg`;
