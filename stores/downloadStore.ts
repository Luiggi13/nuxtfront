

export type URLGCP = {
    readonly url: string;
    fileName: string;
}

export const useFileStore = defineStore('files', () => {
    const url: string = 'https://storage.googleapis.com/luiggi_pdfs/';
    const readyToDownload = ref<URLGCP[]>([]);

    const addFile = (fileName: string): URLGCP[] => {
        readyToDownload.value.push({ url, fileName });
        return readyToDownload.value;
    };

    const getFiles = (): URLGCP[] => {
        return readyToDownload.value;
    };

    return {
        addFile,
        getFiles,
    };
});
