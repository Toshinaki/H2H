import { MantineThemeOverride } from "@mantine/core";

export const globalStyles: MantineThemeOverride = {
  globalStyles: () => ({
    // language based font
    ".app-root.zh": { fontFamily: `'Noto Sans SC', sans-serif` },
    // ".app-root.en": { fontFamily: `'Noto Sans SC', sans-serif` },

    a: { lineHeight: 1.15 },
  }),
  fontFamily: "inherit",
  headings: { fontFamily: "inherit" },
  fontFamilyMonospace: "Monaco, Courier, monospace",
  components: {
    Checkbox: { styles: { body: { alignItems: "center" }, input: { cursor: "pointer" } } },
  },
};
