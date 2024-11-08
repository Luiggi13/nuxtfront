import type { RouteLocationNormalized } from "vue-router"

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, _: RouteLocationNormalized) => {
  if (to.path !== "/upload") {
    return navigateTo("/upload")
  }
})
