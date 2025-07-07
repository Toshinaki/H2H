use crate::types::db::{DownloadModel, DownloadStatus, DownloadWithMetadata};
use crate::types::frontend::{DownloadFrontend, VideoMetadataFrontend};
use crate::AppState;
use chrono::DateTime;
use serde::{Deserialize, Serialize};
use sqlx::{Pool, QueryBuilder, Sqlite};
use tauri::State; // Assuming AppState is in main.rs or lib.rs

// --- Define the static constant for active download statuses ---
static ACTIVE_DOWNLOAD_STATUSES: &[DownloadStatus] = &[
    DownloadStatus::Pending,
    DownloadStatus::Downloading,
    DownloadStatus::Paused,
];

#[tauri::command]
pub async fn get_active_downloads(
    app_state: State<'_, AppState>,
) -> Result<Vec<DownloadFrontend>, String> {
    let pool: &Pool<Sqlite> = &app_state.db;

    // Use the static constant directly
    // Note: Iterating over `ACTIVE_DOWNLOAD_STATUSES` directly is fine,
    // as `QueryBuilder::separated().push_bind()` takes references.
    let mut query_builder: QueryBuilder<Sqlite> = QueryBuilder::new(
        r#"
            SELECT
                d.id, d.metadata_id, d.source_url, d.chosen_format_id, d.file_path, d.status AS "status!: DownloadStatus",
                d.current_progress, d.current_speed, d.eta_seconds, d.start_time, d.end_time,
                d.error_message, d.download_size_bytes, d.created_at, d.updated_at, d._yt_dlp_options_json,
                -- Select all fields from video_metadata with a 'metadata_' prefix to avoid conflicts
                vm.url AS metadata_url,
                vm.playlist_id AS metadata_playlist_id,
                vm.playlist_index AS metadata_playlist_index,
                vm.title AS metadata_title,
                vm.description AS metadata_description,
                vm.duration_sec AS metadata_duration_sec,
                vm.view_count AS metadata_view_count,
                vm.upload_date AS metadata_upload_date,
                vm.uploader AS metadata_uploader,
                vm.channel_url AS metadata_channel_url,
                vm.thumbnail_url AS metadata_thumbnail_url,
                vm.parse_time AS metadata_parse_time,
                vm.error_message AS metadata_error_message
            FROM downloads AS d
            LEFT JOIN video_metadata AS vm ON d.metadata_id = vm.id
        "#,
    );

    query_builder.push(" WHERE status IN (");
    let mut separated = query_builder.separated(", ");
    for status in ACTIVE_DOWNLOAD_STATUSES.iter() {
        // Iterate over the static constant
        separated.push_bind(status);
    }
    query_builder.push(")");

    query_builder.push(" ORDER BY created_at DESC");

    let downloads_with_metadata: Vec<DownloadWithMetadata> = query_builder
        .build_query_as::<DownloadWithMetadata>()
        .fetch_all(pool)
        .await
        .map_err(|e| format!("Failed to fetch active downloads: {}", e))?;

    let frontend_downloads: Vec<DownloadFrontend> = downloads_with_metadata
        .into_iter()
        .map(|row: DownloadWithMetadata| {
            let metadata = if row.metadata_id.is_some() {
                Some(VideoMetadataFrontend {
                    id: row.metadata_id.unwrap_or_default(), // Will be present if metadata_id is Some
                    url: row.metadata_url.unwrap_or_default(),
                    playlist_id: row.metadata_playlist_id,
                    playlist_index: row.metadata_playlist_index,
                    title: row.metadata_title,
                    description: row.metadata_description,
                    duration_sec: row.metadata_duration_sec,
                    view_count: row.metadata_view_count,
                    upload_date: row.metadata_upload_date,
                    uploader: row.metadata_uploader,
                    channel_url: row.metadata_channel_url,
                    thumbnail_url: row.metadata_thumbnail_url,
                    parse_time: row
                        .metadata_parse_time
                        .map(|dt| dt.to_rfc3339())
                        .unwrap_or_default(),
                    error_message: row.metadata_error_message,
                    formats: vec![], // Formats are not joined here. You might fetch these separately if needed.
                                     // For a simple list display, perhaps only core metadata is enough.
                })
            } else {
                None
            };

            DownloadFrontend {
                id: row.id,
                metadata: metadata, // Assign the new metadata field
                source_url: row.source_url,
                chosen_format_id: row.chosen_format_id,
                file_path: row.file_path,
                status: row.status.to_string(),
                current_progress: row.current_progress,
                current_speed: row.current_speed,
                eta_seconds: row.eta_seconds,
                start_time: row.start_time.map(|ts| {
                    DateTime::from_timestamp(ts, 0)
                        .map(|dt| dt.to_rfc3339())
                        .unwrap_or_default()
                }),
                end_time: row.end_time.map(|ts| {
                    DateTime::from_timestamp(ts, 0)
                        .map(|dt| dt.to_rfc3339())
                        .unwrap_or_default()
                }),
                error_message: row.error_message,
                download_size_bytes: row.download_size_bytes,
                created_at: row.created_at.to_rfc3339(),
                updated_at: row.updated_at.to_rfc3339(),
            }
        })
        .collect();

    Ok(frontend_downloads)
}
