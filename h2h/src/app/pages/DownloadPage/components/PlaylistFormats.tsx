import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "@lodash";
import { formatSampleRate, formatFileSize } from "../utils";
import { useDownloadStore } from "../state";
import { ActionIcon, Group, ScrollArea, Stack, Text, ThemeIcon, createStyles } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { HiMusicalNote, HiVideoCamera } from "react-icons/hi2";
import Scrollbar from "@ishtar/components/Scrollbar";
import Tabview from "@ishtar/components/view/Tabview";
import VideoCard from "./shared-components/VideoCard";
import { openModal } from "@mantine/modals";
import { AggregateMediaFormatType } from "../types";
import FormatVideosSelect from "./FormatVideosSelect";

const useStyles = createStyles(() => ({
  // container: { width: "100%", height: "100%", padding: rem(8) },
  content: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" },
  wrapper: { flex: 1, overflow: "hidden", padding: "0.5rem" },
  itemsWrapper: { height: "100%" },
  itemsContent: { overflow: "hidden" },
}));

const PlaylistFormats = () => {
  const { classes } = useStyles();
  const { t } = useTranslation("pages/download");
  const { playlist, downloads, setDownloads } = useDownloadStore();

  const [selectedFormats, setSelectedFormats] = useState<Array<AggregateMediaFormatType>>([]);
  useEffect(() => {
    setDownloads(selectedFormats.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.mediaIds }), {}));
  }, [selectedFormats, setDownloads]);

  const [filterType, setFilterType] = useState<"all" | "audio" | "video">("all");

  const formats = useMemo(() => {
    const entries = playlist?.entries || [];
    return _.orderBy(
      _.uniqBy(
        entries.flatMap((entry) => entry.formats),
        "format_id"
      ).map((format) => {
        const entriesWithFormat = entries.filter((entry) =>
          entry.formats.some((f) => f.format_id === format.format_id)
        );
        return {
          // ...format,
          id: format.format_id,
          format: format.format,
          ...(format.type === "audio"
            ? { type: "audio", asr: format.asr }
            : { type: "video", format_note: format.format_note }),
          ext: format.ext || (format.type === "audio" ? format.audio_ext : format.video_ext),
          totalSize: _.sum(
            entriesWithFormat.map((entry) => {
              const currF = entry.formats.find((f) => f.format_id === format.format_id);
              return currF?.filesize || currF?.filesize_approx || 0;
            })
          ),
          mediaCount: entriesWithFormat.length,
          mediaIds: entriesWithFormat.map((entry) => entry.id),
        };
      }) as Array<AggregateMediaFormatType>,
      [
        "type",
        (format) => (format.type === "audio" ? format.asr : parseInt(format.format_note)),
        "totalSize",
      ],
      ["asc", "desc", "desc"]
    ).filter((format) => (filterType !== "all" ? format.type === filterType : true));
  }, [filterType, playlist?.entries]);

  const columns = useMemo(
    () => [
      {
        accessor: "format",
        // width: "40%",
        render: (format: (typeof formats)[number]) => (
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
          </Group>
        ),
        title: (
          <Group noWrap spacing="xs">
            <Text>Format</Text>
            <ActionIcon
              color="primary"
              onClick={() => setFilterType(filterType === "audio" ? "all" : "audio")}
              variant={filterType === "audio" ? "filled" : "subtle"}
              ml="auto"
            >
              <HiMusicalNote />
            </ActionIcon>
            <ActionIcon
              color="primary"
              onClick={() => setFilterType(filterType === "video" ? "all" : "video")}
              variant={filterType === "video" ? "filled" : "subtle"}
            >
              <HiVideoCamera />
            </ActionIcon>
          </Group>
        ),
      },
      {
        accessor: "totalSize",
        // width: "60%",
        render: (format: (typeof formats)[number]) => formatFileSize(format.totalSize),
      },
      { accessor: "mediaCount" },
    ],
    [filterType]
  );

  const table = useMemo(
    () => (
      <DataTable
        striped
        highlightOnHover
        textSelectionDisabled
        records={formats}
        columns={columns}
        selectedRecords={selectedFormats}
        onSelectedRecordsChange={setSelectedFormats}
        onRowClick={(format) => {
          openModal({
            title: (
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
            centered: true,
            children: <FormatVideosSelect format={format} />,
            scrollAreaComponent: ScrollArea.Autosize,
          });
        }}
        getRecordSelectionCheckboxProps={(format) => {
          const currFormatDownloads = _.get(downloads, format.id, []);
          return {
            checked: currFormatDownloads.length === format.mediaCount,
            indeterminate:
              currFormatDownloads.length > 0 && currFormatDownloads.length < format.mediaCount,
          };
        }}
      />
    ),
    [columns, downloads, formats, selectedFormats]
  );
  console.log(selectedFormats, downloads);
  return playlist ? (
    <Tabview
      defaultValue="formats"
      tabs={[
        {
          label: t("tabs.formats"),
          value: "formats",
          panel: table,
        },
        {
          label: t("tabs.videos"),
          value: "videos",
          panel: (
            <Scrollbar hideX className={classes.itemsWrapper}>
              <Stack spacing={0} className={classes.itemsContent}>
                {playlist.entries.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </Stack>
            </Scrollbar>
          ),
        },
      ]}
      className={classes.content}
      panelProps={{ className: classes.wrapper }}
    />
  ) : null;
};

export default memo(PlaylistFormats);
