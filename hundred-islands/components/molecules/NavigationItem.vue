<template>
  <li>
    <NuxtLink
      :to="to"
      :aria-current="isActive ? 'page' : undefined"
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-teal-500',
        isActive
          ? 'bg-teal-50 text-teal-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      ]"
    >
      <BaseIcon v-if="icon" :emoji="icon" size="sm" aria-hidden="true" />
      <span>{{ label }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  to: string
  icon?: string
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
