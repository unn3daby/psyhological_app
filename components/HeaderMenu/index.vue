<template>
  <div class="flex justify-center q-mx-xl items-center nowrap gap-5">
    <p-button
      v-for="item in menu"
      :key="item.id"
      size="small"
      :severity="$route.name === item.to || $route.name === item.name ? 'primary' : 'secondary'"
      @click="$router.push(item.to)"
    >
      {{ item.title }}
    </p-button>
  </div>
</template>

<script setup lang="ts">
import menu from './headerMenuData';
</script>

<style scoped lang="scss">

</style>
