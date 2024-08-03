<template>
  <div class="column">
    <div class="flex items-center justify-center " />
    <div class="q-pa-md q-mt-md tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 tw-gap-2 sm:tw-gap-4 md:tw-gap-6 lg:tw-gap-8">
      <div v-for="i in 100" :key="i" class="tw-mx-auto">
        <ExperementCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
