import { useConfig } from "app/state/AppContext";
import LANGUAGES, { DEFAULT_LANGUAGE, LanguageType } from "app/configs/languages";
import { FLAG_PATH } from "app/configs/paths";
import i18n from "i18n";
import { memo, useCallback, useMemo, useState } from "react";

import { Image } from "@mantine/core";

import SimpleMenu, { SimpleMenuItemType } from "../../menu/SimpleMenu";
import SwitchButton, { SwitchButtonStyleParams } from "./SwitchButton";

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/zh";

export type LanguageSwitcherProps = Partial<SwitchButtonStyleParams>;

const LanguageSwitcher = ({ size = 24, maxWidth = 88 }: LanguageSwitcherProps) => {
  const [expanded, setExpanded] = useState(false);

  const {
    config: { language },
    updateConfig,
  } = useConfig();
  const currLng = useMemo(
    () => LANGUAGES.find((lng) => lng.id === language) || DEFAULT_LANGUAGE,
    [language]
  );
  const handleLngChange = useCallback(
    (language: LanguageType["id"]) => {
      updateConfig("language", language);
      i18n.changeLanguage(language);
      dayjs.locale(language);
    },
    [updateConfig]
  );

  const menuItems = useMemo(
    (): Array<SimpleMenuItemType> => [
      {
        type: "item",
        label: currLng.title,
        icon: (
          <Image src={FLAG_PATH(currLng.flag)} alt={currLng.title} withPlaceholder width={size} />
        ),
        disabled: true,
      },
      "divider",
      ...LANGUAGES.filter((lng) => lng.id !== language).map(
        (lng): SimpleMenuItemType => ({
          type: "item",
          label: lng.title,
          icon: <Image src={FLAG_PATH(lng.flag)} alt={lng.title} withPlaceholder width={size} />,
          onClick: () => handleLngChange(lng.id),
        })
      ),
    ],
    [currLng, handleLngChange, language, size]
  );

  return (
    <SimpleMenu
      onOpen={() => !expanded && setExpanded(true)}
      onClose={() => expanded && setExpanded(false)}
      target={
        <SwitchButton
          icon={FLAG_PATH(currLng.flag)}
          text={currLng.title}
          opened={expanded}
          size={size}
          maxWidth={maxWidth}
        />
      }
      items={menuItems}
      position="bottom-start"
      offset={4}
      withinPortal
    />
  );
};

export default memo(LanguageSwitcher);
