import { useMemo } from "react";
import { SimpleMenuItemType } from "@ishtar/components/menu/SimpleMenu";
import { useTranslation } from "react-i18next";

export const useMenuItemGroups = () => {
  const { t } = useTranslation("menu");

  const menuItemGroups: Record<string, Array<SimpleMenuItemType>> = useMemo(
    () => ({
      [t("view.view")]: [
        {
          type: "item",
          label: t("view.history"),
          onClick: () => console.log("history"),
        },
      ],
      [t("help.help")]: [
        {
          type: "link",
          label: t("help.documentation"),
          link: "https://github.com/Toshinaki/H2H",
        },
        {
          type: "item",
          label: t("help.reportIssue"),
          onClick: () => console.log("update"),
        },
        {
          type: "item",
          label: t("help.checkUpdate"),
          onClick: () => console.log("update"),
        },
        "divider",
        {
          type: "item",
          label: t("help.about"),
          onClick: () => console.log("about"),
        },
      ],
    }),
    [t]
  );
  return menuItemGroups;
};
