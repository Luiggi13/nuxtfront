import type { DownloadsResponse } from "~/server/api/downloads/all.get"
import type { Complete, InsertDownload } from "~/server/api/downloads/insert.post"


export const fetchAllDownloads = async (): Promise<DownloadsResponse[]> => {
    return await $fetch<DownloadsResponse[]>(window.location.origin + '/api/downloads/all', {
        method: 'GET',
    })
}

export const insertDownload = async (data: Complete<InsertDownload>[]): Promise<boolean> => {
    return await $fetch<boolean>(window.location.origin + '/api/downloads/insert', {
        method: 'POST',
        headers: {
            accept: 'application/json',
          },
        body: data
    })
}