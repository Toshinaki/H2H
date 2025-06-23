import { useContext } from "react";
import ScrollAreaContext from "./ScrollArea.context";

export const useScrollAreaContext = () => {
  const scrollAreaContext = useContext(ScrollAreaContext);

  if (!scrollAreaContext) {
    throw new Error('"useScrollAreaContext" has to be used within <ScrollAreaContext.Provider>');
  }

  return scrollAreaContext;
};
