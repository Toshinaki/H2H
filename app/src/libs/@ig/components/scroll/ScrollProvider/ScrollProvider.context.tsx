import { createContext } from "react";

type ScrollContextType = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  show: boolean;
  toggleShow: () => void;
  handleScroll: (position: { x: number; y: number }) => void;
};

export const ScrollContext = createContext<ScrollContextType | null>(null);
