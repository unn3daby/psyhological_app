<template>
 <q-layout ref="layoutRef" view="lHh lpr lFf" container class="tw-h-screen">
    <q-page-container>
      <q-page class="q-pa-md tw-h-px">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
