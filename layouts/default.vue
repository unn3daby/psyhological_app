<template>
  <q-layout ref="layoutRef" view="lHh lpr lFf" container class="tw-h-screen">
    <div
      ref="headerTriggerRef"
      class="tw-fixed tw-z-50 tw-h-10 tw-w-full"
    />
    <q-scroll-observer @scroll="hideHeaderByScroll" />
    <q-header
      class="header row items-center tw-justify-center bg-secondary tw-transition-all tw-rounded-b-lg tw-ease-in-out tw-delay-150 tw-h-20"
      :class="headerClass"
    >
      <q-toolbar class="tw-max-w-screen-3xl">
        <q-avatar class="tw-bg-white cursor-pointer" @click="$router.push('/')" />
        <HeaderMenu />
        <div class="tw-flex-grow tw-relative">
          <CustomInput v-model="search" dense class="tw-transition-all" :class="searchClass" />
        </div>
        <q-space />
        <q-avatar class="tw-bg-green-500">
          {{ 'VM' }}
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md q-pt-xl">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import CustomInput from '~/components/CustomInput.vue';

const headerClass = ref<string | null>(null);
const searchClass = ref<string | null>(null);
const layoutRef = ref();
const headerTriggerRef = ref<null | HTMLDivElement>(null);

const search = ref('');

function hideHeaderByScroll({ direction, position: { top } }: any) {
  if (top <= 0) {
    searchClass.value = 'custom-translate';
  }
  else {
    searchClass.value = '';
  }
  if (direction === 'down' && top > 100) {
    headerClass.value = 'tw--translate-y-full';
  }
  else if (direction === 'up') {
    headerClass.value = null;
  }
}

onMounted(() => {
  headerTriggerRef.value?.addEventListener('mouseover', () => {
    headerClass.value = null;
  });
});
</script>

<style lang="scss">
.custom-translate {
  transform: translateY(80px);
  height: 50px;
}
.header {
  backdrop-filter: blur(2px);
  background: rgba(26, 26, 26, 0.5);
}
</style>
