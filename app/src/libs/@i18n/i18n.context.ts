import { createContext } from "react";
// import type { Language } from "libs/schemas";

export interface I18nContextType {
  // language: Language;
  languageId: string;
  changeLanguage: (languageId: string) => Promise<void>;
  // langDir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

export default I18nContext;
