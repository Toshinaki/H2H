import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";
import { uuidv4 } from "app/utils/common";
import { VscCheck, VscWarning } from "react-icons/vsc";
import { ParseOutputType, PlaylistInfoType, VideoFormatType, VideoInfoType } from "./types";
import { TEMP_ROOT } from "app/configs/paths";
import { AUDIO_SAMPLE_RATES } from "./constants";
import { appDataDir, resolve as resolvePath } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";

// url parsing
export const parseLink = (url: string) =>
  new Promise<ParseOutputType>((resolve, reject) => {
    const command = Command.sidecar("binaries/yt-dlp", [
      "-s",
      "-O",
      '"%(.{id,playlist_id})j"',
      "--playlist-items",
      "1",
      url,
    ]);

    command.execute().then((output) => {
      console.log(output);
      if (output.stderr) {
        reject(output.stderr);
      } else {
        resolve(JSON.parse(output.stdout.replace(/^"+|"+$/g, "")));
      }
    });
  });

export const fetchLinkInfo = (url: string) =>
  new Promise<VideoInfoType | PlaylistInfoType>((resolve, reject) => {
    appDataDir().then((appDataDirPath) => {
      resolvePath(appDataDirPath, TEMP_ROOT, `h2h--${uuidv4()}.json`).then((tempfile) => {
        console.log(tempfile);
        const command = Command.sidecar("binaries/yt-dlp", [
          "-s",
          "--dump-single-json",
          "--flat-playlist",
          url,
          ">",
          tempfile,
        ]);

        command.execute().then((output) => {
          console.log(output);
          if (output.stderr) {
            reject(output.stderr);
          } else {
            const result = JSON.parse(output.stdout.replace(/^"+|"+$/g, ""));
            const isPlaylist = "entries" in result;
            resolve({
              ...result,
              is_playlist: isPlaylist,
              ...(isPlaylist
                ? { parsed_entries: [] }
                : {
                    formats: result.formats?.map((f: VideoFormatType) => ({
                      ...f,
                      type: !!f.vcodec && f.vcodec !== "none" ? "video" : f.asr ? "audio" : "other",
                    })),
                  }),
            });
          }
        });
      });
    });
  });

// messages handlers
export const handleSuccessMsg = (msg: string, title?: string) => {
  notifications.show({
    title,
    message: msg,
    withCloseButton: true,
    color: "green",
    icon: <VscCheck />,
  });
};
export const handleFailMsg = (msg: string, title?: string) => {
  notifications.show({
    title,
    message: msg,
    withCloseButton: true,
    autoClose: 10000,
    color: "red",
    icon: <VscWarning />,
  });
};

// formatters
/**
 * Formats the given number of seconds into a duration string with a minimum length representation.
 * @param seconds - The number of seconds to be formatted.
 * @returns The formatted duration string.
 */
export const formatDuration = (seconds: number): string => {
  const duration = dayjs.utc(seconds * 1000); // Convert seconds to milliseconds
  return duration.format(duration.hour() > 0 ? "H:mm:ss" : "m:ss");
};

/**
 * Formats a date or timestamp relative to the current time.
 *
 * @param date - The date or timestamp to format. It can be a string, number, `dayjs.Dayjs`, `Date` object, `null`, or `undefined`.
 * @returns A string representing the formatted relative time.
 */
export const formatRelativeTime = (date: string | number | dayjs.Dayjs | Date | null | undefined) =>
  dayjs(date).fromNow();

/**
 * Formats a file size number into a human-readable string.
 *
 * @param fileSizeInBytes - The file size in bytes.
 * @returns A string representing the formatted file size.
 */
export const formatFileSize = (fileSizeInBytes: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = fileSizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(size < 10 && unitIndex > 0 ? 2 : 0)} ${units[unitIndex]}`;
};

/**
 * Formats an audio sample rate to a human-readable string.
 * Supports only commonly used sample rates.
 * @param sampleRate The audio sample rate in Hz.
 * @returns The formatted sample rate string.
 */
export const formatSampleRate = (sampleRate: number): string =>
  sampleRate in AUDIO_SAMPLE_RATES ? AUDIO_SAMPLE_RATES[sampleRate] : `${sampleRate} Hz`;
