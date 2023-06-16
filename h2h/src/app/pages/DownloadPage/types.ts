import { Override } from "types";

export type HistoryType = VideoInfoType | PlaylistInfoType;

export type HistoryIndexType = {
  id: string;
  link: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  playlist_count?: number;
  createdAt: number;
  updatedAt: number;
};

export type ParseOutputType = {
  id: string;
  playlist_id?: string;
};

export type BaseDownloadType = {
  is_playlist: boolean;
  id: string;
  title: string;
  webpage_url: string;
  thumbnail?: string;
};

type MediaFormatType = {
  type: "video" | "audio" | "other";
  format_id: string;
  format: string;
  ext: string;
  url: string;
  filesize?: number;
  filesize_approx?: number;
};

export type AggregateMediaFormatType = {
  id: string;
  format: string;
  ext: string;
  totalSize: number;
  mediaCount: number;
  mediaIds: Array<string>;
} & ({ type: "audio"; asr: number } | { type: "video"; format_note: string });

export type VideoFormatType = Override<
  MediaFormatType,
  {
    type: "video";
    video_ext: string;
    format_note: string;
    resolution: string;
  }
> & { [key: string]: unknown };

export type AudioFormatType = Override<
  MediaFormatType,
  {
    type: "audio";
    audio_ext: string;
    asr: number;
  }
> & { [key: string]: unknown };

export type OtherFormatType = Override<MediaFormatType, { type: "other" }> & {
  [key: string]: unknown;
};

export type VideoInfoType = Override<
  BaseDownloadType,
  {
    is_playlist: false;
    thumbnail: string;
    description: string;
    duration: number;
    upload_date: string;
    formats: Array<VideoFormatType | AudioFormatType>;
    playlist?: string;
    playlist_id?: string;
    playlist_title?: string;
    playlist_index?: number;
  }
> & { [key: string]: unknown };

export type PlaylistInfoType = Override<
  BaseDownloadType,
  {
    is_playlist: true;
    // entries: Array<SimpleVideoInfoType>;
    entries: Array<VideoInfoType>;
    playlist_count: number;
    // parsed_entries: Array<VideoInfoType>;
  }
> & { [key: string]: unknown };

export type SimpleVideoInfoType = {
  id: string;
  url: string;

  [key: string]: unknown;
};
