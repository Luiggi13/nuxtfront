<template>
    <div v-if="readyToDownload.length > 0" class="flex flex-col gap-8 items-center justify-center w-full h-dvh">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            User
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ACTIVE
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Downloads
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(file, i) in readyWithBlob" :key="i"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            {{ file.id }}
                        </th>
                        <td class="px-6 py-4 text-center">
                            {{ file.userid }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ file.active ? '✅' : '❌' }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ file.downloads || 0 }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a :href="file.download_url"
                            :download="file.blob"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 pointer-events-auto">Download</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { DownloadsResponse, ResponseBlob } from '~/server/api/downloads/all.get';

const readyToDownload = ref<DownloadsResponse[]>([])
const readyWithBlob = ref<ResponseBlob[]>([])
const downloadStore = useDownloadStore()
onBeforeMount(async () => {
    readyToDownload.value = await downloadStore.getAllDownloads()
    readyWithBlob.value = await Promise.all(
        readyToDownload.value.map(async (item) => {
            let valor: { href: string; } | undefined
            await handleDownload(item.download_url).then((e) => valor = e)
            return {
                ...item,
                download_url: valor?.href,
                blob: item.download_url.split('compressed/')[1]
            } as ResponseBlob
        })
    )
})

const handleDownload = async (filename: string) => {
    const response = await fetch(filename);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (!url) return;
    return { href: url }
};
</script>