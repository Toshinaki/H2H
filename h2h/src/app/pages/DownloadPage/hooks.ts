import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useTabs = () => {
  const { t } = useTranslation("pages/download");

  const tabs = useMemo(
    () => [
      { label: t("tabs.formats"), value: "formats" },
      { label: t("tabs.videos"), value: "videos" },
    ],
    [t]
  );

  return tabs;
};
