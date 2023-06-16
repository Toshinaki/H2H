export const DEFAULT_LANGUAGE: LanguageType = {
  id: "zh",
  title: "中文",
  flag: "zh",
};

const LANGUAGES: LanguageType[] = [
  {
    id: "en",
    title: "English",
    flag: "us",
  },
  DEFAULT_LANGUAGE,
];

export const LocaleMap = {
  en: "en",
  ja: "ja",
  zh: "zh",
};

export default LANGUAGES;

export type LocaleNameType = keyof typeof LocaleMap;

export type LanguageType = {
  id: LocaleNameType;
  title: string;
  flag: string;
};
