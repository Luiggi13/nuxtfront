import {SetBucketMetadataResponse, Storage, type StorageOptions } from "@google-cloud/storage";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const CREDS: StorageOptions = {
        projectId: config.project,
        credentials: {
            client_email: config.email,
            private_key: config.gcs_private_key?.split(String.raw`\n`).join("\n"),
        },
    }
    const storage = new Storage(CREDS);
    await storage.bucket('luiggi_pdfs').setCorsConfiguration([
        {
            maxAgeSeconds: 3600,
            method: ['GET', 'PUT'],
            origin: ['*'],
            responseHeader: ['Content-Type'],
        },
    ])

    return true
})