import type { DownloadsResponse } from "~/server/api/downloads/all.get"

export const fetchAllDownloads = async (): Promise<DownloadsResponse[]> => {
    return await $fetch<DownloadsResponse[]>(window.location.origin + '/api/downloads/all', {
        method: 'GET',
    })
}

export const insertDownload = async (data: string): Promise<boolean> => {
    return await $fetch<boolean>(window.location.origin + '/api/downloads/insert', {
        method: 'POST',
        headers: {
            accept: 'application/json',
          },
        body: data
    })
}