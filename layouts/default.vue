<template>
  <q-layout ref="layoutRef" view="lHh lpr lFf" container class="tw-h-screen">
    <div
      class="tw-fixed tw-z-50 tw-h-10 tw-w-full"
      ref="headerTriggerRef"
    ></div>
    <q-scroll-observer @scroll="hideHeaderByScroll" />
    <q-header
      class="header row items-center bg-secondary tw-transition-all tw-rounded-b-lg tw-ease-in-out tw-delay-150 tw-h-20"
      :class="headerClass"
    >
      <q-toolbar>
        <q-avatar class="tw-bg-white"></q-avatar>
        <HeaderMenu />
        <div></div>
        <q-space></q-space>
        <q-avatar class="tw-bg-green-500">MI</q-avatar>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
const headerClass = ref<string | null>(null);
const layoutRef = ref();
const headerTriggerRef = ref<null | HTMLDivElement>(null);

const hideHeaderByScroll = ({ direction, position: { top } }: any) => {
  if (direction === "down" && top > 100) {
    headerClass.value = "tw--translate-y-full";
  } else if (direction === "up") {
    headerClass.value = null;
  }
};

onMounted(() => {
  headerTriggerRef.value?.addEventListener("mouseover", () => {
    headerClass.value = null;
  });
});
</script>

<style lang="scss">
.header {
  backdrop-filter: blur(2px);
  background: rgba(26, 26, 26, 0.5);
}
</style>
