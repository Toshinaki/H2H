import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "zh",
    fallbackLng: "en",
    // ns: ["common", "menu", "pages"],
    // ns: ["translation"],
    ns: ["common"],
    debug: process.env.NODE_ENV !== "production",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // react: {
    //   //   wait: true,
    //   useSuspense: false,
    // },
  });

export default i18n;
