<template>
  <header
    class="
    w-full flex no-wrap py-3 px-3 items-center sticky top-0 z-10 backdrop-blur dark:bg-black/50 bg-white/50
    "
  >
    <HeaderMenu />
    <div class="flex-grow" />

    <PButton class="mr-10" outlined size="small" @click="changeTheme">
      <Icon :name="isDarkTheme ? 'tabler:sun' : 'tabler:moon'" class="w-5 h-5" />
    </PButton>
    <p-avatar class="mr-2" size="large" shape="circle" />
  </header>
</template>

<script setup lang="ts">
const isDarkTheme = useLocalStorage('isDarkTheme', false);

function changeTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark');
  }
  else {
    document.documentElement.classList.remove('dark');
  }
}
</script>

<style scoped>

</style>
