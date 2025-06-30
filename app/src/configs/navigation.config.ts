import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import type { AnyNavItem } from "@ig/core/layouts/navigation/types";

export const NAVIGATIONS: Array<AnyNavItem> = [
  {
    type: "item",
    id: "download",
    name: "Downloads",
    path: "/download",
    Icon: InfoOutlineIcon,
  },
  {
    type: "item",
    id: "history",
    name: "History",
    path: "/history",
    Icon: InfoOutlineIcon,
  },
  {
    type: "item",
    id: "about",
    name: "About",
    path: "/about",
    Icon: InfoOutlineIcon,
  },
];
