import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PlaylistInfoType, VideoInfoType } from "../types";

type DownloadState = {
  video?: VideoInfoType;
  playlist?: PlaylistInfoType;
  setVideo(video: VideoInfoType): void;
  setPlaylist(playlist: PlaylistInfoType): void;
  downloads: Record<string, Array<string>>;
  setFormatDownloads(fid: string, vids: Array<string>): void;
  setDownloads(downloads: Record<string, Array<string>>): void;
  reset(): void;
};

export const useDownloadStore = create<DownloadState>()(
  immer(
    devtools(
      (set) => ({
        video: undefined,
        playlist: undefined,
        setVideo: (video: VideoInfoType) =>
          set(
            (state) => {
              state.video = video;
              state.playlist = undefined;
            },
            false,
            { type: "download/set-video", video }
          ),
        setPlaylist: (playlist: PlaylistInfoType) =>
          set(
            (state) => {
              state.playlist = playlist;
              state.video = undefined;
            },
            false,
            { type: "download/set-playlist", playlist }
          ),
        downloads: {},
        setFormatDownloads: (fid, vids) =>
          set(
            (state) => {
              state.downloads = { ...state.downloads, [fid]: vids };
            },
            false,
            { type: "download/set-format-downloads", fid, vids }
          ),
        setDownloads: (downloads) =>
          set(
            (state) => {
              state.downloads = downloads;
            },
            false,
            { type: "download/set-downloads", downloads }
          ),
        reset: () =>
          set(
            (state) => {
              state.video = undefined;
              state.playlist = undefined;
            },
            false,
            { type: "download/reset" }
          ),
      }),
      { name: "download state", enabled: process.env.NODE_ENV !== "production" }
    )
  )
);
