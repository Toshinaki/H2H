-- Create playlist table
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
    parse_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    error_message TEXT,
    -- Optional: Raw JSON output from yt-dlp for debugging/future parsing
    _yt_dlp_json_raw TEXT,
    FOREIGN KEY (playlist_id) REFERENCES playlist(id)
);

-- Create video_format table
CREATE TABLE video_format (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_metadata_id INTEGER NOT NULL,
    format_id TEXT NOT NULL,
    format_note TEXT,
    ext TEXT,
    acodec TEXT,
    vcodec TEXT,
    width INTEGER,
    height INTEGER,
    -- Can be NULL as it's an estimate
    filesize_bytes INTEGER,
    tbr_kbps REAL,
    abr_kbps REAL,
    vbr_kbps REAL,
    preference INTEGER,
    -- e.g., "1080p.mp4", "audio-only.m4a"
    quality_string TEXT,
    FOREIGN KEY (video_metadata_id) REFERENCES video_metadata(id),
    UNIQUE (video_metadata_id, format_id) -- A video should only have one entry for a given format_id
);

-- Create download table
CREATE TABLE download (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Can be NULL if download started without full metadata (though ideally linked)
    metadata_id INTEGER,
    -- The original URL that was attempted to download
    source_url TEXT NOT NULL,
    -- The format ID actually used for this download
    chosen_format_id TEXT,
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
    -- Raw JSON of yt-dlp options used for this download
    _yt_dlp_options_json TEXT,
    FOREIGN KEY (metadata_id) REFERENCES video_metadata(id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_video_metadata_url ON video_metadata(url);

CREATE INDEX IF NOT EXISTS idx_video_metadata_playlist_id ON video_metadata(playlist_id);

CREATE INDEX IF NOT EXISTS idx_download_metadata_id ON download(metadata_id);

CREATE INDEX IF NOT EXISTS idx_download_source_url ON download(source_url);

CREATE INDEX IF NOT EXISTS idx_video_format_video_metadata_id ON video_format(video_metadata_id);

CREATE INDEX IF NOT EXISTS idx_video_format_format_id ON video_format(format_id);