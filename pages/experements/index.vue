<template>
  <div class="column">
    <div class="flex items-center justify-center ">
      <q-input v-model="search" class="custom-input tw-w-full tw-max-w-screen-sm" color="white" bg-color="grey-2" dense label-color="black" outlined placeholder="Поиск эксперемента">
        <template #append>
          <q-icon name="search" color="black" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-md q-mt-md tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 tw-gap-2 sm:tw-gap-4 md:tw-gap-6 lg:tw-gap-8">
      <div v-for="i in 10" :key="i" class="tw-mx-auto">
        <ExperementCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const search = ref();
</script>

<style scoped lang="scss">
:deep(.custom-input input) {
  border-color: rgb(255, 0, 0) !important; /* Измените цвет обводки */
}

:deep(.custom-input .q-field__control) {
  border-color: rgb(255, 0, 0) !important; /* Для обводки вокруг инпута */
}
</style>
