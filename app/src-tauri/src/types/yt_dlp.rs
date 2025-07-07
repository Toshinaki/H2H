use std::collections::HashMap;

use serde::{Deserialize, Serialize};

// --- Helper for yt-dlp optional string fields (often come as null or empty string) ---
// This is a common pattern to treat empty strings from JSON as None.
// It's a bit more advanced but makes deserialization more robust.
pub fn deserialize_null_or_empty_string_as_none<'de, D>(
    deserializer: D,
) -> Result<Option<String>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s: Option<String> = Option::<String>::deserialize(deserializer)?;
    Ok(s.filter(|s: &String| !s.is_empty()))
}

// // --- Top-level Yt-DLP output (can be video or playlist) ---
// #[derive(Debug, Deserialize, Serialize)]
// #[serde(untagged)] // Allows for flexible parsing if it's a playlist or single video
// pub enum YtDlpOutput {
//     Playlist(YtDlpPlaylist),
//     Video(YtDlpVideo), // This should actually be the video that might contain 'entries' for channels
// }

/// Represents the top-level JSON output from a `yt-dlp` info extract command.
/// This structure captures the main video details and its formats.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct YtDlpOutput {
    // The main video information is flattened directly into this struct
    // if it's the only video in the output (e.g., for single URL extraction)
    #[serde(flatten)]
    pub video: YtDlpVideo,
    // If yt-dlp outputs a list of entries (e.g., for a playlist), they would go here.
    // For single video extraction, `entries` is typically null or empty.
    pub entries: Option<Vec<YtDlpVideo>>,
}

// --- Yt-DLP Video Details ---
/// Represents the details of a single video or a playlist entry from `yt-dlp` output.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct YtDlpVideo {
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub id: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub url: Option<String>,
    #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub title: Option<String>,
    #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub description: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub duration_string: Option<String>, // e.g., "00:05:30"
    pub duration_sec: Option<i64>, // duration in seconds
    pub view_count: Option<i64>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub upload_date: Option<String>, // YYYYMMDD
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub uploader: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub uploader_url: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub channel_url: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub webpage_url: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub thumbnail: Option<String>, // URL to thumbnail
    pub is_live: Option<bool>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub playlist_id: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub playlist_title: Option<String>,
    pub playlist_index: Option<i64>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub extractor: Option<String>, // e.g., "youtube"
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub extractor_key: Option<String>, // e.g., "Youtube"
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub chapter: Option<String>,
    pub tags: Option<Vec<String>>,
    pub categories: Option<Vec<String>>,
    pub is_downloaded: Option<bool>, // Custom field to track if this was downloaded
    pub was_parsed: Option<bool>,    // Custom field for parsing status

    // List of available formats (e.g., 1080p, 720p, audio-only)
    pub formats: Option<Vec<YtDlpFormatDetails>>,

    // Error messages from yt-dlp, if any.
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub error: Option<String>,

    // Other fields that might be present but we don't explicitly parse
    #[serde(flatten)]
    pub extra: HashMap<String, serde_json::Value>,
}

// // --- Yt-DLP Playlist Details ---
// #[derive(Debug, Deserialize, Serialize)]
// pub struct YtDlpPlaylist {
//     pub id: Option<String>,
//     pub url: Option<String>,
//     #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
//     pub title: Option<String>,
//     #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
//     pub description: Option<String>,
//     #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
//     pub uploader: Option<String>,
//     #[serde(
//         rename = "uploader_url",
//         default,
//         deserialize_with = "deserialize_null_or_empty_string_as_none"
//     )]
//     pub uploader_url: Option<String>,
//     #[serde(default, deserialize_with = "deserialize_null_or_empty_string_as_none")]
//     pub thumbnail: Option<String>,
//     // List of video entries in the playlist (usually basic info with --flat-playlist)
//     #[serde(rename = "entries", default)]
//     pub entries: Option<Vec<YtDlpVideo>>,
//     #[serde(
//         rename = "channel_url",
//         default,
//         deserialize_with = "deserialize_null_or_empty_string_as_none"
//     )]
//     pub channel_url: Option<String>,
//     #[serde(
//         rename = "original_url",
//         default,
//         deserialize_with = "deserialize_null_or_empty_string_as_none"
//     )]
//     pub original_url: Option<String>,
//     #[serde(
//         rename = "webpage_url",
//         default,
//         deserialize_with = "deserialize_null_or_empty_string_as_none"
//     )]
//     pub webpage_url: Option<String>,
//     #[serde(rename = "n_entries", default)] // Total number of entries in the playlist
//     pub entry_count: Option<i64>,
// }

// --- Yt-DLP Format Details ---
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct YtDlpFormatDetails {
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub format_id: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub format_note: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub ext: Option<String>, // File extension (e.g., "mp4", "webm")
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub protocol: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub acodec: Option<String>, // Audio codec
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub vcodec: Option<String>, // Video codec
    pub width: Option<i64>,
    pub height: Option<i64>,
    pub filesize_bytes: Option<i64>, // Total size of the file in bytes
    pub tbr: Option<f64>,            // Total bitrate in Kbit/s
    pub abr: Option<f64>,            // Audio bitrate in Kbit/s
    pub vbr: Option<f64>,            // Video bitrate in Kbit/s
    pub fps: Option<f64>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub url: Option<String>, // Direct URL to the format (often temporary/signed)
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub manifest_url: Option<String>,
    pub preference: Option<i64>, // Used for ordering formats (higher is better)
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub quality_string: Option<String>, // e.g. "1080p", "best"
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub language: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub container: Option<String>,
    #[serde(deserialize_with = "deserialize_null_or_empty_string_as_none")]
    pub dynamic_range: Option<String>,
    pub has_drm: Option<bool>,

    // Other fields that might be present
    #[serde(flatten)]
    pub extra: HashMap<String, serde_json::Value>,
}
