// src-tauri/src/commands.rs (recommended to put commands in a separate file)
// You would then import this into main.rs and pass to generate_handler!

use tauri::State;
use sqlx::sqlite::SqlitePool;

use crate::AppState; // Assuming AppState is defined in main.rs or a lib.rs

#[tauri::command]
pub async fn save_download_record(
    url: String,
    title: String,
    file_path: String,
    app_state: State<'_, AppState>, // Access the AppState here
) -> Result<String, String> {
    let pool = &app_state.db; // Get a reference to the pool

    match sqlx::query!(
        "INSERT INTO downloads (url, title, file_path, status) VALUES (?, ?, ?, ?)",
        url,
        title,
        file_path,
        "completed" // Example status
    )
    .execute(pool)
    .await
    {
        Ok(_) => Ok("Download record saved successfully!".into()),
        Err(e) => Err(format!("Failed to save download record: {}", e)),
    }
}