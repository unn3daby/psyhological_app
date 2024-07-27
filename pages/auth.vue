<template>
  <div class="fit row">
    <div class="col-6 row items-center justify-center">
      <div v-if="$route.query.type === 'reg'" class="text-h1 text-bold">
        Регистрация
      </div>
      <div v-else class="text-h1 text-bold">
        Авторизация
      </div>
    </div>
    <div class="col-6 row justify-center items-center">
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
