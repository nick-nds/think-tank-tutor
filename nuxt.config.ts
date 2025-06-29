// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
  ],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    // Use the existing tailwind.config.js file
  },
  app: {
    head: {
      htmlAttrs: {
        class: 'dark'
      }
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  // Remove bridge config as it's not needed for Nuxt 3.13+
  compatibilityDate: '2024-12-01'
})
