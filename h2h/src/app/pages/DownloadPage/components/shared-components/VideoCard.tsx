import { memo } from "react";
import { useTranslation } from "react-i18next";
import { formatDuration, formatFileSize, formatRelativeTime } from "../../utils";
import {
  BackgroundImage,
  Badge,
  Group,
  Paper,
  Spoiler,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { VideoInfoType } from "../../types";

const useStyles = createStyles((theme) => ({
  card: {
    flex: 1,
    borderRadius: rem(8),
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,

    "&:hover, &.selected": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.primary[9] : theme.colors.primary[0],
    },

    transition: `background-color 250ms ease`,
  },
  thumbnail: {
    width: 140,
    height: 140,
    flexShrink: 0,
    borderRadius: rem(8),
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: rem(4),

    "&.format": { width: 70, height: 70 },
  },
  title: {
    marginBottom: rem(10),
    fontWeight: 700,
    lineHeight: 1.2,
  },
  description: {
    marginBottom: rem(16),
    whiteSpace: "pre-line",

    "& .control": { lineHeight: 1, fontSize: rem(12) },
  },

  body: { padding: theme.spacing.md, "&.format": { padding: theme.spacing.xs } },
}));

type VideoCardProps = {
  video: VideoInfoType;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  active?: boolean;
  format?: string;
};

const VideoCard = ({ video, onClick, active, format }: VideoCardProps) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation("common");

  return (
    <Paper onClick={onClick} withBorder className={cx(classes.card, active && "selected")}>
      <Group noWrap spacing={0}>
        <BackgroundImage
          src={video.thumbnail}
          radius="xs"
          className={cx(classes.thumbnail, format && "format")}
        >
          <Badge radius="sm" color="dark" variant="filled">
            {formatDuration(video.duration)}
          </Badge>
        </BackgroundImage>
        <div className={cx(classes.body, format && "format")}>
          <Text className={classes.title}>{video.title}</Text>
          {!format && (
            <Spoiler
              maxHeight={20}
              showLabel={t("action.showMore")}
              hideLabel={t("action.hide")}
              classNames={{ root: classes.description, control: "control" }}
            >
              <Text color="dimmed" size="xs">
                {video.description}
              </Text>
            </Spoiler>
          )}
          <Group noWrap spacing="xs">
            <Text size="xs" color="dimmed">
              {!format
                ? `${video.formats.length} formats`
                : `${formatFileSize(
                    video.formats.find((f) => f.format_id === format)?.filesize || 0
                  )}`}
            </Text>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {formatRelativeTime(video.upload_date)}
            </Text>
          </Group>
        </div>
      </Group>
    </Paper>
  );
};

export default memo(VideoCard);
