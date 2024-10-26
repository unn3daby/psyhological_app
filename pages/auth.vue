<template>
  <div class="flex w-full h-full">
    <div class="flex w-1/2  items-center justify-center">
      <div v-if="$route.query.type === 'reg'" class="text-4xl">
        Регистрация
      </div>
      <div v-else class="text-4xl">
        Авторизация
      </div>
    </div>
    <div class="flex w-1/2 justify-center items-center">
      <AuthForm />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<style scoped lang="scss">
.hide__register {
  transition: all 0.3s ease-in-out;
  transform: translateX(-100%);
}
</style>
