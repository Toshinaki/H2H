import { useContext } from "react";
import { ScrollbarContext } from "./Scrollbar.context";

export const useScrollbarContext = () => {
  const scrollbarContext = useContext(ScrollbarContext);

  if (!scrollbarContext) {
    throw new Error('"useScrollbarContext" has to be used within <ScrollbarContext.Provider>');
  }

  return scrollbarContext;
};
