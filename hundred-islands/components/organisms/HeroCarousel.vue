<template>
  <section class="relative h-screen overflow-hidden" aria-label="Hundred Islands photo carousel">

    <!-- Slides -->
    <div class="relative w-full h-full">
      <transition-group name="fade" tag="div" class="w-full h-full">
        <div
          v-for="(slide, index) in slides"
          v-show="currentIndex === index"
          :key="slide.image"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" aria-hidden="true" />

          <!-- Slide caption -->
          <div class="absolute bottom-32 left-0 right-0 text-center px-6">
            <span class="inline-block bg-teal-500/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              {{ slide.category }}
            </span>
            <h2 class="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">{{ slide.title }}</h2>
            <p class="text-gray-200 text-sm md:text-base mt-2 max-w-xl mx-auto drop-shadow">{{ slide.caption }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Hero text overlay (always visible) -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
      <p class="text-teal-300 text-xs uppercase tracking-widest mb-3 font-medium">Pangasinan Heritage Digital Showcase</p>
      <h1 class="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl mb-4">
        Alaminos' Hundred Islands
      </h1>
      <p class="text-gray-200 text-base md:text-lg max-w-xl mx-auto mb-8 drop-shadow">
        124 islands and islets nestled in the Lingayen Gulf — a national park, a natural wonder.
      </p>
      <a
        href="#about"
        class="pointer-events-auto inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3 rounded-full transition-colors"
      >
        Explore Now
      </a>
    </div>

    <!-- Dot indicators -->
    <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20" role="tablist" aria-label="Carousel slides">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :aria-label="`Go to slide ${index + 1}: ${slide.title}`"
        :aria-selected="currentIndex === index"
        role="tab"
        :class="[
          'w-2.5 h-2.5 rounded-full transition-all duration-300',
          currentIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
        ]"
        @click="goTo(index)"
      />
    </div>

    <!-- Prev / Next arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      aria-label="Previous slide"
      @click="prev"
    >
      ‹
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      aria-label="Next slide"
      @click="next"
    >
      ›
    </button>

  </section>
</template>

<script setup lang="ts">
const { img } = useImage()

const slides = [
  {
    image: img('/images/Governor island.jpeg'),
    title: 'Governor Island',
    category: 'Featured Island',
    caption: 'The largest and most developed island — your perfect base camp.',
  },
  {
    image: img('/images/children island.jpeg'),
    title: "Children's Island",
    category: 'Family Island',
    caption: 'Calm, shallow waters ideal for families and young adventurers.',
  },
  {
    image: img('/images/quezon island.jpg'),
    title: 'Quezon Island',
    category: 'Adventure Island',
    caption: 'Named after President Quezon — great for camping and snorkeling.',
  },
  {
    image: img('/images/bat-cave-island.jpg'),
    title: 'Bat Cave Island',
    category: 'Nature Island',
    caption: 'Dramatic limestone cliffs home to thousands of fruit bats.',
  },
  {
    image: img('/images/virgin island.jpeg'),
    title: 'Virgin Island',
    category: 'Scenic Island',
    caption: 'Pristine white sand and untouched turquoise waters.',
  },
  {
    image: img('/images/marcos island.jpeg'),
    title: 'Marcos Island',
    category: 'Diving Island',
    caption: 'Vibrant coral reefs and rich marine life beneath the surface.',
  },
]

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
  resetTimer()
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
  resetTimer()
}

function goTo(index: number) {
  currentIndex.value = index
  resetTimer()
}

function resetTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(next, 5000)
}

onMounted(() => {
  timer = setInterval(next, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
  position: absolute;
  inset: 0;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
