<template>
  <section class="relative overflow-hidden py-20">
    <!-- Background Elements -->
    <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
    <div class="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div>
    
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="relative mb-16 text-center">
        <div class="relative z-10 mb-4 text-2xl font-bold tracking-tight text-gray-900">
          <span class="relative">
            Product Yang Sering dilihat
            <span class="absolute -bottom-4 left-0 h-3 w-full bg-orange-200/60"></span>
          </span>
        </div>
        <p class="mx-auto max-w-2xl text-md text-gray-600">
          Dapatkan penawaran terbaik untuk produk keramik berkualitas premium.
        </p>
      </div>
      
      <!-- Desktop: 4-Column Layout with Horizontal Scroll -->
      <div class="desktop-only-flex overflow-x-auto pb-4 scrollbar-none">
        <div class="flex gap-6 min-w-max">
          <div 
            v-for="promo in promotions" 
            :key="promo.id" 
            class="w-[calc(25%-18px)] min-w-[280px] h-[400px]"
          >
            <AppPromoCard :promo="promo" class="h-full" />
          </div>
        </div>
      </div>
      
      <!-- Mobile: Similar Layout but with Smaller Cards -->
      <div class="block desktop-hidden overflow-x-auto pb-4 scrollbar-none">
        <div class="flex gap-4 min-w-max">
          <div 
            v-for="promo in promotions" 
            :key="promo.id" 
            class="w-[calc(80vw)] min-w-[200px] h-[300px]"
          >
            <AppPromoCard :promo="promo" class="h-full" />
          </div>
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
