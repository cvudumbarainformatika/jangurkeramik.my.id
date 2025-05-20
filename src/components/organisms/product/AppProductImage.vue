<template>
  <div class="relative w-full h-full">
    <div class="relative w-full h-full">
      <div v-if="slider" class="relative h-full overflow-hidden">
        <!-- Slider Container -->
        <div
          v-if="allImages?.length > 0"
          class="flex h-full transition-transform duration-300 ease-out w-full"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div 
            v-for="(item, index) in allImages" 
            :key="index"
            class="flex-none w-full h-full relative"
          >
            <!-- Improved Skeleton Loading -->
            <div 
              v-if="imageLoadingStates[index]" 
              class="absolute inset-0 flex items-center justify-center bg-gray-100"
              :class="[aspectClass]"
            >
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                <div class="h-2 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            <img 
              :src="getImagePath(item?.gambar)"
              :alt="`${alt} ${index + 1}`"
              :class="[
                'w-full h-full object-cover transition-all duration-300',
                !imageLoadingStates[index] ? 'opacity-100' : 'opacity-0',
                hoverZoom ? 'group-hover:scale-110' : '',
                aspectClass,
                customClass
              ]"
              @load="onImageLoad(index)"
              @error="onImageError(index)"
            />
          </div>
        </div>

        <div v-else>
          <img
            :src="pathImg"
            :alt="alt"
            :class="[
              'w-full h-full object-cover transition-all duration-300',
              !isLoading ? 'opacity-100' : 'opacity-0',
              hoverZoom ? 'group-hover:scale-110' : '',
              aspectClass,
              customClass
            ]"
            @load="isLoading = false"
            @error="onError"
          />
        </div>

        <!-- Navigation Arrows jika ada lebih dari 1 gambar -->
        <template v-if="allImages.length > 1">
          <button 
            v-if="currentIndex > 0"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
            @click="prevImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            v-if="currentIndex < allImages.length - 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
            @click="nextImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <button
              v-for="(_, index) in allImages"
              :key="index"
              class="w-2 h-2 rounded-full transition-all"
              :class="currentIndex === index ? 'bg-white' : 'bg-white/50'"
              @click="currentIndex = index"
            />
          </div>
        </template>
      </div>

      <!-- Single Image Mode -->
      <template v-else>
        <!-- Improved Single Image Skeleton -->
        <div 
          v-if="isLoading" 
          class="absolute inset-0 flex items-center justify-center bg-gray-100"
          :class="[aspectClass]"
        >
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div class="h-2 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <img
          :src="pathImg"
          :alt="alt"
          :class="[
            'w-full object-cover transition-all duration-300',
            !isLoading ? 'opacity-100' : 'opacity-0',
            hoverZoom ? 'group-hover:scale-110' : '',
            aspectClass,
            customClass
          ]"
          @load="isLoading = false"
          @error="onError"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  src: String,
  alt: { type: String, default: 'Product Image' },
  aspect: { type: String, default: '4/3' },
  hoverZoom: { type: Boolean, default: true },
  customClass: { type: String, default: '' },
  fallback: { type: String, default: '/images/No-Image.svg' },
  allImages: { 
    type: Array,
    default: () => []
  },
  slider: { // Tambah prop slider
    type: Boolean,
    default: false
  }
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

const currentIndex = ref(0)
let touchStartX = 0
let touchEndX = 0

// Tambahkan state loading untuk setiap gambar
const imageLoadingStates = ref(props.allImages.map(() => true))

// Fungsi handle loading per gambar
function onImageLoad(index) {
  // Set loading state to false with slight delay to ensure smooth transition
  setTimeout(() => {
    imageLoadingStates.value[index] = false
  }, 100)
}

// Add error handling for image load
function onImageError(index) {
  console.error('Image load error at index:', index)
  imageLoadingStates.value[index] = false
  // Set fallback image if needed
  const img = event.target
  if (img && !img.src.includes(props.fallback)) {
    img.src = props.fallback
  }
}

function onError(e) {
  console.log('Image load error:', e)
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

function nextImage() {
  if (currentIndex.value < props.allImages.length - 1) {
    currentIndex.value++
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Perbaiki fungsi getImagePath
function getImagePath(image) {
  if (!image) return props.fallback
  // Log the image path being constructed
  const fullPath = `${import.meta.env.VITE_PATH_IMAGE}/${image}`.replace(/([^:]\/)\/+/g, "$1")
  // console.log('Constructed image path:', fullPath)
  return fullPath
}

// Touch Events for Swipe
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchEndX = touchStartX
}

function onTouchMove(e) {
  touchEndX = e.touches[0].clientX
}

function onTouchEnd() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextImage()
    } else {
      prevImage()
    }
  }
}

// Reset loading states saat allImages berubah
watch(() => props.allImages, (obj) => {
  
  currentIndex.value = obj.findIndex(x => x.flag_thumbnail === '1') ?? 0
}, { immediate: true })
</script>

<style scoped>
.touch-pan-x {
  touch-action: pan-x;
}

/* Tambahan CSS untuk memastikan slider horizontal */
.flex {
  display: flex;
  flex-wrap: nowrap;
}

.flex-none {
  flex: 0 0 100%;
}

/* Add smooth transitions */
img {
  will-change: opacity;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>