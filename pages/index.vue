<template>
  <div>{{ auth }}</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});

const auth = useAuth();
</script>

<style>

</style>
