import type { ResponseBack } from "~/types"

export const usePostStore = defineStore('posts-store', () => {
  const posts = ref<ResponseBack|null>(null)

  const getPosts = async () => {
    const { data } = await useFetch<ResponseBack|null>('/api/hello')
    if (data.value) posts.value = data.value
  }
  return {
    getPosts,
    posts,
  }
})
