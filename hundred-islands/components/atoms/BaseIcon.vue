<template>
  <span
    :class="['inline-flex items-center justify-center select-none', sizeClass]"
    :aria-label="label"
    :aria-hidden="!label"
    role="img"
  >
    {{ emoji }}
  </span>
</template>

<script setup lang="ts">
type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
  emoji: string
  label?: string
  size?: IconSize
}>(), {
  size: 'md',
})

const sizeClass = computed(() => ({
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
}[props.size]))
</script>
