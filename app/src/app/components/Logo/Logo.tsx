import Typography from "@mui/material/Typography";
import BoltIcon from "@mui/icons-material/Bolt";
import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <BoltIcon color="warning" className={styles.icon} />

      <div className={styles.logoText}>
        <Typography className={styles.top}>HIGHWAY</Typography>

        <Typography className={styles.bottom}>
          TO{" "}
          <Typography component="span" color="primary" className={styles.bottom}>
            HELL
          </Typography>
        </Typography>
      </div>
    </div>
  );
};
