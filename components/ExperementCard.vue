<template>
  <div
    class="
      rounded-md
      relative
      group
      cursor-pointer
      overflow-hidden
      duration-500
      w-full
      h-80
      bg-gray-600
      text-gray-50 p-5
    "
  >
    <div>
      <div
        class="rounded-md group-hover:scale-105 w-full h-60 bg-blue-400 duration-500"
      />
      <div
        class="absolute w-full left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12"
      >
        <div
          class="
            rounded-md
            absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 group-hover:opacity-80 group-hover:bg-zinc-800
          "
        />
        <span
          class="
            transition-all
            duration-500
            group-hover:translate-y-0
            text-xl
            font-bold
            block
            -translate-y-5
          "
        >
          Hover me!
        </span>
        <p class="group-hover:opacity-100 w-full duration-500 opacity-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

</style>
