import { useContext } from "react";
import I18nContext from "./i18n.context";

export const useI18nContext = () => {
  const i18nContext = useContext(I18nContext);

  if (!i18nContext) {
    throw new Error('"useI18nContext" has to be used within <I18nContext.Provider>');
  }

  return i18nContext;
};
