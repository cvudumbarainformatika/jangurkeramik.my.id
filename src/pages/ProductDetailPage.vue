<template>
  <div class="bg-orange-500 min-h-screen">
    <!-- Back Button -->
    <div class="sticky top-0 z-10 p-4">
      <button @click="$router.back()" class="flex items-center text-gray-100">
        <AppIcon name="chevron-left" size="lg" class="text-white" />
        <div class="ml-4">
          <div class="text-base font-bold-medium">{{ product?.name }}</div>

        </div>
      </button>
    </div>

    <div class="container mx-auto px-4 pb-20">
      <!-- Product Image -->
      <div class="mb-6">
        <img :src="product?.image" :alt="product?.name" class="w-full h-auto object-cover rounded-lg">
      </div>

      <!-- Product Info -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">{{ product?.name }}</h1>
        <div class="flex items-center mb-2">
          <span class="text-2xl font-bold text-orange-500">Rp {{ formatPrice(product?.price) }}</span>
          <span v-if="product?.discount" class="ml-2 line-through text-gray-400">Rp {{ formatPrice(product?.originalPrice) }}</span>
        </div>
        <div class="flex items-center">
          <div class="flex">
            <AppIcon name="star" class="text-yellow-400" v-for="i in 5" :key="i" />
          </div>
          <span class="ml-2 text-gray-600">({{ product?.reviewCount || 0 }} ulasan)</span>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Deskripsi</h2>
        <p class="text-gray-700">{{ product?.description }}</p>
      </div>

      <!-- Specifications -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Spesifikasi</h2>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-y-3">
            <div class="text-gray-600">Ukuran</div>
            <div>{{ product?.size }}</div>
            <div class="text-gray-600">Material</div>
            <div>{{ product?.material }}</div>
            <div class="text-gray-600">Warna</div>
            <div>{{ product?.color }}</div>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Action Buttons -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex space-x-4">
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
      </div>
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

function addToCart() {
  // Add to cart logic
  console.log('Adding to cart:', product.value);
}

function addToWishlist() {
  // Add to wishlist logic
  console.log('Adding to wishlist:', product.value);
}
</script>