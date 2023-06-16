import styled from "@emotion/styled";
import { ActionIcon, ActionIconProps, createPolymorphicComponent } from "@mantine/core";

const _ControlButton = styled(ActionIcon)`
  height: 1.75rem;
  min-height: 1.75rem;
  width: 3rem;
  min-width: 3rem;
  border-radius: 0;
`;

const ControlButton = createPolymorphicComponent<"button", ActionIconProps>(_ControlButton);

export default ControlButton;
