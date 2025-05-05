// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      contentIslandToken: process.env.NUXT_CONTENT_ISLAND_TOKEN,
    },
  },

  css: ['@/assets/styles/global.css'],

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  vite: {
    css: {
      transformer: 'lightningcss',
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', 'nitro-cloudflare-dev'],
  fonts: {
    processCSSVariables: true,
  },
});
