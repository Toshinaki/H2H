import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Group, Paper, Text, createStyles, rem } from "@mantine/core";
import { AudioFormatType, VideoFormatType } from "../types";
import { formatFileSize, formatSampleRate } from "../utils";

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
    userSelect: "none",
  },
  thumbnail: {
    width: 140,
    height: 140,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: rem(4),
  },
  title: {
    marginBottom: rem(10),
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },
  description: {
    marginBottom: rem(16),
    whiteSpace: "pre",

    "& .control": { lineHeight: 1, fontSize: rem(12) },
  },
}));

type FormatCardProps = {
  videoFormat: VideoFormatType | AudioFormatType;
};

const FormatCard = ({ videoFormat }: FormatCardProps) => {
  const { classes } = useStyles();
  const { t } = useTranslation("common");

  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Group noWrap spacing="md">
        <Text>{videoFormat.type === "audio" ? videoFormat.audio_ext : videoFormat.video_ext}</Text>
        <Text>
          {videoFormat.type === "audio"
            ? formatSampleRate(videoFormat.asr)
            : videoFormat.format_note}
        </Text>
        <Text>{formatFileSize(videoFormat.filesize || videoFormat.filesize_approx || 0)}</Text>
      </Group>
    </Paper>
  );
};

export default memo(FormatCard);
