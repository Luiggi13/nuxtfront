export default defineNuxtRouteMiddleware((to: unknown, from: unknown) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
    return navigateTo('/about')
})
