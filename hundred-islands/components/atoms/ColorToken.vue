<template>
  <div class="flex flex-col items-center gap-2">
    <div
      :class="['w-16 h-16 rounded-xl shadow-sm border border-gray-200', bgClass]"
      :aria-label="`Color swatch: ${name}`"
      role="img"
    />
    <div class="text-center">
      <p class="text-xs font-semibold text-gray-700">{{ name }}</p>
      <p class="text-xs text-gray-400">{{ hex }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  hex: string
  bgClass: string
}>()
</script>
