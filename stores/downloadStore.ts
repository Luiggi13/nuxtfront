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

    const updateDocumentById = async (id: number): Promise<DownloadsResponse[]> => {
        return await updateById(id);
    }

    const updateDocumentByIdInactive = async (id: number): Promise<DownloadsResponse[]> => {
        return await updateByIdInactive(id);
    }

    return {
        allDownloadsResponse,
        getAllDownloads,
        insertDocumentDB,
        updateDocumentById,
        updateDocumentByIdInactive
    };
});
