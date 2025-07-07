import { useActiveDownloads } from "app/hooks/use-active-downloads";

const ActiveDownloadList = () => {
  const { data, isLoading } = useActiveDownloads();

  console.log({ data, isLoading });

  return;
};

export default ActiveDownloadList;
