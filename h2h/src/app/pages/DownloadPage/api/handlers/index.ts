import { BaseDirectory } from "@tauri-apps/api/path";
import _ from "@lodash";
import { deleteFile, readYAML, writeYAML } from "app/utils/fileManage";
import { fetchLinkInfo } from "../../utils";
import { HISTORY_INDEX, HISTORY_PATH } from "app/configs/paths";
import { messages } from "../../constants";
import { HistoryType, HistoryIndexType, PlaylistInfoType, VideoInfoType } from "../../types";
import { PartialExcept } from "types";

export const fetchHistory = async (id: string, url?: string): Promise<HistoryType> =>
  new Promise((resolve, reject) =>
    readYAML<HistoryType>(`${HISTORY_PATH(id)}`, BaseDirectory.AppData, !!url)
      .then((history) => {
        if (history) {
          // console.log("fetched local: ", id, history);
          resolve(history);
        } else if (url) {
          return fetchLinkInfo(url)
            .then((result) => {
              // console.log("fetched remote: ", id, result);
              createHistory(result);
              resolve(result);
            })
            .catch(reject);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
  );

export const fetchAllHistories = async (): Promise<Array<HistoryIndexType>> =>
  (await readYAML(HISTORY_INDEX, BaseDirectory.AppData, true)) || [];

export const createHistory = async (history: HistoryType): Promise<void> => {
  const histories = await fetchAllHistories();
  if (histories.find((h) => h.id === history.id)) {
    throw new Error(messages.errors.history.alreadyExists);
  } else {
    await writeYAML(`${HISTORY_PATH(history.id)}`, { ...history }, BaseDirectory.AppData);
    const indexData: HistoryIndexType = {
      id: history.id,
      link: history.webpage_url,
      title: history.title,
      thumbnail: history.thumbnail,
      ...(history.is_playlist
        ? { playlist_count: history.playlist_count }
        : { duration: history.duration }),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await writeYAML(HISTORY_INDEX, [indexData, ...histories], BaseDirectory.AppData, true);
  }
};

export const updateHistory = async (
  history: PartialExcept<HistoryType, "id">
): Promise<PartialExcept<HistoryType, "id">> => {
  const oldHistory = await readYAML<HistoryType>(
    HISTORY_PATH(history.id),
    BaseDirectory.AppData,
    true
  );
  if (oldHistory) {
    const histories = await fetchAllHistories();
    const index = histories.findIndex((h) => h.id === history.id);
    const newHistory = _.mergeWith({}, oldHistory, history, (a, b) =>
      _.isArray(b) ? b : undefined
    );
    await writeYAML(HISTORY_PATH(history.id), newHistory, BaseDirectory.AppData, true);
    await writeYAML(
      HISTORY_INDEX,
      [
        ...histories.slice(0, index),
        { ...histories[index], updatedAt: Date.now() },
        ...histories.slice(index + 1),
      ],
      BaseDirectory.AppData,
      true
    );
    return newHistory;
  } else {
    throw new Error(messages.errors.history.notFound);
  }
};

export const deleteHistory = async (id: HistoryType["id"]) => {
  await deleteFile(HISTORY_PATH(id), BaseDirectory.AppData);
  return id;
};

// export const updatePlaylistEntry = async (pid: HistoryType["id"], entry: SimpleVideoInfoType) => {
//   const playlist = await readYAML<PlaylistInfoType>(HISTORY_PATH(pid), BaseDirectory.AppData);
//   if (playlist && !playlist.parsed_entries.find((pe) => pe.id === entry.id)) {
//     const history = (await fetchHistory(entry.id, entry.url)) as VideoInfoType;
//     const parsedEntries = [...playlist.parsed_entries, history];
//     await updateHistory({ id: pid, parsed_entries: parsedEntries });
//     return parsedEntries;
//   } else {
//     throw new Error(messages.errors.history.notFound);
//   }
// };

export const removePlaylistHiddenEntry = async (pid: HistoryType["id"], entry: VideoInfoType) =>
  new Promise<Array<VideoInfoType>>((resolve) => {
    readYAML<PlaylistInfoType>(HISTORY_PATH(pid), BaseDirectory.AppData, true).then((playlist) => {
      if (playlist) {
        const newEntries = _.deleteWith(playlist.entries, (e) => e.id === entry.id);
        return updateHistory({
          id: pid,
          entries: newEntries,
          playlist_count: newEntries.length,
        }).then(() => resolve(newEntries));
      } else {
        throw new Error(messages.errors.history.notFound);
      }
    });
  });
