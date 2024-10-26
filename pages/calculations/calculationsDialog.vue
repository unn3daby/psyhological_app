<template>
  <p-dialog v-model:visible="visible" modal header="Создание таблицы">
    <div class="flex flex-nowrap pb-5 items-center justify-start">
      <div class="mr-2">
        Размеры таблицы:
      </div>
      <p-input-text v-model="rows" class="max-w-20" />
      <Icon name="mdi-close" class="mx-1" />
      <p-input-text v-model="cols" class="max-w-20" />
    </div>
    <div class="flex flex-nowrap justify-between items-center">
      <p-button severity="secondary" class="mr-2" @click="visible = false">
        Отменить
      </p-button>
      <p-button @click="visible = false">
        Создать
      </p-button>
    </div>
  </p-dialog>
</template>

<script setup lang="ts">
const [rows, cols] = [ref(), ref()];

const visible = defineModel<boolean>({ required: true });
</script>

<style scoped lang="scss">

</style>
