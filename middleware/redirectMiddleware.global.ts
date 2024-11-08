import type { RouteLocationNormalized } from "vue-router"

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, _: RouteLocationNormalized) => {
  const user = useSupabaseUser()
  if (user.value && to.path !== '/upload') {
    return navigateTo('/upload')
  }
  // if (to.path !== "/login") {
  //   // return navigateTo("/upload")
  // }

})
