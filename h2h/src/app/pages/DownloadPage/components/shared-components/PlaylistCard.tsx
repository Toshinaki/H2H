import { memo } from "react";
import { BackgroundImage, Badge, Group, Paper, Text, createStyles, rem } from "@mantine/core";
import { PlaylistInfoType } from "../../types";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: rem(8),
    overflow: "hidden",
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,

    "&:hover": {
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
  },
  title: {
    marginBottom: rem(10),
    fontWeight: 700,
    lineHeight: 1.2,
  },

  body: { padding: theme.spacing.md },
}));

type PlaylistCardProps = {
  playlist: PlaylistInfoType;
};

const PlaylistCard = ({ playlist, ...props }: PlaylistCardProps) => {
  const { classes } = useStyles();

  return (
    <Paper withBorder className={classes.card}>
      <Group noWrap spacing={0}>
        <BackgroundImage src={playlist.thumbnail || ""} radius="xs" className={classes.thumbnail}>
          <Badge radius="sm" color="dark" variant="filled">
            {`${playlist.playlist_count} videos`}
          </Badge>
        </BackgroundImage>
        {/* <Image src={playlist.thumbnail} height={140} width={140} /> */}
        <div className={classes.body}>
          {/* <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {category}
          </Text> */}
          <Text className={classes.title}>{playlist.title}</Text>
          <Group noWrap spacing="xs">
            {/* <Group spacing="xs" noWrap>
              <Avatar size={20} src={author.avatar} />
              <Text size="xs">{author.name}</Text>
            </Group> */}
            {/* <Text size="xs" color="dimmed">
              •
            </Text> */}
            {/* <Text size="xs" color="dimmed">
              {`${playlist.playlist_count} videos`}
            </Text> */}
          </Group>
        </div>
      </Group>
    </Paper>
  );
};

export default memo(PlaylistCard);
