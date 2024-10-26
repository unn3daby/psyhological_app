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
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: 0,
      },
    },
  },
  modules: [
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    '@nuxt/icon',
  ],
  css: ['~/assets/scss/main.scss'],
  primevue: {
    autoImport: true,
    usePrimeVue: true,
    importTheme: { from: '@/theme.ts' },
    options: {
      ripple: true,
    },
    components: {
      prefix: 'P',
    },
    directives: {
      prefix: 'p',
    },
  },
});
