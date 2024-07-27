import type { NitroFetchOptions } from 'nitropack';

interface FetchResponseError {
  request: Request;
  response: Response;
  options: NitroFetchOptions<RequestInfo, 'delete' | 'get' | 'head' | 'options' | 'post' | 'patch' | 'put' | 'connect' | 'trace'>;
}

export function useApi() {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().baseUrl || 'http://localhost:3000',
    async onResponseError({ request, response, options }: FetchResponseError) {
      if (response.status === 401) {
        try {
          await $fetch('/api/auth/refresh');
          return $fetch(request.url, { ...options, onResponseError: undefined });
        }
        catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      }
    },
  });

  return {
    api,
  };
}
