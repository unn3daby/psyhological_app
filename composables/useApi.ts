export function useApi() {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3000',
  });
  return {
    api,
  };
}
