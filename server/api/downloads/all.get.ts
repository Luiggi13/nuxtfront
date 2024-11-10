export type DownloadsResponse = {
  readonly id: number;
  readonly userid: string;
  readonly download_url: string;
  readonly active: boolean;
  readonly created_at: Date;
  readonly downloads: number;
  readonly fetched: boolean;
}
export type ResponseBlob = DownloadsResponse & { blob: string }

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const res = await $fetch<DownloadsResponse[]>(config.downloadAll, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  return res
})