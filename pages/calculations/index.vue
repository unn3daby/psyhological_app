<template>
  <div class="flex flex-nowrap h-full">
    <CalculationsTable />
    <CalculationsDialog v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import CalculationsTable from './calculationsTable.vue';
import CalculationsDialog from './calculationsDialog.vue';

const visible = ref(false);

onMounted(() => {
  console.log(123);
});
</script>

<style scoped>

</style>
