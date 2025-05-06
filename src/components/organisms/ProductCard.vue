<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl h-full flex flex-col">
    <!-- Product Image with Quick View -->
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      >
      
      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span v-if="product.isNew" class="bg-primary text-white text-xs px-2 py-1 rounded">Baru</span>
        <span v-if="product.discount" class="bg-red-500 text-white text-xs px-2 py-1 rounded">-{{ product.discount }}%</span>
        <span v-if="product.stock <= 5 && product.stock > 0" class="bg-amber-500 text-white text-xs px-2 py-1 rounded">Stok Terbatas</span>
        <span v-if="product.stock === 0" class="bg-gray-500 text-white text-xs px-2 py-1 rounded">Habis</span>
      </div>
      
      <!-- Quick Actions -->
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex gap-2">
          <button 
            class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition"
            @click="$emit('quick-view', product)"
            aria-label="Quick view"
          >
            <AppIcon name="eye" />
          </button>
          <button 
            class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition"
            @click="$emit('add-to-cart', product)"
            aria-label="Add to cart"
            :disabled="product.stock === 0"
          >
            <AppIcon name="cart" />
          </button>
          <button 
            class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition"
            @click="$emit('toggle-wishlist', product)"
            aria-label="Add to wishlist"
          >
            <AppIcon :name="product.inWishlist ? 'heart-filled' : 'heart'" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="p-4 flex flex-col flex-grow">
      <div class="text-sm text-gray-500 mb-1">{{ product.category }}</div>
      <h3 class="font-medium text-lg mb-1 hover:text-primary transition">
        <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
      </h3>
      
      <div class="flex items-center mb-2">
        <div class="flex text-yellow-400">
          <AppIcon v-for="i in 5" :key="i" :name="i <= Math.floor(product.rating) ? 'star-filled' : (i <= product.rating + 0.5 ? 'star-half' : 'star')" size="sm" />
        </div>
        <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount }})</span>
      </div>
      
      <div class="mt-auto">
        <div class="flex items-center justify-between">
          <div>
            <span v-if="product.discount" class="text-gray-400 line-through text-sm mr-2">Rp {{ formatPrice(product.originalPrice) }}</span>
            <span class="text-primary font-bold">Rp {{ formatPrice(product.price) }}</span>
          </div>
          
          <div class="text-xs text-gray-500">
            {{ product.size }}
          </div>
        </div>
        
        <button 
          v-if="showAddToCartButton"
          class="mt-3 w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          @click="$emit('add-to-cart', product)"
          :disabled="product.stock === 0"
        >
          {{ product.stock === 0 ? 'Habis' : 'Tambah ke Keranjang' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';

 defineProps({
  product: {
    type: Object,
    required: true
  },
  showAddToCartButton: {
    type: Boolean,
    default: false
  }
});

defineEmits(['quick-view', 'add-to-cart', 'toggle-wishlist']);

// Format price with thousand separator
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};
</script>

<script>
/**
 * @component ProductCard
 * @description Komponen organisme untuk menampilkan produk dalam bentuk kartu
 * @example
 * <ProductCard 
 *   :product="product" 
 *   :showAddToCartButton="true"
 *   @quick-view="openQuickView"
 *   @add-to-cart="addToCart"
 *   @toggle-wishlist="toggleWishlist"
 * />
 */
</script>
