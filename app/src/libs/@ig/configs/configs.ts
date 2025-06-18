import type { AppConfig, UIConfig } from "./types";

export const DEFAULT_UI_CONFIG: UIConfig = {
  layout: {
    header: {
      show: true,
      inner: false,
      autohide: {
        scrollHeight: 0,
      },
      size: 60,
      theme: "default",
    },
    footer: {
      show: true,
      inner: false,
      size: 60,
      theme: "default",
    },
    leftSidebar: {
      show: true,
      inner: false,
      autohide: {
        enabled: true,
        breakpoint: "sm",
      },
      fold: {
        enabled: true,
        size: 80,
        breakpoint: "md",
      },
      offset: 0,
      radius: 0,
      size: 280,
      theme: "default-dark",
    },
    rightSidebar: {
      show: true,
      inner: false,
      autohide: {
        enabled: true,
        breakpoint: "sm",
      },
      fold: {
        enabled: false,
      },
      offset: 0,
      radius: 0,
      size: 280,
      theme: "default",
    },
    main: {
      theme: "default",
    },
  },
  radius: 4,
  scale: 1,
  scroll: "content",
};

export const DEFAULT_APP_CONFIG: AppConfig = {
  name: "Highway 2 Hell",
  language: "zh",
  supporttedLanguages: {
    zh: { id: "zh", name: "中文" },
    en: { id: "en", name: "English" },
  },
  contact: {
    name: "Toshinaki",
    email: "shaduking@hotmail.com",
  },
};
