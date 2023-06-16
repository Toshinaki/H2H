import { memo, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useHistory } from "../api/history.api";
import { Button, Group, Stack, createStyles, rem } from "@mantine/core";
import PlaylistCard from "./shared-components/PlaylistCard";
import VideoCard from "./shared-components/VideoCard";
import PlaylistFormats from "./PlaylistFormats";
import { useDownloadStore } from "../state";

type ContextType = { url: string };

const useURL = () => useOutletContext<ContextType>();

const useStyles = createStyles(() => ({
  container: { width: "100%", height: "100%", padding: rem(8) },
  content: { flex: 1, overflow: "hidden", alignItems: "stretch" },
  itemsWrapper: { height: "100%", borderRadius: rem(8) },
  itemsContent: { overflow: "hidden" },
}));

const VideoContent = () => {
  const { classes } = useStyles();

  const { url } = useURL();
  const { vid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!vid) {
      navigate("/");
    }
  }, [navigate, url, vid]);

  const { data, isError } = useHistory(vid, url);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const { setPlaylist, setVideo, reset } = useDownloadStore();
  useEffect(() => {
    if (data) {
      if (data.is_playlist) {
        setPlaylist(data);
      } else {
        setVideo(data);
      }
    }

    return reset;
  }, [data, reset, setPlaylist, setVideo]);

  return (
    <Stack className={classes.container}>
      {data &&
        (data.is_playlist ? (
          <>
            <PlaylistCard playlist={data} />
            <PlaylistFormats />
          </>
        ) : (
          <>
            <VideoCard video={data} />
          </>
        ))}
      <Button>Download</Button>
    </Stack>
  );
};

export default memo(VideoContent);
