export const useAuthStore = defineStore('auth', () => {
  const { api } = useApi();

  const user = ref<Record<string, string> | null>(null);

  async function login(username: string, password: string) {
    try {
      await api<{ data: Record<string, string> }>('/api/auth/auth', { method: 'POST', body: { username, password } });
    }
    catch (error) {
      console.error(error);
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
      const { data } = await api<{ data: Record<string, string> }>('/api/protected/profile');
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
