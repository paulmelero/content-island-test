// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    contentIslandSecretToken: process.env.CONTENT_ISLAND_SECRET_TOKEN,
  },
  css: ['@/assets/styles/global.css'],
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxtjs/mdc'],
  fonts: {
    processCSSVariables: true,
  },
  mdc: {
    highlight: {
      shikiEngine: 'oniguruma',
      highlighter: 'shiki',
      themes: ['github-light', 'github-dark'],
    },
    headings: {
      anchorLinks: false,
    },
  },

  experimental: {
    payloadExtraction: true,
  },
});
