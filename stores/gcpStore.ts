export const useGCPStore = defineStore('gcp-store', () => {
    const setCors = async () => {
        await $fetch('/api/gcp/cors', {
            method: 'GET',
        })
    }

    const postSigned = async (filename: string) => {
        const url = await $fetch('/api/gcp/signed', {
            method: 'POST',
            body: JSON.stringify({filename: filename})
        })
        return url as string
    }
    
    const compressFile = async (filename: string) => {
        const url = await $fetch('/api/gcp/compress?filename='+ filename, {
            method: 'POST',
        })
        return url
    }

  return {
    setCors,
    postSigned,
    compressFile,
  }
})
