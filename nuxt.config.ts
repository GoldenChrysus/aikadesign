// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-16',
  devtools: { enabled: true },
  pages: true,

  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out',
    },
    head: {
      title: 'UAdesign',
    }
  },

  build: {
    transpile: ['vueuc'],
  },

  modules: ['nuxtjs-naive-ui', '@nuxtjs/device'],
})
