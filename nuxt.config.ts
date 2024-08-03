import process from 'node:process';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_PATH,
    },
  },
  ssr: false,
  modules: [
    'nuxt-quasar-ui',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/scss/main.scss'],
});
