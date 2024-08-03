<template>
  <div class="row q-mx-xl items-center nowrap tw-gap-5">
    <div
      v-for="item in menu"
      :key="item.id"
      class="btns-filter hover:tw-bg-blue-400 tw-px-4 cursor-pointer tw-py-2.5 tw-rounded-md tw-transition-colors"
      :class="{ 'tw-bg-blue-400': $route.name === item.to || $route.path === item.to }"
      @click="$router.push(item.to)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import menu from './headerMenuData';
</script>

<style scoped lang="scss">
.btns-filter{
  backdrop-filter: blur(1px);
}
</style>
