<template>
  <div class="row q-mx-xl items-center nowrap tw-gap-5">
    <div
      v-for="item in menu"
      :key="item.id"
      class="tw-relative tw-group cursor-pointer"
    >
      {{ item.title }}
      <div
        class="tw-absolute tw--bottom-1 tw-left-0 tw-w-full tw-h-px tw-bg-white tw-scale-x-0 group-hover:tw-scale-x-100 tw-origin-left tw-transition-transform tw-duration-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import menu from './menu';
</script>

<style scoped lang="scss">
.menu__item {
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -2px;
      left: 0;
    }
  }
}
</style>
