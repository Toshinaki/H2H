import { useContext } from "react";
import { ScrollContext } from "./ScrollProvider.context";

export const useScrollContext = () => {
  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) {
    throw new Error('"useScrollContext" has to be used within <ScrollContext.Provider>');
  }

  return scrollContext;
};
