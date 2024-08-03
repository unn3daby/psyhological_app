export const useAuthStore = defineStore('auth', () => {
  const { api } = useApi();

  const user = ref<Record<string, string> | null>(null);

  async function login(username: string, password: string) {
    try {
      await api<{ data: Record<string, string> }>('/api/v1/auth/auth', { method: 'POST', body: { username, password } });
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  function logout() {
    user.value = null;
  }

  function isAuthenticated() {
    return !!user.value;
  }

  async function getProfile() {
    try {
      const { data } = await api<{ data: Record<string, string> }>('/api/v1/protected/profile');
      user.value = data;
    }
    catch (error) {
      console.error(error);
    }
  }

  return {
    user,
    login,
    logout,
    isAuthenticated,
    getProfile,
  };
});
