<template>
    <Head>
        <Title>Compressed documents</Title>
    </Head>
    <div v-if="!readyToDownload.length" class="flex flex-col gap-8 items-center justify-center w-full h-dvh">
        <div class="flex justify-center">
            <img src="assets/file.avif" class="object-cover w-[20%]"/>
        </div>
        <div class="w-[30%]">
            <h1 class="text-2xl text-center mb-10">No hay documentos</h1>
            <button @click="empezar()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Empezar</button>
        </div>
    </div>
    <div v-if="readyToDownload.length > 0" class="flex flex-col gap-8 items-center justify-center w-full h-auto mt-[5rem]">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3"></th>
                        <th scope="col" class="px-6 py-3">
                            Archivo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Downloads
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Action</span>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Eliminar</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(file, i) in readyWithBlob" :key="i"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            {{ i + 1 }}
                        </th>
                        <td class="px-6 py-4 text-center">
                            {{ file.blob.split('.pdf')[0].toLocaleUpperCase() }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ file.downloads || 0 }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a :href="file.download_url" @click="updateDownloadsById(file.id)"
                            :download="file.blob"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 pointer-events-auto">Download</a>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a @click="toInactive(file.id)"
                                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 pointer-events-auto cursor-pointer">Eliminar</a>
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
 await fetchAll()
})

const handleDownload = async (filename: string) => {
    const response = await fetch(filename);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (!url) return;
    return { href: url }
};

const updateDownloadsById = async (id:number) => {
    await downloadStore.updateDocumentById(id)
    await fetchAll()
}

const toInactive = async (id:number) => {
    await downloadStore.updateDocumentByIdInactive(id)
    await fetchAll()
}

const fetchAll = async () => {
    readyToDownload.value = await downloadStore.getAllDownloads()
    readyWithBlob.value = await Promise.all(
        readyToDownload.value.map(async (item) => {
            let valor: { href: string; } | undefined
            await handleDownload(item.download_url).then((e) => valor = e)
            return {
                ...item,
                download_url: valor?.href,
                blob: item.download_url.split('compressed/')[1],
            } as ResponseBlob
        })
    )
}

const empezar = () => navigateTo('/upload')
</script>