<template>
  <figure :class="['overflow-hidden', roundedClass]">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="lazy ? 'lazy' : 'eager'"
      :class="['w-full h-full object-cover', roundedClass]"
    />
    <figcaption v-if="caption" class="text-xs text-gray-400 mt-1 text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
type RoundedVariant = 'none' | 'sm' | 'md' | 'lg' | 'full'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  rounded?: RoundedVariant
  lazy?: boolean
}>(), {
  rounded: 'md',
  lazy: true,
})

const roundedClass = computed(() => ({
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
}[props.rounded]))
</script>
