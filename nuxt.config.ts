export default defineNuxtConfig({
  compatibilityDate: '2026-05-20',

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  devtools: {
    enabled: true
  },

  typescript: {
    strict: true
  }
})

