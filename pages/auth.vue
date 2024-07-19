<template>
  <div class="fit row">
    <div class="col-6 row items-center justify-center">
      <div v-if="false" class="text-h1 text-bold">
        Авторизация
      </div>
      <div class="text-h1 text-bold">
        Регистрация
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

<style scoped></style>
