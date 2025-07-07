use sqlx::migrate::Migrator;
use sqlx::sqlite::SqlitePool;
use std::path::Path;
use std::sync::Once; // For lazy initialization of the migrator

static MIGRATOR: Migrator = Migrator::new(Path::new("./migrations"));
static INIT: Once = Once::new();

/// Initializes the database pool for testing.
/// Creates an in-memory SQLite database and applies all migrations.
pub async fn setup_test_db() -> Result<SqlitePool, Box<dyn std::error::Error>> {
    // This static Once ensures migrations are loaded only once globally across all tests
    // even if `setup_test_db` is called multiple times.
    INIT.call_once(|| {
        // You might log something here if needed, but it runs only once.
        // For testing, silent is usually fine.
    });

    let pool = SqlitePool::connect("sqlite::memory:").await?; // Connect to in-memory DB
    MIGRATOR.run(&pool).await?; // Apply migrations

    Ok(pool)
}
