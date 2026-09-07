<template>
  <section :aria-labelledby="headingId" class="py-12 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="mb-8 text-center">
        <BaseTypography variant="overline" color="primary" class="mb-2">Discover the Islands</BaseTypography>
        <BaseTypography :id="headingId" variant="h2" class="mb-3">{{ title }}</BaseTypography>
        <BaseTypography variant="body" color="muted" class="max-w-xl mx-auto">{{ subtitle }}</BaseTypography>
      </div>

      <!-- Search -->
      <div class="max-w-xl mx-auto mb-10">
        <SearchForm @search="onSearch" />
      </div>

      <!-- Grid -->
      <div
        v-if="filteredItems.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        :aria-label="`${filteredItems.length} heritage sites`"
      >
        <div v-for="item in filteredItems" :key="item.title" role="listitem">
          <HeritageCard v-bind="item" @learn-more="$emit('learn-more', item)" />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <BaseIcon emoji="🔎" size="xl" aria-hidden="true" />
        <BaseTypography variant="body" color="muted" class="mt-4">
          No heritage sites found for "<strong>{{ searchQuery }}</strong>".
        </BaseTypography>
        <BaseButton variant="ghost" size="sm" class="mt-4" @click="searchQuery = ''">
          Clear search
        </BaseButton>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface HeritageItem {
  title: string
  description: string
  category: string
  image?: string
  fallbackEmoji?: string
  badge?: string
  link?: string
  fullDescription?: string
}

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  items: HeritageItem[]
}>(), {
  title: 'Island Highlights',
  subtitle: 'Explore the most iconic islands within Hundred Islands National Park.',
})

defineEmits<{ 'learn-more': [item: HeritageItem] }>()

const headingId = `heritage-grid-${Math.random().toString(36).slice(2, 7)}`
const searchQuery = ref('')

const filteredItems = computed(() =>
  props.items.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function onSearch(q: string) {
  searchQuery.value = q
}
</script>
