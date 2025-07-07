// src/types/api.ts

// This interface should mirror your Rust `VideoMetadataFrontend` struct
// Note the camelCase conversion due to `#[serde(rename_all = "camelCase")]`
export interface VideoMetadataFrontend {
	id: number;
	url: string;
	playlistId: number | null;
	playlistIndex: number | null;
	title: string | null;
	description: string | null;
	durationSec: number | null;
	viewCount: number | null;
	uploadDate: string | null;
	uploader: string | null;
	channelUrl: string | null;
	thumbnailUrl: string | null;
	parseTime: string; // ISO 8601 string
	errorMessage: string | null;
	formats: VideoFormatFrontend[]; // Nested formats
}

// This interface should mirror your Rust `VideoFormatFrontend` struct
export interface VideoFormatFrontend {
	id: number;
	metadataId: number;
	formatId: string;
	formatNote: string | null;
	ext: string | null;
	acodec: string | null;
	vcodec: string | null;
	width: number | null;
	height: number | null;
	filesizeBytes: number | null;
	tbrKbps: number | null;
	abrKbps: number | null;
	vbrKbps: number | null;
	preference: number | null;
	qualityString: string | null;
}

// This interface should mirror your Rust `PlaylistFrontend` struct
export interface PlaylistFrontend {
	id: number;
	url: string;
	title: string | null;
	description: string | null;
	uploader: string | null;
	uploaderUrl: string | null;
	thumbnailUrl: string | null;
	entryCount: number | null;
	lastParsedAt: string; // ISO 8601 string
	errorMessage: string | null;
}

// This interface should mirror your Rust `DownloadFrontend` struct
// The `status` will be a string because of `model.status.to_string()`
// and `#[serde(rename_all = "PascalCase")]` on the enum in Rust.
export interface DownloadFrontend {
	id: number;
	metadata: VideoMetadataFrontend | null;
	sourceUrl: string;
	chosenFormatId: string | null;
	filePath: string | null;
	status:
		| "Pending"
		| "Downloading"
		| "Paused"
		| "Completed"
		| "Failed"
		| "Cancelled"; // Specific string literal union types
	currentProgress: number; // 0.0 to 1.0
	currentSpeed: number | null; // e.g., bytes per second
	etaSeconds: number | null;
	startTime: string | null; // ISO 8601 string
	endTime: string | null; // ISO 8601 string
	errorMessage: string | null;
	downloadSizeBytes: number | null;
	createdAt: string; // ISO 8601 string
	updatedAt: string; // ISO 8601 string
}
