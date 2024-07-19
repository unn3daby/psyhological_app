// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    // eslint-disable-next-line node/prefer-global/process
    authSecret: process.env.Auth_SECRET,
  },
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@formkit/auto-animate', '@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  css: ['~/assets/scss/main.scss'],
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  auth: {
    // eslint-disable-next-line node/prefer-global/process
    baseUrl: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },
});
