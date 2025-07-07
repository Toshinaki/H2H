// src-tauri/tests/commands.rs

use crate::common::setup_test_db; // Import the setup helper
use app::commands; // Import your commands module
use app::types::db::{DownloadModel, DownloadStatus}; // Import necessary types
use app::types::frontend::DownloadFrontend; // Import frontend DTO
use app::AppState; // Import AppState for command execution

use chrono::{DateTime, Utc};
use sqlx::sqlite::SqlitePool;
use tauri::State;

#[tokio::test]
async fn test_get_active_downloads_empty() -> Result<(), Box<dyn std::error::Error>> {
    let pool = setup_test_db().await?;
    let app_state = AppState { db: pool }; // Create an AppState for the command

    let active_downloads = commands::get_active_downloads(State(&app_state)).await?;

    // Assert that no downloads are returned when the DB is empty
    assert!(
        active_downloads.is_empty(),
        "Should return an empty list when no active downloads exist"
    );

    Ok(())
}

#[tokio::test]
async fn test_get_active_downloads_with_data() -> Result<(), Box<dyn std::error::Error>> {
    let pool = setup_test_db().await?;
    let app_state = AppState { db: pool.clone() }; // Clone pool if needed by other operations

    // Insert some mock data directly into the database using sqlx
    // Insert an active download
    sqlx::query!(
        r#"
            INSERT INTO downloads (
                source_url, status, current_progress, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?)
        "#,
        "http://example.com/video1",
        DownloadStatus::Downloading.to_string(), // Store as string
        0.5,
        Utc::now(),
        Utc::now()
    )
    .execute(&pool)
    .await?;

    // Insert a paused download
    sqlx::query!(
        r#"
            INSERT INTO downloads (
                source_url, status, current_progress, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?)
        "#,
        "http://example.com/video2",
        DownloadStatus::Paused.to_string(),
        0.2,
        Utc::now(),
        Utc::now()
    )
    .execute(&pool)
    .await?;

    // Insert a completed download (should NOT be returned by get_active_downloads)
    sqlx::query!(
        r#"
            INSERT INTO downloads (
                source_url, status, current_progress, created_at, updated_at, end_time
            ) VALUES (?, ?, ?, ?, ?, ?)
        "#,
        "http://example.com/video3_completed",
        DownloadStatus::Completed.to_string(),
        1.0,
        Utc::now(),
        Utc::now(),
        Some(Utc::now().timestamp()) // Example end_time
    )
    .execute(&pool)
    .await?;

    let active_downloads = commands::get_active_downloads(State(&app_state)).await?;

    // Assertions
    assert_eq!(
        active_downloads.len(),
        2,
        "Should return exactly two active downloads"
    );

    // Check if the correct statuses are present
    let statuses: Vec<String> = active_downloads.iter().map(|d| d.status.clone()).collect();
    assert!(statuses.contains(&"Downloading".to_string()));
    assert!(statuses.contains(&"Paused".to_string()));
    assert!(!statuses.contains(&"Completed".to_string()));

    // Check content of one of the downloads (e.g., source_url)
    let download1 = active_downloads
        .iter()
        .find(|d| d.source_url == "http://example.com/video1")
        .expect("Video 1 not found");
    assert_eq!(download1.current_progress, 0.5);
    assert_eq!(download1.status, "Downloading");

    Ok(())
}
