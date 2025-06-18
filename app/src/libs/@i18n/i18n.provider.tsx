import { useEffect, useState } from "react";
import { useAppStore } from "store";
import { useShallow } from "zustand/react/shallow";
import I18nContext from "./i18n.context";
import _ from "@lodash";
import i18n from "./i18n";

const I18nProvider = ({ children }: React.PropsWithChildren) => {
  const [currLang, updateUser] = useAppStore(
    useShallow((state) => [state.config.current.app.language, state.auth.updateUser]),
  );

  const [langId, setLangId] = useState(i18n.options.lng || currLang);

  const changeLanguage = async (languageId: string) => {
    setLangId(languageId);
    updateUser({ preference: { app: { language: languageId } } });
    await i18n.changeLanguage(languageId);
  };

  useEffect(() => {
    if (langId !== i18n.options.lng) {
      i18n.changeLanguage(langId);
    }
  }, [langId]);

  return (
    <I18nContext.Provider
      value={{
        changeLanguage,
        languageId: langId,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
