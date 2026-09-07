<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

      <!-- Logo / Brand -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
        aria-label="Hundred Islands — Home"
      >
        <BaseIcon emoji="🏝️" size="md" aria-hidden="true" />
        <span class="hidden sm:inline text-teal-700">Hundred Islands</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <NavigationItem
            v-for="item in navItems"
            :key="item.to"
            v-bind="item"
          />
        </ul>
      </nav>

      <!-- CTA -->
      <BaseButton variant="primary" size="sm" href="#visit" class="hidden sm:inline-flex">
        Plan Your Visit
      </BaseButton>

      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true">{{ menuOpen ? '✕' : '☰' }}</span>
      </button>

    </div>

    <!-- Mobile Menu -->
    <nav
      v-show="menuOpen"
      id="mobile-menu"
      aria-label="Mobile navigation"
      class="md:hidden border-t border-gray-100 bg-white px-4 pb-4"
    >
      <ul class="flex flex-col gap-1 pt-2">
        <NavigationItem
          v-for="item in navItems"
          :key="item.to"
          v-bind="item"
          @click="menuOpen = false"
        />
      </ul>
      <div class="mt-3">
        <BaseButton variant="primary" size="sm" href="#visit" class="w-full justify-center">
          Plan Your Visit
        </BaseButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/', icon: '🏠' },
  { label: 'About', to: '/#about', icon: 'ℹ️' },
  { label: 'Islands', to: '/islands', icon: '🗺️' },
  { label: 'Visit', to: '/#visit', icon: '📅' },
]
</script>
