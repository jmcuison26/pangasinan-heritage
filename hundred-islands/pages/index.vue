<template>
  <main class="bg-[#030712] text-white min-h-screen overflow-x-hidden">

    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- About Section -->
    <section id="about" class="relative py-28 px-6 overflow-hidden">
      <!-- Background glow blobs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <!-- Text -->
        <div>
          <span class="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-400/10 px-4 py-2 rounded-full mb-6">
            🏝️ About the Park
          </span>
          <h2 class="text-5xl md:text-6xl font-black leading-tight mb-6">
            A National<br />
            <span class="text-gradient">Treasure</span>
          </h2>
          <p class="text-gray-400 leading-relaxed mb-4 text-lg">
            Hundred Islands National Park sits in Alaminos City, Pangasinan. Declared a national park in
            <strong class="text-white">1940</strong>, it spans
            <strong class="text-white">1,884 hectares</strong> of marine ecosystems in the Lingayen Gulf.
          </p>
          <p class="text-gray-400 leading-relaxed mb-10 text-lg">
            The park contains <strong class="text-white">124 islands</strong> at low tide — offering island hopping, snorkeling,
            kayaking, camping, and some of the Philippines' richest coral reef ecosystems.
          </p>
          <NuxtLink
            to="/islands"
            class="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-teal-900/40 hover:shadow-teal-700/50 hover:scale-105"
          >
            Explore All Islands
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </NuxtLink>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="glass rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 group hover:scale-105"
          >
            <div class="text-4xl mb-3 group-hover:animate-float">{{ stat.icon }}</div>
            <div class="text-4xl font-black text-gradient mb-1">{{ stat.value }}</div>
            <div class="text-gray-500 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Islands -->
    <section id="islands" class="relative py-28 px-6 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent pointer-events-none" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-400/10 px-4 py-2 rounded-full mb-6">
            🌟 Must Visit
          </span>
          <h2 class="text-5xl md:text-6xl font-black mb-4">
            Island <span class="text-gradient">Highlights</span>
          </h2>
          <p class="text-gray-500 max-w-lg mx-auto text-lg">
            Six of the most stunning destinations in Hundred Islands National Park.
          </p>
        </div>

        <!-- Search -->
        <div class="max-w-md mx-auto mb-14">
          <div class="relative">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search islands..."
              class="w-full glass text-white placeholder-gray-600 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-teal-500 transition-colors text-base"
            />
          </div>
        </div>

        <!-- Grid -->
        <div v-if="filteredIslands.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(island, i) in filteredIslands"
            :key="island.title"
            class="group relative glass rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:glow-teal"
            :style="`animation-delay: ${i * 80}ms`"
            @click="openModal(island)"
          >
            <!-- Image -->
            <div class="h-56 overflow-hidden relative">
              <img
                :src="island.image"
                :alt="island.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <!-- Badge -->
              <span v-if="island.badge"
                class="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
                ⭐ {{ island.badge }}
              </span>
              <!-- Bottom title overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <span class="text-teal-400 text-xs font-bold uppercase tracking-widest">{{ island.category }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-black text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                {{ island.title }}
              </h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{{ island.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-teal-400 text-sm font-bold flex items-center gap-1">
                  Discover
                  <span class="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                </span>
                <span class="text-gray-700 text-xs">Click to explore</span>
              </div>
            </div>

            <!-- Hover glow border -->
            <div class="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-teal-500/40 transition-all duration-300 pointer-events-none" />
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20">
          <div class="text-6xl mb-4">🔎</div>
          <p class="text-gray-500 text-lg">No results for "<span class="text-teal-400">{{ searchQuery }}</span>"</p>
          <button class="mt-4 text-teal-400 hover:text-teal-300 font-bold transition-colors" @click="searchQuery = ''">
            Clear search
          </button>
        </div>

        <!-- CTA -->
        <div class="text-center mt-14">
          <NuxtLink
            to="/islands"
            class="group inline-flex items-center gap-3 border border-teal-500/40 hover:border-teal-400 text-teal-400 hover:text-white hover:bg-teal-600 font-bold px-10 py-4 rounded-2xl transition-all duration-300"
          >
            View Other Islands
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Visit Info -->
    <section id="visit" class="relative py-28 px-6 overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div class="relative max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-400/10 px-4 py-2 rounded-full mb-6">
            📅 Plan Ahead
          </span>
          <h2 class="text-5xl md:text-6xl font-black">
            Visit <span class="text-gradient">Guide</span>
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="info in visitInfo"
            :key="info.label"
            class="glass rounded-2xl p-6 flex gap-4 items-start hover:border-teal-500/30 hover:scale-[1.02] transition-all duration-300 group"
          >
            <span class="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{{ info.icon }}</span>
            <div>
              <h3 class="text-white font-bold mb-1">{{ info.label }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ info.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🏝️</span>
          <div>
            <p class="font-black text-white text-lg">Hundred Islands</p>
            <p class="text-gray-600 text-xs">Alaminos, Pangasinan</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm text-center">© 2026 Pangasinan Provincial Tourism Office · Heritage Digital Showcase</p>
        <div class="flex gap-3">
          <NuxtLink to="/" class="text-gray-600 hover:text-teal-400 text-sm transition-colors">Home</NuxtLink>
          <span class="text-gray-700">·</span>
          <NuxtLink to="/islands" class="text-gray-600 hover:text-teal-400 text-sm transition-colors">Islands</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- Island Modal -->
    <IslandModal v-model="modalOpen" :island="selectedIsland" />

  </main>
</template>

<script setup lang="ts">
useHead({ title: "Alaminos' Hundred Islands — Pangasinan Heritage" })

const { img } = useImage()
const modalOpen = ref(false)
const selectedIsland = ref<any>(null)
const searchQuery = ref('')

function openModal(island: any) {
  selectedIsland.value = island
  modalOpen.value = true
}

const stats = [
  { icon: '🏝️', value: '124', label: 'Islands & Islets' },
  { icon: '🌊', value: '1,884', label: 'Hectares of Park' },
  { icon: '📅', value: '1940', label: 'Year Established' },
  { icon: '🐠', value: '100+', label: 'Marine Species' },
]

const islands = [
  {
    title: 'Governor Island',
    description: 'The largest and most developed island — cottages, swimming pool, and a panoramic viewing deck.',
    category: 'Featured Island',
    image: img('/images/governor-island.jpeg'),
    badge: 'Most Popular',
    fullDescription: 'Governor Island is one of the largest and most popular islands in Hundred Islands National Park. It is known for its elevated viewing area, where visitors can enjoy a panoramic view of the surrounding islands and the Lingayen Gulf. It is also a popular spot for sightseeing and photography.',
  },
  {
    title: "Children's Island",
    description: 'Calm, shallow waters and a wide sandy beach — perfect for families and young visitors.',
    category: 'Family Island',
    image: img('/images/children-island.jpeg'),
    fullDescription: "A shallow, calm beach with gentle waves — ideal for families and young visitors. The sandy shoreline and safe swimming areas make it the go-to island for kids. Its wide open beach is perfect for building sandcastles and wading in the warm, clear water.",
  },
  {
    title: 'Quezon Island',
    description: 'Named after President Manuel Quezon — great for camping, snorkeling, and vibrant coral reefs.',
    category: 'Adventure Island',
    image: img('/images/quezon-island.jpg'),
    fullDescription: 'Named after Philippine President Manuel L. Quezon, this island is one of the most popular destinations inside the park. It offers great snorkeling spots, camping areas, and a picturesque beach with colorful coral reefs.',
  },
  {
    title: 'Bat Cave Island',
    description: 'Dramatic limestone cliffs sheltering thousands of fruit bats that swarm spectacularly at dusk.',
    category: 'Nature Island',
    image: img('/images/bat-cave-island.jpg'),
    fullDescription: 'A dramatic limestone rock formation rising straight from the emerald waters of the Lingayen Gulf. Dense tropical vegetation clings to its jagged cliffs, sheltering a colony of fruit bats. At dusk, thousands of bats emerge in a breathtaking swarm.',
  },
  {
    title: 'Virgin Island',
    description: 'Pristine white sand and untouched turquoise waters — pure, unspoiled natural paradise.',
    category: 'Scenic Island',
    image: img('/images/virgin-island.jpeg'),
    fullDescription: 'One of the most pristine and least developed islands in the park. Virgin Island lives up to its name — untouched white sand, crystal-clear turquoise waters, and unspoiled natural scenery perfect for peace and solitude.',
  },
  {
    title: 'Marcos Island',
    description: 'Vibrant coral reefs, sea turtles, and rich marine life beneath crystal-clear waters.',
    category: 'Diving Island',
    image: img('/images/marcos-island.jpeg'),
    fullDescription: 'A well-known diving and snorkeling destination within Hundred Islands. Marcos Island is surrounded by vibrant coral reefs teeming with diverse marine life — from colorful reef fish to sea turtles.',
  },
]

const filteredIslands = computed(() =>
  islands.filter(i =>
    i.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    i.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const visitInfo = [
  { icon: '📍', label: 'Location', value: 'Alaminos City, Pangasinan, Philippines' },
  { icon: '🕗', label: 'Open Hours', value: '7:00 AM – 5:00 PM daily' },
  { icon: '🎟️', label: 'Entrance Fee', value: 'PHP 50 (adults) · PHP 25 (students/seniors)' },
  { icon: '🚢', label: 'Boat Rental', value: 'Starting at PHP 500 per boat (up to 8 persons)' },
  { icon: '📞', label: 'Contact', value: 'Alaminos City Tourism: (075) 522-0000' },
  { icon: '🌤️', label: 'Best Time to Visit', value: 'November to May (dry season)' },
]
</script>
