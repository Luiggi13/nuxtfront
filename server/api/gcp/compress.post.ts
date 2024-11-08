export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const filename = query.filename;

    type CompressedFileResponse = {
        message: string;
        file: string;
    }

    const config = useRuntimeConfig()
    const res = await $fetch<CompressedFileResponse>(config.download, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': config.key,
        },
        params: {
          filename: filename,
        },
      });

    return res
})