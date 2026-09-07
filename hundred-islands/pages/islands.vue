<template>
  <main class="bg-[#030712] text-white min-h-screen overflow-x-hidden">

    <!-- Hero -->
    <section class="relative h-80 md:h-[500px] flex items-end overflow-hidden">
      <img src="/images/Governor island.jpeg" alt="Hundred Islands" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
      <!-- Floating glow -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-teal-600/20 blur-3xl pointer-events-none" />
      <div class="relative z-10 px-6 md:px-16 pb-14 max-w-5xl">
        <span class="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-400/10 backdrop-blur px-4 py-2 rounded-full mb-4">
          🏝️ Hundred Islands National Park
        </span>
        <h1 class="text-5xl md:text-7xl font-black leading-tight">
          All <span class="text-gradient">Islands</span>
        </h1>
        <p class="mt-4 text-gray-300 text-lg max-w-xl">
          124 islands scattered across the Lingayen Gulf — from bustling tourist spots to untouched hidden gems.
        </p>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="relative z-10 px-6 pb-10 -mt-1">
      <div class="max-w-4xl mx-auto glass rounded-3xl p-6 grid grid-cols-3 gap-6 text-center">
        <div>
          <p class="text-3xl md:text-4xl font-black text-gradient">124</p>
          <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Total Islands</p>
        </div>
        <div class="border-x border-white/5">
          <p class="text-3xl md:text-4xl font-black text-gradient">1,884</p>
          <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Hectares</p>
        </div>
        <div>
          <p class="text-3xl md:text-4xl font-black text-gradient">1940</p>
          <p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Est. Year</p>
        </div>
      </div>
    </section>

    <!-- Featured Islands -->
    <section class="relative py-20 px-6 overflow-hidden">
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
      <div class="relative max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-12">
          <div>
            <span class="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest bg-teal-400/10 px-4 py-2 rounded-full mb-4">
              ⭐ Must Visit
            </span>
            <h2 class="text-4xl md:text-5xl font-black">
              Featured <span class="text-gradient">Islands</span>
            </h2>
          </div>
          <span class="glass text-gray-400 text-sm px-4 py-2 rounded-xl hidden md:block">
            {{ featuredIslands.length }} islands
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(island, i) in featuredIslands"
            :key="island.title"
            class="group glass rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:glow-teal"
            @click="openModal(island)"
          >
            <div class="h-56 overflow-hidden relative">
              <img :src="island.image" :alt="island.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span class="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
                {{ island.category }}
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-black mb-2 group-hover:text-teal-400 transition-colors duration-300">{{ island.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{{ island.description }}</p>
              <div class="flex items-center text-teal-400 text-sm font-bold gap-1">
                <span>Explore island</span>
                <span class="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
            <div class="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-teal-500/30 transition-all duration-300 pointer-events-none" />
          </article>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-white/5" />
        </div>
        <div class="relative flex justify-center">
          <span class="glass text-teal-400 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full">
            Hidden Gems
          </span>
        </div>
      </div>
    </div>

    <!-- Other Islands -->
    <section class="relative py-20 px-6 overflow-hidden">
      <div class="absolute top-1/2 right-0 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div class="relative max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-4xl md:text-5xl font-black">
              Other <span class="text-gradient">Islands</span>
            </h2>
            <p class="text-gray-500 mt-2">Lesser-known but equally breathtaking destinations.</p>
          </div>
          <span class="glass text-gray-400 text-sm px-4 py-2 rounded-xl hidden md:block">
            {{ otherIslands.length }} islands
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="island in otherIslands"
            :key="island.title"
            class="group glass rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:glow-teal"
            @click="openModal(island)"
          >
            <div class="h-48 overflow-hidden relative" :style="!island.image ? `background: linear-gradient(135deg, ${island.bgColor}, #030712)` : ''">
              <img v-if="island.image" :src="island.image" :alt="island.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div v-else class="w-full h-full flex items-center justify-center text-7xl">{{ island.emoji }}</div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span class="absolute top-4 left-4 glass text-teal-300 text-xs font-bold px-3 py-1.5 rounded-xl">
                {{ island.category }}
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-black mb-2 group-hover:text-teal-400 transition-colors duration-300">{{ island.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{{ island.description }}</p>
              <div class="flex items-center text-teal-400 text-sm font-bold gap-1">
                <span>Explore island</span>
                <span class="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Back to Home -->
    <section class="pb-20 px-6 text-center">
      <NuxtLink
        to="/"
        class="group inline-flex items-center gap-3 glass hover:border-teal-500/40 text-teal-400 hover:text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 hover:bg-teal-600/20"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Home
      </NuxtLink>
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

    <!-- Modal -->
    <IslandModal v-model="modalOpen" :island="selectedIsland" />

  </main>
</template>

<script setup lang="ts">
useHead({ title: 'All Islands — Hundred Islands National Park' })

const modalOpen = ref(false)
const selectedIsland = ref<any>(null)

function openModal(island: any) {
  selectedIsland.value = island
  modalOpen.value = true
}

const featuredIslands = [
  { title: 'Governor Island', category: 'Featured Island', image: '/images/Governor island.jpeg',
    description: 'The largest and most developed island — cottages, swimming pool, and a panoramic viewing deck.',
    fullDescription: 'Governor Island is one of the largest and most popular islands in Hundred Islands National Park. It is known for its elevated viewing area, where visitors can enjoy a panoramic view of the surrounding islands and the Lingayen Gulf. It is also a popular spot for sightseeing and photography.' },
  { title: "Children's Island", category: 'Family Island', image: '/images/children island.jpeg',
    description: 'Calm, shallow waters and a wide sandy beach — perfect for families and young visitors.',
    fullDescription: "A shallow, calm beach with gentle waves — ideal for families and young visitors. The sandy shoreline and safe swimming areas make it the go-to island for kids. Its wide open beach is perfect for building sandcastles and wading in the warm, clear water." },
  { title: 'Quezon Island', category: 'Adventure Island', image: '/images/quezon island.jpg',
    description: 'Named after President Quezon — great for camping, snorkeling, and vibrant coral reefs.',
    fullDescription: 'Named after Philippine President Manuel L. Quezon, this island is one of the most popular destinations inside the park. It offers great snorkeling spots, camping areas, and a picturesque beach with colorful coral reefs.' },
  { title: 'Bat Cave Island', category: 'Nature Island', image: '/images/bat-cave-island.jpg',
    description: 'Dramatic limestone cliffs sheltering thousands of fruit bats that swarm at dusk.',
    fullDescription: 'A dramatic limestone rock formation rising straight from the emerald waters of the Lingayen Gulf. Dense tropical vegetation clings to its jagged cliffs, sheltering a colony of fruit bats. At dusk, thousands of bats emerge in a breathtaking swarm.' },
  { title: 'Virgin Island', category: 'Scenic Island', image: '/images/virgin island.jpeg',
    description: 'Pristine white sand and untouched turquoise waters — pure unspoiled paradise.',
    fullDescription: 'One of the most pristine and least developed islands in the park. Virgin Island lives up to its name — untouched white sand, crystal-clear turquoise waters, and unspoiled natural scenery perfect for peace and solitude.' },
  { title: 'Marcos Island', category: 'Diving Island', image: '/images/marcos island.jpeg',
    description: 'Vibrant coral reefs, sea turtles, and rich marine life beneath crystal-clear waters.',
    fullDescription: 'A well-known diving and snorkeling destination within Hundred Islands. Marcos Island is surrounded by vibrant coral reefs teeming with diverse marine life — from colorful reef fish to sea turtles.' },
]

const otherIslands = [
  { title: 'Pilgrimage Island', category: 'Heritage Island',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hundred_Islands_NP.jpg/640px-Hundred_Islands_NP.jpg',
    emoji: '✝️', bgColor: '#0f4c75',
    description: 'Home to a towering statue of Jesus Christ visible far across the sea.',
    fullDescription: 'Pilgrimage Island, also known as Ramos Island, is one of the most spiritually significant islands in Hundred Islands National Park. It is home to a large statue of Jesus Christ perched atop the island, making it a popular site for religious visitors and pilgrims.' },
  { title: 'Scout Island', category: 'Camping Island',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hundred_Islands_Philippines.jpg/640px-Hundred_Islands_Philippines.jpg',
    emoji: '⛺', bgColor: '#064e3b',
    description: 'A favorite camping destination with sandy shores and great snorkeling nearby.',
    fullDescription: 'Scout Island is a popular destination for camping groups and outdoor enthusiasts. It offers sandy beaches and surrounding waters rich with marine life perfect for snorkeling. It earned its name from the Boy Scouts of the Philippines who frequently camped here.' },
  { title: 'Imelda Island', category: 'Historic Island',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Hundred_Islands_NP.jpg/640px-Hundred_Islands_NP.jpg',
    emoji: '🏛️', bgColor: '#78350f',
    description: 'Named after former First Lady Imelda Marcos — a piece of Philippine history.',
    fullDescription: 'Imelda Island was named after former Philippine First Lady Imelda Marcos. The island features a small beach and is often included in extended island-hopping tours, reflecting the political history of the region during the Marcos era.' },
  { title: 'Limestone Island', category: 'Geological Site',
    image: '/images/limestone island.jpeg',
    emoji: '🪨', bgColor: '#1e293b',
    description: 'Spectacular karst limestone formations carved by millions of years of wind and sea.',
    fullDescription: 'Limestone Island showcases some of the most dramatic geological formations in the entire park — towering karst limestone cliffs sculpted over millions of years by wind, rain, and sea erosion.' },
  { title: 'Camantiles Island', category: 'Nature Island',
    image: '', emoji: '🌿', bgColor: '#14532d',
    description: 'A quiet, lush island of dense tropical vegetation, rarely visited by tourists.',
    fullDescription: 'Camantiles Island is one of the less-visited islands in the park, covered in dense tropical vegetation and surrounded by calm, clear waters — perfect for nature lovers away from the crowds.' },
  { title: 'Crystal Island', category: 'Snorkeling Spot',
    image: '', emoji: '💎', bgColor: '#164e63',
    description: 'Crystal-clear shallow waters reveal a stunning underwater world of coral and tropical fish.',
    fullDescription: 'Crystal Island is named for its exceptionally clear, shallow waters that reveal a stunning underwater world of coral reefs and tropical fish — a peaceful retreat for snorkelers.' },
]
</script>
