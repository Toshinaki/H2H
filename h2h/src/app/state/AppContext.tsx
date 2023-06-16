import "@fontsource/noto-sans-sc";

import { createContext, useContext, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import _ from "@lodash";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { ConfigType, UpdateConfigFnType, useLocalConfig } from "../configs/hooks";
// constants & configs
import { THEMES } from "../configs/themes";
// styles
import { globalStyles } from "../styles";

type ConfigContextType = {
  config: ConfigType;
  updateConfig: UpdateConfigFnType;
};

const ConfigContext = createContext<ConfigContextType | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error(
      "useConfig hook was called outside of context, make sure your app is wrapped with ConfigProvider component"
    );
  }

  return context;
};

type ConfigProviderProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 864000000, // 60 * 60 * 24 * 10 * 1000
      suspense: true,
      networkMode: "offlineFirst",
    },
    mutations: { networkMode: "offlineFirst" },
  },
});

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, loadConfig, updateConfig] = useLocalConfig();

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      {config ? (
        <ConfigContext.Provider value={{ config, updateConfig }}>
          <ColorSchemeProvider
            colorScheme={config.colorScheme}
            toggleColorScheme={(value?: ColorScheme) =>
              updateConfig(
                "colorScheme",
                value || (config.colorScheme === "dark" ? "light" : "dark")
              )
            }
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={_.merge(
                { colorScheme: config.colorScheme, ...THEMES[config.theme] },
                globalStyles
              )}
            >
              <ModalsProvider>{children}</ModalsProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </MantineProvider>
          </ColorSchemeProvider>
        </ConfigContext.Provider>
      ) : null}
    </QueryClientProvider>
  );
};

export default ConfigProvider;
