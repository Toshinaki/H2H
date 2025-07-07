use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Type}; // For better timestamp handling
use strum_macros::Display;

// --- Download Status Enum ---
/// Represents the possible states of a download.
/// Stored as TEXT in the database and mapped to/from this enum.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Display, Type)]
#[sqlx(type_name = "TEXT")] // Tell SQLx to store this enum as TEXT in the database
#[serde(rename_all = "PascalCase")] // Ensures consistent casing (e.g., "Pending", "Downloading") when serialized to/from JSON
pub enum DownloadStatus {
    Pending,
    Downloading,
    Paused,
    Completed,
    Failed,
    Cancelled,
}

// --- Video Metadata Model ---
/// Represents a row in the `video_metadata` table.
/// Contains general information about a video or audio track.
#[derive(Debug, Clone, FromRow)]
pub struct VideoMetadataModel {
    pub id: i64,
    pub url: String,
    pub playlist_id: Option<i64>,
    pub playlist_index: Option<i64>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub duration_sec: Option<i64>,
    pub view_count: Option<i64>,
    pub upload_date: Option<String>, // YYYYMMDD string
    pub uploader: Option<String>,
    pub channel_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub parse_time: DateTime<Utc>, // Stored as TEXT in DB, but sqlx can convert to DateTime<Utc>
    pub error_message: Option<String>,
    pub _yt_dlp_json_raw: Option<String>,
}

// --- Playlist Model ---
/// Represents a row in the `playlists` table.
/// Contains information about a YouTube playlist.
#[derive(Debug, Clone, FromRow)]
pub struct PlaylistModel {
    pub id: i64,
    pub url: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub uploader: Option<String>,
    pub uploader_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub entry_count: Option<i64>, // Number of videos in the playlist
    pub last_parsed_at: DateTime<Utc>,
    pub error_message: Option<String>,
}

// --- Video Format Model ---
/// Represents a row in the `video_formats` table.
/// Stores details about available formats (quality, codec, etc.) for a video.
#[derive(Debug, Clone, FromRow)]
pub struct VideoFormatModel {
    pub id: i64,
    pub metadata_id: i64, // Foreign key to video_metadata
    pub format_id: String,
    pub format_note: Option<String>,
    pub ext: Option<String>,    // File extension (e.g., "mp4", "webm")
    pub acodec: Option<String>, // Audio codec
    pub vcodec: Option<String>, // Video codec
    pub width: Option<i64>,
    pub height: Option<i64>,
    pub filesize_bytes: Option<i64>,
    pub tbr_kbps: Option<f64>,          // Total bitrate
    pub abr_kbps: Option<f64>,          // Audio bitrate
    pub vbr_kbps: Option<f64>,          // Video bitrate
    pub preference: Option<i64>,        // Ordering preference for formats
    pub quality_string: Option<String>, // Custom quality string like "1080p", "best"
}

// --- Download Model ---
/// Represents a row in the `downloads` table.
/// Stores information about a specific download job.
#[derive(Debug, Clone, FromRow)]
pub struct DownloadModel {
    pub id: i64,
    pub metadata_id: Option<i64>, // Foreign key to video_metadata (can be NULL if metadata not yet parsed)
    pub source_url: String,       // Original URL provided by user
    pub chosen_format_id: Option<String>, // The 'format_id' chosen from VideoFormatModel
    pub file_path: Option<String>, // Local path where file is/will be saved
    pub status: DownloadStatus,
    pub current_progress: f64,      // 0.0 to 1.0 (0% to 100%)
    pub current_speed: Option<f64>, // Bytes per second
    pub eta_seconds: Option<i64>,
    pub start_time: Option<i64>, // Unix timestamp
    pub end_time: Option<i64>,   // Unix timestamp
    pub error_message: Option<String>,
    pub download_size_bytes: Option<i64>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub _yt_dlp_options_json: Option<String>,
}

/// An intermediary struct used to capture the results of a SQL `LEFT JOIN`
/// between `downloads` and `video_metadata` tables.
///
/// Fields from `video_metadata` are prefixed with `metadata_` and are `Option<T>`
/// due to the nature of a LEFT JOIN (metadata might not exist for a download).
#[derive(Debug, Clone, FromRow)]
pub struct DownloadWithMetadata {
    pub id: i64,
    pub metadata_id: Option<i64>,
    pub source_url: String,
    pub chosen_format_id: Option<String>,
    pub file_path: Option<String>,
    pub status: DownloadStatus, // Use the enum type
    pub current_progress: f64,
    pub current_speed: Option<f64>,
    pub eta_seconds: Option<i64>,
    pub start_time: Option<i64>, // Unix timestamp
    pub end_time: Option<i64>,   // Unix timestamp
    pub error_message: Option<String>,
    pub download_size_bytes: Option<i64>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub _yt_dlp_options_json: Option<String>,

    // Fields from `video_metadata` table (all Optional, because of LEFT JOIN)
    // We prefix them with `metadata_` to avoid conflicts with `downloads.id` etc.
    // Ensure these names match your `video_metadata` table columns.
    pub metadata_url: Option<String>,
    pub metadata_playlist_id: Option<i64>,
    pub metadata_playlist_index: Option<i64>,
    pub metadata_title: Option<String>,
    pub metadata_description: Option<String>,
    pub metadata_duration_sec: Option<i64>,
    pub metadata_view_count: Option<i64>,
    pub metadata_upload_date: Option<String>, // Often stored as TEXT/VARCHAR
    pub metadata_uploader: Option<String>,
    pub metadata_channel_url: Option<String>,
    pub metadata_thumbnail_url: Option<String>,
    pub metadata_parse_time: Option<DateTime<Utc>>,
    pub metadata_error_message: Option<String>,
}
