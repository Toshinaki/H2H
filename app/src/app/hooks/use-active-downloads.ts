import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { DownloadFrontend } from "app/types/api";

/**
 * Async function to call the Rust backend command to fetch active downloads.
 * @returns A Promise that resolves to an array of DownloadFrontend objects.
 */
const fetchActiveDownloads = async (): Promise<Array<DownloadFrontend>> =>
	invoke("get_active_downloads");

/**
 * Custom React hook to fetch and manage the state of active downloads
 * using TanStack Query.
 *
 * @returns An object containing the query results (data, isLoading, isError, error, etc.).
 */
export const useActiveDownloads = () =>
	useQuery({
		queryKey: ["active-downloads"],
		queryFn: fetchActiveDownloads,
	});
