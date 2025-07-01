-- Add migration script here
-- Create playlists table
CREATE TABLE playlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    uploader TEXT,
    uploader_url TEXT,
    thumbnail_url TEXT,
    entry_count INTEGER,
    original_url TEXT,
    webpage_url TEXT,
    last_parsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    error_message TEXT
);

-- Create video_metadata table
CREATE TABLE video_metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    -- NULL if not part of a playlist
    playlist_id INTEGER,
    -- NULL if not part of a playlist
    playlist_index INTEGER,
    title TEXT,
    description TEXT,
    duration_sec INTEGER,
    view_count INTEGER,
    upload_date TEXT,
    uploader TEXT,
    channel_url TEXT,
    thumbnail_url TEXT,
    file_size_bytes INTEGER,
    format_id TEXT,
    parse_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    error_message TEXT,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);

-- Create downloads table
CREATE TABLE download (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Can be NULL if download started without full metadata (though ideally linked)
    metadata_id INTEGER,
    -- The original URL that was attempted to download
    source_url TEXT NOT NULL,
    file_path TEXT,
    -- e.g., 'Pending', 'Downloading', 'Paused', 'Completed', 'Failed', 'Cancelled'
    status TEXT NOT NULL,
    -- 0.0 to 1.0
    current_progress REAL DEFAULT 0.0 NOT NULL,
    -- in bytes/sec
    current_speed REAL,
    eta_seconds INTEGER,
    -- Unix timestamp
    start_time INTEGER,
    -- Unix timestamp
    end_time INTEGER,
    error_message TEXT,
    download_size_bytes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (metadata_id) REFERENCES video_metadata(id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_video_metadata_url ON video_metadata(url);

CREATE INDEX IF NOT EXISTS idx_video_metadata_playlist_id ON video_metadata(playlist_id);

CREATE INDEX IF NOT EXISTS idx_downloads_metadata_id ON downloads(metadata_id);

CREATE INDEX IF NOT EXISTS idx_downloads_source_url ON downloads(source_url);