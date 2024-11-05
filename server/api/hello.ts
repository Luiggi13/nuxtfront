import { ResponseBack } from "~/types/ResponseBack"


export default defineEventHandler(async (event) => {
  const URL = `https://jsonplaceholder.org/posts/10`
  const res = await $fetch<ResponseBack>(URL)
  return res
})