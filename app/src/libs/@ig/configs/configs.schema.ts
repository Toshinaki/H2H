import { z } from "zod";
import { deepPartialify } from "@ig/utils/deepPartialify";
import { ThemeIDSchema } from "./themes/theme.schema";

//
// UI settings ==================================================================
//

const BreakpointSchema = z.enum(["xs", "sm", "md", "lg", "xl"]);
const SizeSchema = z.number().nonnegative();
const ResponsiveSizeSchema = z.record(
  z.union([BreakpointSchema, z.number().positive().int()]),
  SizeSchema,
);

const CommonSchema = z.object({
  show: z.boolean(),
  inner: z.boolean(),
  size: z.union([SizeSchema, ResponsiveSizeSchema]),
  // TODO use enum
  theme: ThemeIDSchema,
  darkmode: z.boolean(),
});

const SidebarConfigSchema = z
  .object({
    autohide: z.object({
      enabled: z.boolean(),
      breakpoint: z.union([BreakpointSchema, SizeSchema]).optional(),
    }),
    fold: z.object({
      enabled: z.boolean(),
      breakpoint: z.union([BreakpointSchema, SizeSchema]).optional(), // auto fold if breakpoint is set; cannot pin if under breakpoint
      size: z.union([SizeSchema, ResponsiveSizeSchema]).optional(), // size when folded
    }),
    offset: SizeSchema,
    radius: z.number().nonnegative().int().max(40).optional(),
  })
  .merge(CommonSchema);

export const LayoutConfigSchema = z.object({
  header: z
    .object({
      // Scroll-based auto-hide threshold; 0 means never hide, otherwise hide when scrolled past this vertical offset
      autohide: z.object({
        scrollHeight: z.number().nonnegative(), // set to 0, to disable autohide in some pages
        size: z.union([SizeSchema, ResponsiveSizeSchema]).optional(),
      }),
    })
    .merge(CommonSchema),
  leftSidebar: SidebarConfigSchema,
  rightSidebar: SidebarConfigSchema,
  footer: CommonSchema,
  main: z.object({
    theme: ThemeIDSchema,
    darkmode: z.boolean(),
  }),
});

export const UIConfigSchema = z.object({
  layout: LayoutConfigSchema,
  scale: z.number().min(0.5).max(3).step(0.1),
  radius: z.number().int().min(0).max(40),
  scroll: z.enum(["unset", "content"]),
});

// ui state

const SidebarStateSchema = z.object({
  opened: z.boolean(),
  hiddenOpened: z.boolean(), // as drawer, when autohide is enabled
  folded: z.boolean(), // if breakpoint & under breakpoint, this is ignored
  foldOpened: z.boolean().optional(), // maybe not used
});

export const UIStateSchema = z.object({
  layout: z.object({
    leftSidebar: SidebarStateSchema,
    rightSidebar: SidebarStateSchema,
  }),
});

//
// App settings =================================================================
//

const SupporttedLanguageSchema = z.string();
const LanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const AppConfigSchema = z.object({
  name: z.union([z.string(), z.record(SupporttedLanguageSchema, z.string())]),
  language: SupporttedLanguageSchema,
  supporttedLanguages: z.record(SupporttedLanguageSchema, LanguageSchema),
  contact: z.object({
    name: z.string(),
    email: z.string(),
    site: z.string().optional(),
    phone: z.string().optional(),
    sns: z.record(z.string(), z.string()).optional(),
  }),
});

//
// combined =================================================================
//

export const ConfigSchema = z.object({
  app: AppConfigSchema,
  ui: UIConfigSchema,
});

//
// override configs ===========================================================
//

export const PageOverrideUIConfigSchema = deepPartialify(
  UIConfigSchema.pick({
    scroll: true,
  }).extend({
    layout: LayoutConfigSchema.extend({
      leftSidebar: LayoutConfigSchema.shape.leftSidebar.merge(
        SidebarStateSchema.pick({ folded: true }),
      ),
      rightSidebar: LayoutConfigSchema.shape.rightSidebar.merge(
        SidebarStateSchema.pick({ folded: true }),
      ),
    }),
  }),
);

export const UserOverrideConfigSchema = deepPartialify(
  z.object({
    app: AppConfigSchema.pick({ language: true }),
    ui: UIConfigSchema.pick({
      radius: true,
      scale: true,
    }).extend({
      layout: z.object({
        header: LayoutConfigSchema.shape.header.pick({ theme: true }),
        leftSidebar: LayoutConfigSchema.shape.leftSidebar
          .pick({ theme: true })
          .merge(SidebarStateSchema.pick({ opened: true, folded: true })),
        rightSidebar: LayoutConfigSchema.shape.leftSidebar
          .pick({ theme: true })
          .merge(SidebarStateSchema.pick({ opened: true, folded: true })),
        footer: LayoutConfigSchema.shape.footer.pick({ theme: true }),
        main: LayoutConfigSchema.shape.main.pick({ theme: true }),
      }),
    }),
  }),
);
