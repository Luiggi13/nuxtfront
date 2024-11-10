import type { DownloadsResponse } from "~/server/api/downloads/all.get";
import type { Complete, InsertDownload } from "~/server/api/downloads/insert.post";

export const useDownloadStore = defineStore('downloads', () => {
    const allDownloadsResponse = ref<DownloadsResponse[]>([])

    const getAllDownloads = async (): Promise<DownloadsResponse[]> => {
        allDownloadsResponse.value = await fetchAllDownloads();
        return allDownloadsResponse.value
    }

    const insertDocumentDB = async (data: string): Promise<boolean> => {
        return await insertDownload(data);
    }

    return {
        allDownloadsResponse,
        getAllDownloads,
        insertDocumentDB
    };
});
