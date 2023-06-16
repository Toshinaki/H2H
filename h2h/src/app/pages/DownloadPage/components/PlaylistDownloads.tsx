import { memo } from "react";
import AccordionView from "@ishtar/components/view/AccordionView";
import { useDownloadStore } from "../state";
import { Group, ThemeIcon } from "@mantine/core";
import { HiMusicalNote, HiVideoCamera } from "react-icons/hi2";
import { formatSampleRate } from "../utils";
import { Text } from "@mantine/core";

const PlaylistDownloads = () => {
  const { downloads } = useDownloadStore();

  return (
    <AccordionView
      items={Object.entries(downloads).map(([format, vids]) => ({
        label: (
          <Group noWrap spacing="xs">
            {format.type === "audio" ? (
              <>
                <ThemeIcon size="sm" variant="light">
                  <HiMusicalNote />
                </ThemeIcon>
                <Text>{formatSampleRate(format.asr)}</Text>
              </>
            ) : (
              <>
                <ThemeIcon size="sm" variant="light">
                  <HiVideoCamera />
                </ThemeIcon>
                <Text>{format.format_note}</Text>
              </>
            )}
            <Text>{`(${format.ext})`}</Text>
            <Text>{`${format.mediaCount} videos`}</Text>
          </Group>
        ),
      }))}
    />
  );
};

export default memo(PlaylistDownloads);
