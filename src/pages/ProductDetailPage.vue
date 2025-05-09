<template>
  <div class="min-h-screen bg-white relative">
    <!-- Orange background at the top - 25vh height (fixed) -->
    <div class="fixed top-0 left-0 right-0 h-[25vh] bg-primary z-0"></div>
    
    <!-- Back Button -->
    <div class="sticky top-0 z-10 px-4 pt-10 pb-4 bg-primary">
      <div class="flex items-start">
        <!-- Back Button (Icon Only) -->
        <button 
          @click="$router.back()" 
          class="px-2 py-1 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <AppIcon 
            name="chevron-left" 
            size="lg" 
            color="white" 
            customClass="text-white"
          />
        </button>
        
        <!-- Product Details -->
        <div class="ml-2 flex flex-col">
          <div class="text-xl font-medium text-white line-clamp-2 full-width">{{ product?.name }}</div>
          <div class="flex items-center space-x-3 mt-2">
            <!-- Views Counter - Futuristic Badge -->
            <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md text-white/80">
              <AppIcon name="eye" size="md" class="mr-1 text-white/80" />
              <span class="font-medium ">{{ product?.viewCount || 342 }}</span>
            </div>
            
            <!-- Stock Indicator - Glowing Badge -->
            <div class="relative">
              <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md">
                <span class="h-2 w-2 rounded-full mr-1" :class="[product?.stock > 10 ? 'bg-green-400' : (product?.stock > 0 ? 'bg-yellow-400' : 'bg-dark'), 'animate-pulse']"></span>
                <span class="font-medium text-white/80">{{ product?.stock > 0 ? `${product?.stock} tersisa` : 'Habis' }}</span>
              </div>
              <div class="absolute inset-0 rounded-full bg-white/10 blur-sm -z-10" :class="[product?.stock > 10 ? 'bg-green-400/20' : (product?.stock > 0 ? 'bg-yellow-400/20' : 'bg-red-400/20')]"></div>
            </div>
            
            <!-- Rating Stars - Modern Style -->
            <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md">
              <div class="flex">
                <template v-for="i in 5" :key="i">
                  <AppIcon 
                    :name="i <= Math.floor(product?.rating || 4.5) ? 'star' : (i <= (product?.rating || 4.5) + 0.5 ? 'star-half' : 'star')" 
                    size="md" 
                    class="text-white/80"
                  />
                </template>
              </div>
              <span class="ml-1 font-medium">{{ product?.rating || 4.5 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 pb-20 relative z-1 ">
      <!-- Product Image - 3/4 of viewport height -->
      <div class="mb-6 h-[75vh] overflow-hidden rounded-xl shadow-xl relative">
        <img 
          :src="product?.image || 'https://via.placeholder.com/800x1200/f97316/ffffff?text=Product+Image'" 
          :alt="product?.name" 
          class="w-full h-full aspect-[4/3] object-cover"
        >
        
        <!-- Action buttons at bottom-right corner -->
        <div class="absolute bottom-4 right-4 flex flex-row gap-4">
          <!-- Share Button -->
          <button class="w-16 h-16 rounded-full bg-orange-500/80 backdrop-blur-md flex items-center justify-center hover:bg-orange-600/80 transition-colors">
            <AppIcon 
              name="external-link" 
              size="lg" 
              class="text-white"
            />
          </button>
          
          <!-- Favorite Button -->
          <button 
            class="w-16 h-16 rounded-full bg-orange-500/80 backdrop-blur-md flex items-center justify-center hover:bg-orange-600/80 transition-colors"
            @click="addToWishlist"
          >
            <AppIcon 
              name="heart" 
              size="lg" 
              class="text-white"
            />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="mb-6">
        <!-- <h1 class="text-2xl font-bold mb-2">{{ product?.name || 'Product Name' }}</h1> -->
        <div class="flex items-center mb-2">
          <span class="text-3xl font-bold text-orange-500">Rp {{ formatPrice(product?.price || 1250000) }}</span>
          <span v-if="product?.discount" class="ml-2 line-through text-gray-400">Rp {{ formatPrice(product?.originalPrice || 1500000) }}</span>
        </div>
        <div class="flex items-center">
          <div class="flex">
            <AppIcon name="star" class="text-yellow-400" v-for="i in 5" :key="i" />
          </div>
          <span class="ml-2 text-gray-600">({{ product?.reviewCount || 24 }} ulasan)</span>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Deskripsi</h2>
        <p class="text-gray-700">{{ product?.description || 'Keramik premium dengan desain modern dan kualitas terbaik. Cocok untuk berbagai ruangan di rumah Anda, memberikan kesan elegan dan mewah.' }}</p>
      </div>

      <!-- Specifications -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Spesifikasi</h2>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-y-3">
            <div class="text-gray-600">Ukuran</div>
            <div>{{ product?.size || '60x60 cm' }}</div>
            <div class="text-gray-600">Material</div>
            <div>{{ product?.material || 'Porcelain' }}</div>
            <div class="text-gray-600">Warna</div>
            <div>{{ product?.color || 'Cream Marble' }}</div>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Action Buttons -->
      <!-- <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex space-x-4">
        <button 
          class="flex-1 bg-white border border-orange-500 text-orange-500 py-3 rounded-full flex items-center justify-center"
          @click="addToWishlist"
        >
          <AppIcon name="heart" size="sm" class="mr-2" />
          Favorit
        </button>
        <button 
          class="flex-1 bg-orange-500 text-white py-3 rounded-full flex items-center justify-center"
          @click="addToCart"
        >
          <AppIcon name="shopping-cart" size="sm" class="mr-2" />
          Beli
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from '../components/atoms/AppIcon.vue';
import { useProductStore } from '../stores/product-store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

onMounted(async () => {
  const productId = route.params.id;
  // Fetch product details
  // product.value = await productStore.getProductById(productId);
  console.log('productId', productId);
  
});

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

// eslint-disable-next-line no-unused-vars
function addToCart() {
  // Add to cart logic
  console.log('Adding to cart:', product.value);
}

function addToWishlist() {
  // Add to wishlist logic
  console.log('Adding to wishlist:', product.value);
}
</script>
