<template>
  <div class="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 h-full">
    <!-- Background Image with Overlay -->
    <div class="relative h-full w-full">
      <img 
        :src="promo.image" 
        :alt="promo.title" 
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
    </div>
    
    <!-- Content -->
    <div class="absolute inset-0 flex flex-col justify-between p-6 text-white">
      <!-- Top Section with Discount Badge -->
      <div class="flex justify-end">
        <div class="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 shadow-lg">
          <div class="absolute -right-5 -top-5 h-10 w-10 rounded-full bg-white/20"></div>
          <div class="absolute -left-5 -bottom-5 h-10 w-10 rounded-full bg-white/10"></div>
          <span class="relative z-10 font-bold tracking-wider">{{ promo.discount }}</span>
        </div>
      </div>
      
      <!-- Bottom Section with Title, Description, and CTA -->
      <div class="mt-auto">
        <h3 class="mb-2 text-2xl font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
          {{ promo.title }}
        </h3>
        <p class="mb-4 text-white/90 line-clamp-2 text-base">{{ promo.description }}</p>
        
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="rounded-lg bg-black/30 backdrop-blur-sm px-3 py-2">
            <p class="text-xs text-white/80">Berlaku hingga:</p>
            <p class="font-medium text-white">{{ promo.validUntil }}</p>
          </div>
          
          <router-link 
            :to="promo.link" 
            class="group/btn relative overflow-hidden rounded-lg bg-white px-5 py-2 font-bold text-primary transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            <span class="relative z-10">Lihat Detail</span>
            <span class="absolute bottom-0 left-0 h-0 w-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover/btn:h-full"></span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  promo: {
    type: Object,
    required: true
  }
});
</script>

<script>
/**
 * @component AppPromoCard
 * @description Komponen molekul untuk menampilkan kartu promosi dengan desain elegan
 * @example
 * <AppPromoCard :promo="promoItem" />
 */
</script>
