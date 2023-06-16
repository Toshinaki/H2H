import { memo, useMemo } from "react";
import _ from "@lodash";
import { useDownloadStore } from "../state";
import { Stack, Group, Checkbox } from "@mantine/core";
import VideoCard from "./shared-components/VideoCard";
import { AggregateMediaFormatType, VideoInfoType } from "../types";

type FormatVideosSelectProps = {
  format: AggregateMediaFormatType;
};

const FormatVideosSelect = ({ format }: FormatVideosSelectProps) => {
  const { playlist, downloads, setFormatDownloads } = useDownloadStore();

  const currDownloads = useMemo<Array<string>>(
    () => _.get(downloads, format.id, []),
    [downloads, format.id]
  );

  return (
    <Stack spacing={0}>
      {format.mediaIds
        .map((id) => playlist?.entries.find((entry) => entry.id === id))
        .filter((entry): entry is VideoInfoType => !!entry)
        .map((video) => (
          <Group key={video.id} noWrap spacing="xs">
            <Checkbox
              checked={currDownloads.includes(video.id)}
              onChange={() => setFormatDownloads(format.id, _.xor(currDownloads, [video.id]))}
            />
            <VideoCard video={video} format={format.id} />
          </Group>
        ))}
    </Stack>
  );
};

export default memo(FormatVideosSelect);
