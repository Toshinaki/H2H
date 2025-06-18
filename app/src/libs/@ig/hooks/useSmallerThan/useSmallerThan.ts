import useMediaQuery from "@mui/material/useMediaQuery";
import { SMALL_SCREEN_BREAKPOINT } from "configs/app.config";
import type { Breakpoint } from "@mui/material/styles";

export const useSmallerThan = (size: Breakpoint | number = SMALL_SCREEN_BREAKPOINT) =>
  useMediaQuery((theme) => theme.breakpoints.down(size));
