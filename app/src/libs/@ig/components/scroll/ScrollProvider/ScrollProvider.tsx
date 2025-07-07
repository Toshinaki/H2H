import { useRef } from "react";
import { ScrollContext } from "./ScrollProvider.context";
import { useToggle } from "@ig/hooks";
import _ from "@lodash";
import { ScrollToTop } from "../ScrollToTop";

const ScrollProvider = ({ children }: React.PropsWithChildren) => {
  const [showButton, toggle] = useToggle(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = _.throttle((position: { x: number; y: number }) => {
    const shouldShow = position.y > 100;
    if (shouldShow !== showButton) {
      toggle();
    }
  }, 200);

  return (
    <ScrollContext.Provider value={{ scrollRef, showButton, toggleShow: toggle, handleScroll }}>
      {children}

      <ScrollToTop show={showButton && !!scrollRef.current} onClick={scrollToTop} />
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
