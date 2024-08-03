<template>
  <q-input v-bind="props" v-on="attrs">
    <slot />
  </q-input>
</template>

<script setup lang="ts">
import type { QInputProps } from 'quasar';

const props = defineProps<QInputProps>();
const attrs = useAttrs();

console.log(attrs);
</script>

<style lang="scss">
/* Ваши стили здесь */
</style>
