import {Storage, type StorageOptions } from "@google-cloud/storage";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const CREDS: StorageOptions = {
        projectId: config.project,
        credentials: {
            client_email: config.email,
            private_key: config.gcs_private_key?.split(String.raw`\n`).join("\n"),
        },
    }     
        const storage = new Storage(CREDS);
        if(!body || !body['filename']) return {message: "Filename not provided"}
        const [url] = await storage.bucket('luiggi_pdfs')
          .file(body['filename'])
          .getSignedUrl(
            {
              action: 'write',
              version: 'v4',
              expires: Date.now() + 15 * 60 * 1000,
              contentType: 'application/octet-stream',
            }
          );

        return url
})