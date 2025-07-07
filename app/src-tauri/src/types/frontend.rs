use crate::types::db::{PlaylistModel, VideoFormatModel, VideoMetadataModel}; // For `From` trait implementation
use serde::{Deserialize, Serialize};

// --- Frontend Video Metadata ---
/// Frontend representation of video metadata.
/// Optimized for display in the UI.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")] // Convert snake_case to camelCase for JS
pub struct VideoMetadataFrontend {
    pub id: i64,
    pub url: String,
    pub playlist_id: Option<i64>,
    pub playlist_index: Option<i64>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub duration_sec: Option<i64>,
    pub view_count: Option<i64>,
    pub upload_date: Option<String>, // YYYYMMDD
    pub uploader: Option<String>,
    pub channel_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub parse_time: String, // Formatted as ISO 8601 string for JS
    pub error_message: Option<String>,
    // This will contain all available formats for this video
    pub formats: Vec<VideoFormatFrontend>,
}

// Implement `From` trait for conversion from DB model to Frontend DTO
impl From<VideoMetadataModel> for VideoMetadataFrontend {
    fn from(model: VideoMetadataModel) -> Self {
        VideoMetadataFrontend {
            id: model.id,
            url: model.url,
            playlist_id: model.playlist_id,
            playlist_index: model.playlist_index,
            title: model.title,
            description: model.description,
            duration_sec: model.duration_sec,
            view_count: model.view_count,
            upload_date: model.upload_date,
            uploader: model.uploader,
            channel_url: model.channel_url,
            thumbnail_url: model.thumbnail_url,
            parse_time: model.parse_time.to_rfc3339(), // Format DateTime to ISO string
            error_message: model.error_message,
            formats: Vec::new(), // Formats need to be loaded separately and added
        }
    }
}

// --- Frontend Playlist ---
/// Frontend representation of a playlist.
/// Optimized for display in the UI.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistFrontend {
    pub id: i64,
    pub url: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub uploader: Option<String>,
    pub uploader_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub entry_count: Option<i64>,
    pub last_parsed_at: String, // Formatted as ISO 8601 string for JS
    pub error_message: Option<String>,
    // Optionally: pub videos: Vec<VideoMetadataFrontend>, if you want to embed all videos
    // (but usually fetch separately for performance)
}

/// Conversion from `PlaylistModel` (DB model) to `PlaylistFrontend` (UI DTO).
impl From<PlaylistModel> for PlaylistFrontend {
    fn from(model: PlaylistModel) -> Self {
        PlaylistFrontend {
            id: model.id,
            url: model.url,
            title: model.title,
            description: model.description,
            uploader: model.uploader,
            uploader_url: model.uploader_url,
            thumbnail_url: model.thumbnail_url,
            entry_count: model.entry_count,
            last_parsed_at: model.last_parsed_at.to_rfc3339(),
            error_message: model.error_message,
        }
    }
}

// --- Frontend Video Format ---
/// Frontend representation of a video format.
/// Optimized for display in format selection or details.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VideoFormatFrontend {
    pub id: i64,
    pub metadata_id: i64,
    pub format_id: String,
    pub format_note: Option<String>,
    pub ext: Option<String>,
    pub acodec: Option<String>,
    pub vcodec: Option<String>,
    pub width: Option<i64>,
    pub height: Option<i64>,
    pub filesize_bytes: Option<i64>,
    pub tbr_kbps: Option<f64>,
    pub abr_kbps: Option<f64>,
    pub vbr_kbps: Option<f64>,
    pub preference: Option<i64>,
    pub quality_string: Option<String>,
}

/// Conversion from `VideoFormatModel` (DB model) to `VideoFormatFrontend` (UI DTO).
impl From<VideoFormatModel> for VideoFormatFrontend {
    fn from(model: VideoFormatModel) -> Self {
        VideoFormatFrontend {
            id: model.id,
            metadata_id: model.metadata_id,
            format_id: model.format_id,
            format_note: model.format_note,
            ext: model.ext,
            acodec: model.acodec,
            vcodec: model.vcodec,
            width: model.width,
            height: model.height,
            filesize_bytes: model.filesize_bytes,
            tbr_kbps: model.tbr_kbps,
            abr_kbps: model.abr_kbps,
            vbr_kbps: model.vbr_kbps,
            preference: model.preference,
            quality_string: model.quality_string,
        }
    }
}

// --- Frontend Download (for history display) ---
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DownloadFrontend {
    pub id: i64,
    pub metadata: Option<VideoMetadataFrontend>,
    pub source_url: String,
    pub chosen_format_id: Option<String>,
    pub file_path: Option<String>,
    pub status: String,
    pub current_progress: f64,
    pub current_speed: Option<f64>,
    pub eta_seconds: Option<i64>,
    pub start_time: Option<String>, // Formatted
    pub end_time: Option<String>,   // Formatted
    pub error_message: Option<String>,
    pub download_size_bytes: Option<i64>,
    pub created_at: String,
    pub updated_at: String,
}
