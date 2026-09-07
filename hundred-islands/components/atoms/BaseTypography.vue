<template>
  <component
    :is="tag"
    :class="[typeClasses, colorClasses, { 'font-bold': bold, 'italic': italic }]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'
type ColorVariant = 'default' | 'muted' | 'primary' | 'white'

const props = withDefaults(defineProps<{
  variant?: TypographyVariant
  color?: ColorVariant
  bold?: boolean
  italic?: boolean
  tag?: string
}>(), {
  variant: 'body',
  color: 'default',
  bold: false,
  italic: false,
})

const tag = computed(() => {
  if (props.tag) return props.tag
  const tagMap: Record<TypographyVariant, string> = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4',
    body: 'p', caption: 'span', overline: 'span',
  }
  return tagMap[props.variant]
})

const typeClasses = computed(() => ({
  h1: 'text-4xl md:text-6xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold leading-snug',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold',
  body: 'text-base leading-relaxed',
  caption: 'text-sm leading-relaxed',
  overline: 'text-xs uppercase tracking-widest font-medium',
}[props.variant]))

const colorClasses = computed(() => ({
  default: 'text-gray-800',
  muted: 'text-gray-500',
  primary: 'text-teal-600',
  white: 'text-white',
}[props.color]))
</script>
