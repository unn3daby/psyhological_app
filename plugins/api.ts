import { useStorage } from '@vueuse/core';

export default defineNuxtPlugin(() => {
  const userAuth = useStorage('accessToken', null);
  const config = useRuntimeConfig();

  const $api = $fetch.create({
    baseURL: config.baseURL as string ?? 'http://localhost:3000',
    onRequest({ options }) {
      console.log(options.baseURL);
      if (userAuth.value && options.baseURL?.startsWith('/api/protected')) {
        // Add Authorization header
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${userAuth.value}`;
      }
    },
    async onResponseError({ request, response }) {
      console.log(request);
      if (response.status === 401) {
        try {
          if (!userAuth.value) {
            await navigateTo('/auth');
          }
          const data = await $fetch('/api/auth/refresh', { headers: {
            Authorization: `Bearer ${userAuth.value}`,
          } });
          console.log(data);
        }
        catch (error) {
          console.error(error);
          await navigateTo('/auth');
        }
      }
    },
  });
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $api,
    },
  };
});
