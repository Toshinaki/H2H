import type { z } from "zod";
import type {
  LayoutConfigSchema,
  UIConfigSchema,
  AppConfigSchema,
  ConfigSchema,
  PageOverrideUIConfigSchema,
  UserOverrideConfigSchema,
  UIStateSchema,
  SizeSchema,
  ResponsiveSizeSchema,
  BreakpointSchema,
} from "./configs.schema";

export type LayoutConfig = z.infer<typeof LayoutConfigSchema>;
export type UIConfig = z.infer<typeof UIConfigSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export type PageOverrideUIConfig = z.infer<typeof PageOverrideUIConfigSchema>;
export type UserOverrideConfig = z.infer<typeof UserOverrideConfigSchema>;

export type UIState = z.infer<typeof UIStateSchema>;

export type Breakpoint = z.infer<typeof BreakpointSchema>;
export type ResponsiveSize = z.infer<typeof ResponsiveSizeSchema>;
export type Size = z.infer<typeof SizeSchema> | ResponsiveSize;
