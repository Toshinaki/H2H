// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod types;

use sqlx::{
    migrate::{MigrateDatabase, Migrator},
    sqlite::SqlitePool,
    Pool, Sqlite,
};
use std::path::PathBuf;
use tauri::{App, AppHandle, Manager}; // Add State to imports
use tokio::runtime::Runtime;

struct AppState {
    db: sqlx::SqlitePool,
}

// This macro will find your migration files in a "migrations" directory
// By default, it looks in src-tauri/migrations
static MIGRATOR: Migrator = sqlx::migrate!();

fn main() {
    let log_plugin = tauri_plugin_log::Builder::default().build();
    // Pass the pool as Tauri managed state
    tauri::Builder::default()
        // The setup hook allows you to perform asynchronous operations
        // and provides the AppHandle for path resolution.
        .setup(|app: &mut App| {
            // Get the AppHandle from the App instance
            let app_handle: &AppHandle = app.handle();

            // Use app.path_resolver() for reliable app-specific paths
            let app_data_dir: PathBuf = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory.");

            // Ensure the directory exists. This is a blocking call but typically
            // fine at startup. For a more robust async version, you could
            // spawn a tokio task here, but `std::fs::create_dir_all` is often
            // sufficient for this particular early-startup task.
            std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory.");

            let db_path: PathBuf = app_data_dir.join("h2h.db");
            let db_url: String = format!("sqlite:{}", db_path.display());
            println!("Database path: {}", db_path.display());

            let rt: Runtime = Runtime::new().expect("Failed to create Tokio runtime");
            let pool: Pool<Sqlite> = rt.block_on(async {
                // Create database if it doesn't exist
                if !Sqlite::database_exists(&db_url).await.unwrap_or(false) {
                    println!("Creating database {}", db_url);
                    match Sqlite::create_database(&db_url).await {
                        Ok(_) => println!("Create db success"),
                        Err(error) => panic!("error: {}", error),
                    }
                } else {
                    println!("Database already exists");
                }

                let pool: Pool<Sqlite> = SqlitePool::connect(&db_url)
                    .await
                    .expect("Failed to connect to SQLite.");

                MIGRATOR
                    .run(&pool)
                    .await
                    .expect("Failed to run migrations.");

                pool
            });

            // Manage the state. This makes `AppState` accessible to your commands.
            app_handle.manage(AppState { db: pool });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_active_downloads,
            // Your Tauri commands will go here
            // Example:
            // save_download_record // uncomment once you define it
        ])
        .plugin(log_plugin)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
