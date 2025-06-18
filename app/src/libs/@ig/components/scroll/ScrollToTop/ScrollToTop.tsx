import { useTranslation } from "react-i18next";
import { motion, type Variants } from "motion/react";
import Fab, { type FabProps } from "@mui/material/Fab";
import Slide from "@mui/material/Slide";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import styles from "./ScrollToTop.module.css";

interface ScrollToTopProps extends FabProps {
  show: boolean;
}

const hoverAnimation: Variants = {
  initial: { y: "-50%" },
  hover: {
    y: ["-50%", "-40%", "-50%"],
    transition: {
      duration: 0.3,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const ScrollToTop = ({ show, ...props }: ScrollToTopProps) => {
  const { t } = useTranslation("translation");

  return (
    <Slide direction="up" in={show} unmountOnExit>
      <motion.div initial="initial" animate="initial" whileHover="hover" className={styles.wrapper}>
        <Fab variant="extended" size="small" {...props} className={styles.button}>
          <motion.div variants={hoverAnimation} className={styles.iconWrapper}>
            <RocketLaunchIcon className={styles.icon} />
          </motion.div>

          {t("action.scrollTop")}
        </Fab>
      </motion.div>
    </Slide>
  );
};

export default ScrollToTop;
