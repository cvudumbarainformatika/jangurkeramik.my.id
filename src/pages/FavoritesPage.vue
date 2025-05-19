<template>
  <div class="favorites-page">
    <div class="container mx-auto px-4 py-6">
      <div class="text-2xl font-bold mb-6">Produk Favorit Anda</div>
      
      <!-- Empty State -->
      <div v-if="favorites.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm">
        <AppIcon name="heart" size="xl" class="mx-auto mb-4 text-gray-300" />
        <div class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Favorit</div>
        <p class="text-gray-500 mb-6">Anda belum menyimpan produk favorit</p>
        <button 
          @click="$router.push('/')" 
          class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-md transition-all"
        >
          Jelajahi Produk
        </button>
      </div>
      
      <!-- Favorites List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="product in favorites" 
          :key="product.id" 
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
        >
          <div class="relative">
            <img 
              :src="product?.image || '/images/No-Image.svg'" 
              :alt="product.name" 
              class="w-full h-48 object-cover"
            />
            <button 
              @click="removeFromFavorites(product.id)" 
              class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-all"
              aria-label="Hapus dari favorit"
            >
              <AppIcon name="x" size="sm" />
            </button>
            
            <div v-if="product.discount" class="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{{ product.discount }}%
            </div>
          </div>
          
          <div class="p-4">
            <div class="font-semibold text-gray-800 mb-1 line-clamp-1">{{ product.name }}</div>
            <div class="text-gray-500 text-sm mb-2 line-clamp-1">{{ product.category }}</div>
            
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <span class="font-bold text-gray-900">Rp {{ formatPrice(product.price) }}</span>
                  <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through">
                    Rp {{ formatPrice(product.originalPrice) }}
                  </span>
                </div>
                <div class="flex items-center text-amber-400 text-sm mt-1">
                  <AppIcon name="star-fill" size="sm" />
                  <span class="ml-1 text-gray-700">{{ product.rating }}</span>
                  <span class="text-gray-400 ml-1">({{ product.reviewCount }})</span>
                </div>
              </div>
              
              <button 
                @click="addToCart(product)" 
                class="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                aria-label="Tambahkan ke keranjang"
              >
                <AppIcon name="shopping-cart" size="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../components/atoms/AppIcon.vue';

// eslint-disable-next-line no-unused-vars
const router = useRouter();

// Simulasi data favorit
// Dalam aplikasi nyata, ini akan berasal dari store
const favorites = ref([
  {
    id: 1,
    name: 'Keramik Lantai Granit 60x60 Motif Marmer',
    category: 'Keramik Lantai',
    price: 185000,
    originalPrice: 220000,
    discount: 15,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://via.placeholder.com/800x1200/f97316/ffffff?text=Product+Image'
  },
  {
    id: 2,
    name: 'Keramik Dinding 25x40 Motif Geometris',
    category: 'Keramik Dinding',
    price: 95000,
    originalPrice: 115000,
    discount: 17,
    rating: 4.5,
    reviewCount: 18,
    image: 'https://via.placeholder.com/800x1200/3b82f6/ffffff?text=Product+Image'
  },
  {
    id: 3,
    name: 'Keramik Kamar Mandi Anti Slip 30x30',
    category: 'Keramik Kamar Mandi',
    price: 75000,
    rating: 4.7,
    reviewCount: 32,
    image: 'https://via.placeholder.com/800x1200/10b981/ffffff?text=Product+Image'
  }
]);

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

const removeFromFavorites = (productId) => {
  favorites.value = favorites.value.filter(item => item.id !== productId);
};

const addToCart = (product) => {
  console.log('Adding to cart:', product);
  // Implement your cart logic here
  // For example, you could call a method from your cart store
  // cartStore.addItem(product);
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
