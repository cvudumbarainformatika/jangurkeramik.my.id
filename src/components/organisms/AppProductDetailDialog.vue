<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center desktop-only">
    <!-- Backdrop with blur effect -->
    <div 
      class="absolute inset-0 bg-black/30 backdrop-blur-sm"
      @click="$emit('update:modelValue', false)"
    ></div>
    
    <!-- Dialog Content -->
    <div 
      class="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-auto my-8 shadow-2xl animate-dialog-enter"
    >
      <!-- Close Button -->
      <button 
        @click="$emit('update:modelValue', false)"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
      >
        <AppIcon name="x" class="text-gray-700" />
      </button>
      
      <div class="flex flex-col md:flex-row">
        <!-- Product Image with Gradient Overlay -->
        <div class="md:w-1/2 relative group">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            :src="product?.image || '/images/No-Image.svg'" 
            :alt="product?.name" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          
          <!-- Floating Badge -->
          <div v-if="product?.discount" class="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full shadow-lg">
            <span class="font-bold">-{{ product?.discount }}%</span>
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="md:w-1/2 p-6 md:p-8 flex flex-col">
          <!-- Category -->
          <div class="text-orange-500 font-medium mb-2 tracking-wide">{{ product?.category }}</div>
          
          <!-- Product Name -->
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{{ product?.name }}</h2>
          
          <!-- Price Section -->
          <div class="mb-6">
            <div class="flex items-center mb-2">
              <span class="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Rp {{ formatPrice(product?.price) }}
              </span>
              <span v-if="product?.discount" class="ml-3 line-through text-gray-400">
                Rp {{ formatPrice(product?.originalPrice) }}
              </span>
            </div>
            
            <!-- Rating -->
            <div class="flex items-center">
              <div class="flex">
                <AppIcon 
                  v-for="i in 5" 
                  :key="i" 
                  name="star" 
                  :class="i <= (product?.rating || 5) ? 'text-yellow-400' : 'text-gray-300'"
                />
              </div>
              <span class="ml-2 text-gray-600">({{ product?.reviewCount || 0 }} ulasan)</span>
            </div>
          </div>
          
          <!-- Description -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-2">Deskripsi</h3>
            <p class="text-gray-700 leading-relaxed">{{ product?.description }}</p>
          </div>
          
          <!-- Specifications -->
          <div class="mb-8">
            <h3 class="font-semibold text-gray-800 mb-3">Spesifikasi</h3>
            <div class="grid grid-cols-2 gap-y-3 gap-x-4 bg-gray-50 p-4 rounded-xl">
              <div class="text-gray-600">Ukuran</div>
              <div class="font-medium">{{ product?.size || 'N/A' }}</div>
              
              <div class="text-gray-600">Material</div>
              <div class="font-medium">{{ product?.material || 'N/A' }}</div>
              
              <div class="text-gray-600">Warna</div>
              <div class="font-medium">{{ product?.color || 'N/A' }}</div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-auto flex space-x-4">
            <button 
              @click="$emit('add-to-cart', product)"
              class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-medium flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              <AppIcon name="shopping-cart" class="mr-2" />
              Tambah ke Keranjang
            </button>
            
            <button 
              @click="$emit('add-to-wishlist', product)"
              class="flex-none w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
            >
              <AppIcon name="heart" class="text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['update:modelValue', 'add-to-cart', 'add-to-wishlist']);

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}
</script>

<style scoped>
.animate-dialog-enter {
  animation: dialog-enter 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
}

@keyframes dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
