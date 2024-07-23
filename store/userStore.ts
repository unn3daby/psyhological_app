import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
  const { signIn } = useAuth();
  const userData = ref({
    id: null,
    username: null,
    email: null,
  });

  async function auth(username: string, password: string) {
    const response = await signIn('credentials', { redirect: false, username, password });

    console.log(response);
  }

  return { userData, auth };
});
