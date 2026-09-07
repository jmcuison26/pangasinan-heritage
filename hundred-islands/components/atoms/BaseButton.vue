<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const variantClasses = computed(() => ({
  primary: 'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500',
  secondary: 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 focus:ring-teal-500',
  ghost: 'bg-transparent text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
}[props.variant]))

const sizeClasses = computed(() => ({
  sm: 'text-sm px-4 py-1.5',
  md: 'text-base px-6 py-2.5',
  lg: 'text-lg px-8 py-3',
}[props.size]))
</script>
