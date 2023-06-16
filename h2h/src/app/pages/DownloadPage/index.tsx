import { memo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, createStyles, rem } from "@mantine/core";
import LinkParser from "./components/LinkParser";

const useStyles = createStyles(() => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  content: {
    width: "100%",
    height: "100%",
    padding: rem(16),
  },
}));

const variants = {
  initial: { opacity: 0, flex: 0 },
  animate: {
    opacity: 1,
    flex: 1,
    transition: {
      opacity: { delay: 0.3, duration: 0.6 },
      flex: { duration: 0.5 },
    },
  },
};

const DownloadPage = () => {
  const { classes } = useStyles();

  const { vid } = useParams();
  const [url, setUrl] = useState<string>("");

  return (
    <Container size="108rem" className={classes.root}>
      <LinkParser url={url} setUrl={setUrl} />

      <motion.div
        // component={motion.div}
        variants={variants}
        initial="initial"
        animate={vid ? "animate" : "initial"}
        className={classes.contentWrapper}
      >
        <Outlet context={{ url }} />
      </motion.div>
    </Container>
  );
};

export default memo(DownloadPage);
