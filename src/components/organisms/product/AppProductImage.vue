<template>
  <div class="relative w-full h-full">
    <img
      :src="pathImg"
      :alt="alt"
      :class="[
        'w-full object-cover transition-transform duration-500',
        hoverZoom ? 'group-hover:scale-110' : '',
        aspectClass,
        customClass
      ]"
      @load="isLoading = false"
      @error="onError"
    />

    <!-- Skeleton -->
    <div
      v-if="isLoading"
      :class="[
        'absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse',
        aspectClass,
        customClass
      ]"
    >
      <div class="w-1/2 h-1/2 bg-gray-300 rounded"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  src: String,
  alt: { type: String, default: 'Product Image' },
  aspect: { type: String, default: '4/3' }, // '4/3', '1/1', etc
  hoverZoom: { type: Boolean, default: true },
  customClass: { type: String, default: '' },
  fallback: { type: String, default: '/images/No-Image.svg' }
})

const pathImg = computed(() => {
  return props.src ? import.meta.env.VITE_PATH_IMAGE +'/'+ props.src : props.fallback
})

const aspectClass = computed(() => {
  // Tailwind: aspect-[4/3] atau aspect-[1/1]
  return props.aspect ? `aspect-[${props.aspect}]` : ''
})

const errorState = ref(false)
const isLoading = ref(true)


function onError(e) {
  if (!errorState.value) {
    e.target.src = props.fallback
    errorState.value = true
  }
}

// Reset loading state if src changes
watch(() => props.src, () => {
  isLoading.value = true
  errorState.value = false
})
</script>