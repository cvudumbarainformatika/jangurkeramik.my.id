<template>
  <section class="relative overflow-hidden py-20">
    <!-- Background Elements -->
    <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
    <div class="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div>
    
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="relative mb-16 text-center">
        <h2 class="relative z-10 mb-4 text-4xl font-bold tracking-tight text-gray-900">
          <span class="relative">
            Promo Spesial
            <span class="absolute -bottom-2 left-0 h-3 w-full bg-orange-200/60"></span>
          </span>
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-600">
          Dapatkan penawaran terbaik untuk produk keramik berkualitas premium.
        </p>
      </div>
      
      <!-- Desktop: Grid Layout -->
      <div class="grid grid-flow-col grid-rows-1 gap-8 md:grid-rows-2 lg:grid-rows-4">
        <div v-for="promo in promotions" :key="promo.id" class="h-full">
          <AppPromoCard :promo="promo" />
        </div>
      </div>
      
      <!-- Mobile: Horizontal Scrollable Layout -->
      <div class="desktop-hidden -mx-4 px-4 pb-4">
        <div class="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-4">
          <div 
            v-for="promo in promotions" 
            :key="promo.id" 
            class="flex-shrink-0 w-[85%] snap-start h-[400px]"
          >
            <AppPromoCard :promo="promo" class="h-full" />
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="mt-6 flex justify-center gap-2">
          <span 
            v-for="(_, index) in promotions" 
            :key="index"
            class="h-2 w-2 rounded-full bg-gray-300 transition-colors duration-300"
            :class="{ 'bg-primary w-4': activeSlide === index }"
          ></span>
        </div>
      </div>
      
      <!-- View All Button -->
      <div class="mt-12 text-center">
        <router-link 
          to="/promotions" 
          class="group relative inline-flex items-center overflow-hidden rounded-full bg-primary px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-primary-dark"
        >
          <span class="relative z-10">Lihat Semua Promo</span>
          <span class="absolute bottom-0 left-0 h-full w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full"></span>
          <AppIcon name="arrow-right" class="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
const AppPromoCard = defineAsyncComponent(() => import('../molecules/AppPromoCard.vue'));

const props = defineProps({
  promotions: {
    type: Array,
    required: true
  }
});

// For mobile scroll indicator
const activeSlide = ref(0);
let scrollContainer = null;

// Function to update active slide based on scroll position
const updateActiveSlide = () => {
  if (!scrollContainer) return;
  
  const containerWidth = scrollContainer.clientWidth;
  const scrollPosition = scrollContainer.scrollLeft;
  const newActiveSlide = Math.round(scrollPosition / (containerWidth * 0.85));
  
  if (newActiveSlide >= 0 && newActiveSlide < props.promotions.length) {
    activeSlide.value = newActiveSlide;
  }
};

// Set up scroll event listener
onMounted(() => {
  scrollContainer = document.querySelector('.snap-x');
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateActiveSlide, { passive: true });
  }
});

// Clean up event listener
onBeforeUnmount(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', updateActiveSlide);
  }
});
</script>

<script>
/**
 * @component AppPromotionsSection
 * @description Komponen organisme untuk menampilkan bagian promosi dengan desain elegan
 * @example
 * <AppPromotionsSection :promotions="promotionsData" />
 */
</script>
