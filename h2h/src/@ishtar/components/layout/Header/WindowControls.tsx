import { memo, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  ActionIcon,
  ActionIconProps,
  Group,
  createPolymorphicComponent,
  createStyles,
} from "@mantine/core";
import {
  VscChromeMinimize,
  VscChromeRestore,
  VscChromeMaximize,
  VscChromeClose,
} from "react-icons/vsc";

import { useControlWrapperStyles } from "./header.styles";

import { appWindow } from "@tauri-apps/api/window";

const _ControlButton = styled(ActionIcon)`
  height: 1.75rem;
  min-height: 1.75rem;
  width: 3rem;
  min-width: 3rem;
  border-radius: 0;

  &:hover {
    background-color: ${({ theme }) => theme.fn.rgba(theme.colors.dark[4], 0.5)};
  }
`;

const ControlButton = createPolymorphicComponent<"button", ActionIconProps>(_ControlButton);

const useStyles = createStyles((theme) => ({
  closeControl: {
    "&:hover": {
      backgroundColor: theme.colors.red[7],
      color: theme.white,
    },
  },
}));

const WindowControls = () => {
  const { classes } = useStyles();
  const {
    classes: { controlWrapper },
  } = useControlWrapperStyles();

  const [maxmized, setMaxmized] = useState(false);

  const toggleMaximize = async () => {
    await appWindow.toggleMaximize();
    setMaxmized(await appWindow.isMaximized());
  };

  useEffect(() => {
    appWindow.isMaximized().then(setMaxmized);
  }, []);

  return (
    <Group spacing={0} className={controlWrapper}>
      <ControlButton onClick={() => appWindow.minimize()}>
        <VscChromeMinimize />
      </ControlButton>
      <ControlButton onClick={toggleMaximize}>
        {maxmized ? <VscChromeRestore /> : <VscChromeMaximize />}
      </ControlButton>
      <ControlButton onClick={() => appWindow.close()} className={classes.closeControl}>
        <VscChromeClose />
      </ControlButton>
    </Group>
  );
};

export default memo(WindowControls);
