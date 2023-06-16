import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useInvalidateMutation = <TArguments, TResult>(
  querykey: Array<unknown>,
  func: (args: TArguments) => Promise<TResult>,
  onSuccess?: (data: TResult, variables: TArguments) => void,
  onError?: (error: unknown, variables: TArguments) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(querykey);
      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      process.env.NODE_ENV !== "production" && console.error(error);
      onError?.(error, variables);
    },
  });
};

export type ListItemType = {
  id: string;
};

export const useUpdateListItem = <T extends ListItemType>(
  querykey: Array<unknown>,
  func: (data: PartialExcept<T, "id">) => Promise<PartialExcept<T, "id">>,
  onSuccess?: (data: PartialExcept<T, "id">, variables: PartialExcept<T, "id">) => void,
  onError?: (error: unknown, variables: PartialExcept<T, "id">) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Array<T> | undefined>(
        querykey,
        (oldData) =>
          oldData &&
          oldData.map((item) => (item.id === data.id ? { ...item, ...data } : { ...item }))
      );
      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      process.env.NODE_ENV !== "production" && console.error(error);
      onError?.(error, variables);
    },
  });
};
export const useDeleteListItem = <T extends ListItemType, TArguments>(
  querykey: Array<unknown>,
  func: (args: TArguments) => Promise<T["id"]>,
  onSuccess?: (data: T["id"], variables: TArguments) => void,
  onError?: (data: unknown, variables: TArguments) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onSuccess: (id, variables) => {
      queryClient.setQueryData<Array<T> | undefined>(
        querykey,
        (data) => data && data.filter((item) => item.id !== id)
      );
      onSuccess?.(id, variables);
    },
    onError: (error, variables) => {
      process.env.NODE_ENV !== "production" && console.error(error);
      onError?.(error, variables);
    },
  });
};
