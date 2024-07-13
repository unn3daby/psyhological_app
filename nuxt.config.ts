// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@formkit/auto-animate', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['~/assets/scss/main.scss'],
})
