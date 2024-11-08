// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/supabase'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  devServer: {
    port: 80,
    host: '0.0.0.0'
  },
  runtimeConfig: {
    project: process.env.NUXT_PROJECT,
    email: process.env.NUXT_EMAIL,
    gcs_private_key: process.env.NUXT_GCS_PRIVATE_KEY,
    download: process.env.NUXT_DOWNLOAD,
    compressed: process.env.NUXT_COMPRESSED,
    key: process.env.NUXT_KEY,
    api_route: {
      cors: process.env.NUXT_CORS,
      signed: process.env.NUXT_SIGNED,
    }
  }
})