<template>
  <article
    class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-teal-500"
    :aria-label="`Heritage site: ${title}`"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden" style="background-color: #ccfbf1;">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center" style="font-size: 4rem;" aria-hidden="true">
        {{ fallbackEmoji }}
      </div>
      <span
        v-if="badge"
        class="absolute top-3 left-3 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <BaseTypography variant="overline" color="primary" class="mb-1">{{ category }}</BaseTypography>
      <BaseTypography variant="h4" class="mb-2">{{ title }}</BaseTypography>
      <BaseTypography variant="caption" color="muted" class="mb-4 line-clamp-2">{{ description }}</BaseTypography>
      <BaseButton variant="secondary" size="sm" :aria-label="`Learn more about ${title}`" @click="$emit('learn-more')">
        Learn More
      </BaseButton>
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  category: string
  image?: string
  fallbackEmoji?: string
  badge?: string
  link?: string
}>(), {
  fallbackEmoji: '🏝️',
  link: '#',
})

defineEmits<{ 'learn-more': [] }>()
</script>
