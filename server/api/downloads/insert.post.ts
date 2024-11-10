export type DownloadsResponse = {
    readonly id: number;
    readonly userid: string;
    readonly download_url: string;
    readonly active: boolean;
    readonly created_at: Date;
    readonly downloads: number;
    readonly fetched: boolean;
}

export type Complete<T> = {
    [P in keyof T]-?: Complete<T[P]>
}
export type InsertDownload = {
    userid: string;
    download_url: string;
    active: boolean;
    downloads: number;
    fetched: boolean;
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    return await $fetch(config.insert, {
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
        body: body
    });
});