import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { memo, useMemo, useState } from "react";

import LANGUAGES, { DEFAULT_LANGUAGE } from "@/configs/languages";
import {
  Button,
  ButtonProps,
  createStyles,
  Flex,
  Group,
  Image,
  INPUT_SIZES,
  MantineProvider,
  Menu,
  rem,
  Text,
} from "@mantine/core";

import LanguageSwitchLink from "./SwitcherLink";

interface LanguageSwitcherStylesParams {
  size: string;
}

const useStyles = createStyles((theme, { size }: LanguageSwitcherStylesParams) => ({
  root: { width: 120, margin: 2 },
  animation: {
    overflow: "hidden",
    borderRadius: `calc(${size} / 2)`,
    backgroundClip: "padding-box",
    display: "flex",
  },
  iconWrapper: { color: "inherit" },
  image: {
    border: `3px solid currentColor`,
    borderRadius: `calc(${size} / 2)`,
    backgroundClip: "padding-box",
    width: `calc(${size} - ${rem(2)}) !important`,
  },
  button: {
    width: "100%",
    borderRadius: `calc(${size} / 2)`,
    backgroundClip: "padding-box",
    paddingLeft: 0,
    color: "inherit",
  },
  buttonInner: { justifyContent: "flex-start" },
  buttonLabel: { flex: 1, justifyContent: "center" },
  item: { color: "inherit" },
  link: { color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "none" } },
}));

export interface LanguageSwitcherProps
  extends Omit<ButtonProps, "color" | "leftIcon" | "onMouseEnter" | "onMouseLeave"> {}

const LanguageSwitcher = ({ className, size = "sm", ...props }: LanguageSwitcherProps) => {
  const sizeInPixel = useMemo(() => INPUT_SIZES[size as keyof typeof INPUT_SIZES], [size]);
  const { classes, cx } = useStyles({ size: sizeInPixel });

  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const variants = useMemo(() => {
    return {
      initial: { width: sizeInPixel },
      active: {
        width: 120,
        transition: { ease: "easeInOut" },
      },
    };
  }, [sizeInPixel]);

  const router = useRouter();
  const locale = (router.query.locale || "") as string;
  const currLng = useMemo(
    () => LANGUAGES.find((lng) => lng.id === locale) || DEFAULT_LANGUAGE,
    [locale]
  );

  return (
    <Flex align="center" justify="flex-end" className={classes.root}>
      <motion.div
        variants={variants}
        initial="initial"
        animate={expanded || hovered ? "active" : "initial"}
        className={cx(className, classes.animation)}
      >
        <MantineProvider theme={{ colorScheme: "dark" }} inherit>
          <Menu
            onOpen={() => !expanded && setExpanded(true)}
            onClose={() => expanded && setExpanded(false)}
          >
            <Menu.Target>
              <Button
                size={size}
                color="dark"
                leftIcon={
                  <Image
                    alt={currLng.id}
                    src={`/images/flags/${currLng.flag}.svg`}
                    className={classes.image}
                  />
                }
                onMouseEnter={() => !hovered && setHovered(true)}
                onMouseLeave={() => hovered && setHovered(false)}
                {...props}
                classNames={{
                  root: classes.button,
                  inner: classes.buttonInner,
                  label: classes.buttonLabel,
                }}
              >
                {currLng.title}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              {LANGUAGES.map((lng) => (
                <Menu.Item key={lng.id} disabled={currLng.id === lng.id} className={classes.item}>
                  <LanguageSwitchLink locale={lng.id} className={classes.link}>
                    <Group noWrap>
                      <Image
                        alt={lng.id}
                        src={`/images/flags/${lng.flag}.svg`}
                        className={classes.image}
                      />
                      <Text>{lng.title}</Text>
                    </Group>
                  </LanguageSwitchLink>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </MantineProvider>
      </motion.div>
    </Flex>
  );
};

export default memo(LanguageSwitcher);
