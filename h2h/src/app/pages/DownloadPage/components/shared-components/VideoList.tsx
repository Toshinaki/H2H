import { memo } from "react";
import { Stack } from "@mantine/core";
import Scrollbar from "@ishtar/components/Scrollbar";
import VideoCard from "./VideoCard";
import { VideoInfoType } from "../../types";

type VideoListProps = {
  videos: Array<VideoInfoType>;
};

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <Scrollbar offsetScrollbars hideX className={classes.itemsWrapper}>
      <Stack spacing={0} className={classes.itemsContent}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Stack>
    </Scrollbar>
  );
};

export default memo(VideoList);
