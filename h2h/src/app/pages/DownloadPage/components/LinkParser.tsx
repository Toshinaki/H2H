import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextField } from "@ishtar/components/form/components";
import { Box, Button, createStyles } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { parseLink } from "../utils";

const useStyles = createStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 450,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: 4,
  },
  input: {
    flex: 1,
    maxWidth: 400,
  },
}));

type LinkParserProps = {
  url: string;
  setUrl: (url: string) => void;
};

const LinkParser = ({ url, setUrl }: LinkParserProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation("pages/download");
  const navigate = useNavigate();

  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [error, setError] = useState("");

  const handleParse = () => {
    setParsing(true);
    parseLink(url)
      .then(({ id, playlist_id }) => {
        setParsed(true);
        navigate(`/${playlist_id || id}`);
      })
      .catch(setError)
      .finally(() => {
        setParsing(false);
      });
  };

  return (
    <Box className={classes.root}>
      <TextField
        clearable
        selectOnFocus
        placeholder={t("input.placeholder") || ""}
        className={classes.input}
        value={url}
        onChange={setUrl}
        onClear={() => parsed && setParsed(false)}
        disabled={parsing}
        error={error}
        autoFocus
      />
      <Button
        size="xs"
        color="primary"
        onClick={handleParse}
        disabled={!url || parsed}
        loading={parsing}
        loaderPosition="center"
      >
        {t("buttons.start")}
      </Button>
    </Box>
  );
};

export default memo(LinkParser);
