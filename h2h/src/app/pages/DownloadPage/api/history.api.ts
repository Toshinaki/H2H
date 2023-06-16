import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useDeleteListItem, useInvalidateMutation, useUpdateListItem } from "app/utils/api";
import {
  createHistory,
  deleteHistory,
  fetchAllHistories,
  fetchHistory,
  updateHistory,
} from "./handlers";
import { FETCH_ALL_QUERY_ID, FETCH_QUERY_ID, messages } from "../constants";
import { handleFailMsg, handleSuccessMsg } from "../utils";

/**
 * read download history: history/{VID}.yml
 */
export const useHistory = (vid?: string, url?: string) =>
  useQuery({
    queryKey: [FETCH_QUERY_ID, vid],
    queryFn: () => (vid ? fetchHistory(vid, url) : null),
    enabled: !!vid,
  });

/**
 * read download histories: history/index.yml
 */
export const useHistories = () => useQuery([], () => fetchAllHistories());

export const useCreateHistory = () => {
  const { t } = useTranslation("pages/download");

  return useInvalidateMutation(
    [FETCH_ALL_QUERY_ID],
    createHistory,
    (_data, history) =>
      handleSuccessMsg(`${t(messages.action.history.create.success)}${history.webpage_url}`),
    (error) => handleFailMsg(`${t(messages.action.history.create.fail)}${error}`)
  );
};
export const useUpdateHistory = () => {
  const { t } = useTranslation("messages");

  return useUpdateListItem(
    [FETCH_ALL_QUERY_ID],
    updateHistory,
    (history) => handleSuccessMsg(`${t(messages.action.history.update.success)}${history.id}`),
    (error) => handleFailMsg(`${t(messages.action.history.update.fail)}${error}`)
  );
};
export const useDeleteHistory = () => {
  const { t } = useTranslation("messages");

  return useDeleteListItem(
    [FETCH_ALL_QUERY_ID],
    deleteHistory,
    (id) => handleSuccessMsg(`${t(messages.action.history.delete.success)}${id}`),
    (error) => handleFailMsg(`${t(messages.action.history.delete.fail)}${error}`)
  );
};

// export const useUpdatePlaylistEntry = (pid?: PlaylistInfoType["id"]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (entry: SimpleVideoInfoType) =>
//       pid ? await updatePlaylistEntry(pid, entry) : ([] as VideoInfoType[]),
//     onSuccess: (data) => {
//       queryClient.setQueryData<PlaylistInfoType | undefined>(
//         [FETCH_QUERY_ID, pid],
//         (playlist) => playlist && { ...playlist, parsed_entries: data }
//       );
//     },
//     onError: (error, entry) => {
//       process.env.NODE_ENV !== "production" && console.error(error);
//       if (pid) {
//         removePlaylistHiddenEntry(pid, entry).then((entries) =>
//           queryClient.setQueryData<PlaylistInfoType | undefined>(
//             [FETCH_QUERY_ID, pid],
//             (playlist) => playlist && { ...playlist, entries, playlist_count: entries.length }
//           )
//         );
//       }
//     },
//     retry: 3,
//   });
// };
