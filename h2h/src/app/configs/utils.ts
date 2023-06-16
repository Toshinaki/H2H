// import { readYAML } from "app/utils/fileManage";
// import { APP_CONFIG_FILE } from "./paths";
// import { BaseDirectory } from '@tauri-apps/api/fs';

import { MantineTheme } from "@mantine/core";

// export const readAppConfigs = async () => readYAML(APP_CONFIG_FILE, BaseDirectory.AppConfig, {}, true);

// export const updateAppConfig = async () => {};

// export const readDownloadConfigs = async () => {};

// export const updateDownloadConfig = async () => {};

export const getThemeColors = (theme: MantineTheme) => {
  const isDark = theme.colorScheme === "dark";
  return [isDark ? theme.black : theme.white, theme.colors.primary[isDark ? 1 : 3]];
};
