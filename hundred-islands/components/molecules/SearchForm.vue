<template>
  <form
    role="search"
    :aria-label="ariaLabel"
    class="flex flex-col sm:flex-row gap-3 w-full"
    @submit.prevent="onSubmit"
  >
    <label :for="inputId" class="sr-only">{{ placeholder }}</label>
    <input
      :id="inputId"
      v-model="query"
      type="search"
      :placeholder="placeholder"
      class="flex-1 px-5 py-3 rounded-full border border-gray-300 text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
    />
    <BaseButton type="submit" variant="primary" size="md" :aria-label="`Search for ${query || 'heritage sites'}`">
      <BaseIcon emoji="🔍" size="sm" aria-hidden="true" />
      <span class="ml-2">Search</span>
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  ariaLabel?: string
}>(), {
  placeholder: 'Search heritage sites...',
  ariaLabel: 'Search heritage sites',
})

const emit = defineEmits<{ search: [query: string] }>()

const query = ref('')
const inputId = `search-${Math.random().toString(36).slice(2, 7)}`

function onSubmit() {
  emit('search', query.value.trim())
}
</script>
