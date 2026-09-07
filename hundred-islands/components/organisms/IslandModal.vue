<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        @click.self="$emit('update:modelValue', false)"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" aria-hidden="true" />

        <!-- Modal -->
        <div class="relative max-w-lg w-full z-10 rounded-3xl overflow-hidden glass shadow-2xl shadow-black/50">

          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img
              v-if="island?.image"
              :src="island.image"
              :alt="island.title"
              class="w-full h-full object-cover scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-8xl"
              :style="`background: linear-gradient(135deg, #0f4c75, #030712)`">
              {{ island?.fallbackEmoji }}
            </div>
            <!-- Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />

            <!-- Category pill -->
            <span class="absolute top-5 left-5 bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-xs font-black px-4 py-1.5 rounded-xl shadow-lg uppercase tracking-wide">
              {{ island?.category }}
            </span>

            <!-- Close -->
            <button
              class="absolute top-5 right-5 glass hover:bg-white/10 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 font-bold"
              aria-label="Close"
              @click="$emit('update:modelValue', false)"
            >
              ✕
            </button>

            <!-- Title on image -->
            <div class="absolute bottom-5 left-5 right-5">
              <h2 class="text-3xl font-black text-white drop-shadow-lg">{{ island?.title }}</h2>
            </div>
          </div>

          <!-- Content -->
          <div class="p-7">
            <p class="text-gray-300 leading-relaxed text-base">{{ island?.fullDescription }}</p>

            <div class="mt-8 flex items-center justify-between">
              <span class="text-gray-600 text-xs uppercase tracking-widest">Hundred Islands, Pangasinan</span>
              <button
                class="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-900/40"
                @click="$emit('update:modelValue', false)"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  island?: {
    title: string
    category: string
    image?: string
    fallbackEmoji?: string
    fullDescription: string
  } | null
}>()

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<style scoped>
.modal-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-leave-active {
  transition: all 0.2s ease-in;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(20px);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(10px);
}
</style>
