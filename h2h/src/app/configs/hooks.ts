import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import i18n from "i18n";
import { readYAML, writeYAML } from "app/utils/fileManage";

import _ from "@lodash";
import { ColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

// constants
import { DEFAULT_THEME } from "./";
import { DEFAULT_LANGUAGE, LocaleNameType } from "./languages";
import { APP_CONFIG_FILE } from "./paths";
import { ThemeType } from "./themes";

// tauri apis
import { BaseDirectory } from "@tauri-apps/api/fs";

export type ConfigType = {
  colorScheme: ColorScheme;
  theme: ThemeType;
  language: LocaleNameType;
  sidebar: {
    open: boolean;
    position: "left" | "right" | "bottom";
  };
};

export const useDefaultConfig: () => ConfigType = () => {
  const preferredColorScheme = useColorScheme();

  return useMemo(
    () => ({
      colorScheme: preferredColorScheme,
      theme: DEFAULT_THEME,
      language: DEFAULT_LANGUAGE.id,
      sidebar: {
        open: false,
        position: "right",
      },
    }),
    [preferredColorScheme]
  );
};

type UpdateConfigType = Flatten<ConfigType>;
export type UpdateConfigFnType = <K extends keyof UpdateConfigType>(
  key: K,
  value: UpdateConfigType[K]
) => void;

export const useLocalConfig: () => [
  ConfigType | undefined,
  () => Promise<void>,
  <K extends keyof UpdateConfigType>(key: K, value: UpdateConfigType[K]) => void
] = () => {
  const [config, setConfig] = useState<ConfigType>();

  const DEFAULT_CONFIG = useDefaultConfig();
  const loadLocalConfig = useCallback(async () => {
    readYAML<ConfigType>(
      APP_CONFIG_FILE,
      BaseDirectory.AppConfig,
      false,
      true,
      DEFAULT_CONFIG
    ).then((result) => {
      i18n.changeLanguage(result?.language).then(() => dayjs.locale(i18n.resolvedLanguage));
      setConfig(result);
    });
  }, [DEFAULT_CONFIG]);

  function updateLocalConfig<K extends keyof UpdateConfigType>(key: K, value: UpdateConfigType[K]) {
    const newConfig = _.setIn(config, key, value);
    setConfig(newConfig);
    writeYAML(APP_CONFIG_FILE, newConfig, BaseDirectory.AppConfig, true);
  }

  return [config, loadLocalConfig, updateLocalConfig];
};
