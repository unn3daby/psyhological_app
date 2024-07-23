import process from 'node:process';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/scss/main.scss'],
});
