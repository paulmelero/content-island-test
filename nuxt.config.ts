// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  runtimeConfig: {
    contentIslandSecretToken: process.env.CONTENT_ISLAND_SECRET_TOKEN,
  },

  css: ['@/assets/styles/global.css'],

  experimental: {
    payloadExtraction: true,
  },

  nitro: {
    preset: 'cloudflare-module',
  },

  vite: {
    css: {
      transformer: 'lightningcss',
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/posts/**/**': { prerender: true },
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', 'nitro-cloudflare-dev'],
  fonts: {
    processCSSVariables: true,
  },
});
