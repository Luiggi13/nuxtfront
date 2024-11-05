import type { ResponseBack } from "~/types"

export const usePostStore = defineStore('posts-store', () => {
  const posts = ref<ResponseBack>()

  return {
    posts,
  }
})
