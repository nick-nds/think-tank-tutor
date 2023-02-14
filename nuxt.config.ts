// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
  ],
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  bridge: {
    meta: true
  },
})
