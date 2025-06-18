import { useEffect, useState } from "react";
import { useTimeout } from "@ig/hooks";
import _ from "@lodash";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Portal from "@mui/material/Portal";
import Container from "@mui/material/Container";
import styles from "./Splash.module.css";

const defaultAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  hidden: { opacity: 0, transition: { delay: 0.75, duration: 0.75 } },
};

interface SplashProps {
  show: boolean;
  timeout?: number;
  animation?: Variants;
  bottom?: React.ReactNode;
}

const Splash = ({
  show,
  animation,
  timeout = 2000,
  children,
  bottom,
}: React.PropsWithChildren<SplashProps>) => {
  const [animationEnded, setAnimationEnded] = useState(false);
  const { start, clear } = useTimeout(() => setAnimationEnded(true), timeout);
  useEffect(() => {
    if (!animationEnded) {
      start();
    }

    return clear;
  }, [animationEnded, clear, start]);

  useEffect(() => {
    if (animationEnded && show) {
      setAnimationEnded(false);
    }
  }, [animationEnded, show]);

  return (
    <Portal>
      <AnimatePresence>
        {(show || !animationEnded) && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="hidden"
            variants={_.merge({}, defaultAnimation, animation)}
            className={styles.root}
          >
            <div />

            <div className={styles.mainWrapper}>
              <AnimatePresence>{children}</AnimatePresence>
            </div>

            <Container className={styles.bottomWrapper}>
              {bottom}

              {/* TODO add debug message */}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Splash;
