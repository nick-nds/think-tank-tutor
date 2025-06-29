// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
  ],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    // Use the existing tailwind.config.js file
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/think-tank-tutor/' : '/',
    head: {
      htmlAttrs: {
        class: 'dark'
      },
      title: 'Think Tank Tutor - Practice Operations & Alphabet Patterns',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Master arithmetic operations and alphabet patterns with rapid-fire practice sessions. Adaptive learning for speed and accuracy.' }
      ]
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  compatibilityDate: '2024-12-01'
})
