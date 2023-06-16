import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useHistory, useUpdatePlaylistEntry } from "../api/history.api";
import { Group, Stack, createStyles, rem } from "@mantine/core";
import Scrollbar from "@ishtar/components/Scrollbar";
import PlaylistCard from "./shared-components/PlaylistCard";
import VideoCard from "./shared-components/VideoCard";
import FormatCard from "./FormatCard";
import { VideoFormatType, AudioFormatType, VideoInfoType } from "../types";

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

  const { data: dHistory } = useHistory(vid, url);
  const { mutate: parseEntry } = useUpdatePlaylistEntry(dHistory?.id);

  const [currVideo, setCurrVideo] = useState<VideoInfoType | null>(null);
  useEffect(() => {
    if (dHistory && !dHistory.is_playlist && !currVideo) {
      setCurrVideo(dHistory);
    }
  }, [currVideo, dHistory]);

  const unparsedEntries = useMemo(() => {
    const parsedIds = (dHistory?.is_playlist && dHistory.parsed_entries.map((pe) => pe.id)) || [];
    return (
      (dHistory?.is_playlist && dHistory.entries.filter((e) => !parsedIds.includes(e.id))) || []
    );
  }, [dHistory?.entries, dHistory?.is_playlist, dHistory?.parsed_entries]);
  const fetchingEntry = useMemo(() => {
    if (unparsedEntries.length > 0) {
      return unparsedEntries[0];
    }
  }, [unparsedEntries]);

  useEffect(() => {
    if (fetchingEntry) {
      // console.log("start parsing entries", fetchingEntry?.id);
      // console.log("parsing: ", fetchingEntry.id);
      parseEntry(fetchingEntry);
      // console.log("parsed", fetchingEntry.id);
    }
  }, [fetchingEntry, parseEntry]);

  return (
    <Stack className={classes.container}>
      {dHistory?.is_playlist ? (
        <PlaylistCard playlist={dHistory} />
      ) : (
        dHistory && <VideoCard video={dHistory} />
      )}
      <Group grow className={classes.content}>
        {/* videos - for playlist */}
        {dHistory?.is_playlist && (
          <Scrollbar offsetScrollbars hideX className={classes.itemsWrapper}>
            <Stack spacing={0} className={classes.itemsContent}>
              {dHistory.parsed_entries.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setCurrVideo(video)}
                  active={currVideo?.id === video.id}
                />
              ))}
            </Stack>
          </Scrollbar>
        )}
        {/* formats - for current video */}
        <Stack className={classes.itemsWrapper}>{!!currVideo && currVideo.formats}</Stack>
        {/* downloads - for selected formats */}
        <Stack className={classes.itemsWrapper}>downloads</Stack>
      </Group>
    </Stack>
  );
};

export default memo(VideoContent);
