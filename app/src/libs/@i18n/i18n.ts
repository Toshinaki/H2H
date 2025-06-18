import i18n from "i18next";
import LanguageDector from "i18next-browser-languagedetector";
import Backend, { type ChainedBackendOptions } from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import logger from "@ig/utils/logger";

i18n
  .use(LanguageDector)
  .use(Backend)
  .use(initReactI18next)
  .init<ChainedBackendOptions>({
    lng: "zh",
    fallbackLng: "zh",
    ns: [],
    debug: !import.meta.env.PROD,
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend(async (lng: string, ns: string) =>
          (await fetch(`/locales/${lng}/${ns}.json`)).json(),
        ),
      ],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    missingKeyHandler: logger.warn,
  });

export default i18n;
