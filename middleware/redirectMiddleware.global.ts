import type { RouteLocationNormalized } from "vue-router"

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, _: RouteLocationNormalized) => {
  if (to.path == '/upload') {
    return;
  }
  else if (to.path == '/compressed') {
    return;
  }
  else {
    return navigateTo('/upload')
  }
})
