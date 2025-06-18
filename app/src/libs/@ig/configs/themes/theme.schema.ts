import { z } from "zod";

export const ThemeIDSchema = z.enum(["default", "default-dark"]);
