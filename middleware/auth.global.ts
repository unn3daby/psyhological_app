export default defineNuxtRouteMiddleware(async (to) => {
  try {
    const publicPages = ['/auth', '/'];
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated()) {
      await authStore.getProfile();
    }

    // Если пользователь неавторизован и пытается получить доступ к защищённой странице
    if (!authStore.isAuthenticated() && !publicPages.includes(to.path)) {
      return navigateTo({ name: 'auth' });
    }

    // Если пользователь авторизован и пытается получить доступ к странице авторизации
    if (authStore.isAuthenticated() && to.name === 'auth') {
      return navigateTo('/');
    }
  }
  catch (error) {
    console.error(error);
  }
});
