<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const isDarkTheme = useLocalStorage('isDarkTheme', false);

if (isDarkTheme.value) {
  document.documentElement.classList.add('dark');
}
</script>
