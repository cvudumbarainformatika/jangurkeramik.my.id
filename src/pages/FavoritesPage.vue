<template>
  <div class="min-h-screen bg-gray-200">

     <!-- Header -->
    <div class="sticky top-0 z-10 px-4 pt-10 pb-4 bg-white shadow-sm">
      <div class="flex items-center">
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="flex-shrink-0 px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AppIcon name="chevron-left" size="lg" />
        </button>

        <div class="text-xl font-bold ml-2">Produk Favorit Anda</div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6">
      
      <!-- Empty State -->
      <div v-if="store.items.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm">
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
          v-for="item in store.items" 
          :key="item.id" 
          class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
        >
          <div class="relative">
            <img 
              :src="item?.barang?.image || '/images/No-Image.svg'" 
              :alt="item?.barang?.name" 
              class="w-full h-48 object-cover object-ratio[1/1]"
            />
            <button 
              @click="removeFromFavorites(item?.barang_id)" 
              class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-all"
              aria-label="Hapus dari favorit"
            >
              <AppIcon name="heart" size="lg" color="orange" />
            </button>
            
            <!-- <div v-if="item?.discount" class="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{{ item.discount }}%
            </div> -->
          </div>
          
          <div class="p-4">
            <div class="font-semibold text-gray-800 mb-1 line-clamp-1">{{ item?.barang?.name }}</div>
            <div class="text-gray-500 text-sm mb-2 line-clamp-1">{{ item?.barang?.category }}</div>
            
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <span class="font-bold text-gray-900">Rp {{ formatPrice(item?.barang?.price) }}</span>
                  <!-- <span v-if="item.originalPrice" class="text-gray-400 text-sm line-through">
                    Rp {{ formatPrice(item.originalPrice) }}
                  </span> -->
                </div>
                
              </div>
              
              <button 
                @click="addedToCart(item?.barang)" 
                class="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-blue-600 transition-all"
                aria-label="Tambahkan ke keranjang"
              >
                <AppIcon name="shopping-cart" size="md" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>





    <!-- dialog -->

     <!-- Quick Buy Options - Appears when product is added to cart -->
    <Transition name="slide-up">
      <div
        v-if="showQuickBuyOptions"
        class="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-30"
      >
        <div class="flex justify-between items-center mb-3 border-b border-gray-300 px-4 py-2">
          <div class="font-medium text-gray-800">Produk Berahasil ditambahkan ke keranjang</div>
          <button @click="showQuickBuyOptions = false" class="p-1">
            <AppIcon name="x" size="sm" class="text-gray-500" />
          </button>
        </div>

        <div class="flex gap-3 pb-4 mb-3 px-4">
          <div class="w-18 h-18 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="product?.image || '/images/No-Image.svg'"
              :alt="product?.name"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="flex-1">
            <div class="font-medium line-clamp-1">{{ product?.name }}</div>
            <div class="text-orange-500 font-bold">Rp {{ formatPrice(product?.price || 0) }}</div>
          </div>
        </div>

        <div class="flex gap-3 p-4">
          <button
            @click="continueShopping"
            class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <AppIcon name="arrow-left" size="sm" class="mr-1" />
            Lanjut Belanja
          </button>
          <button
            @click="goToCart"
            class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all disabled:opacity-80"
            :disabled="isNavigating"
          >
            <template v-if="isNavigating">
              <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Menuju Keranjang...
            </template>
            <template v-else>
              <AppIcon name="shopping-cart" size="sm" class="mr-1" />
              Lihat Keranjang
            </template>
          </button>
        </div>
      </div>
    </Transition>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../components/atoms/AppIcon.vue';

import { useFavoriteStore } from 'src/stores/favorite-store'; // Import your store here
import { useCartStore } from 'src/stores/cart-store'; // Import your cart store here

 
const router = useRouter();
const store = useFavoriteStore(); // Import your store here
const product = ref(null);
const showQuickBuyOptions = ref(false);
const isNavigating = ref(false);


const cartStore = useCartStore(); // Import your cart store here
const {addToCart} = cartStore



// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

const removeFromFavorites = (productId) => {
  console.log('Removing from favorites:', productId);
  // favorites.value = favorites.value.filter(item => item.id !== productId);
};

const addedToCart = (item) => {
  console.log('Adding to cart:', item);
  product.value = item;
  showQuickBuyOptions.value = true;
  addToCart(item);
};

function goToCart() {
  isNavigating.value = true;

  // Simulasi delay navigasi untuk menunjukkan loading state
  setTimeout(() => {
    router.push('/cart');
    isNavigating.value = false;
  }, 300);
}


onMounted(() => {
  // Fetch favorites from API or store
  // For example:
  // favorites.value = await fetchFavorites();
  Promise.all([
    store.getData()
  ])
});
</script>

<style scoped>
.slide-up-enter-active {
  animation: slide-up 0.3s ease-out forwards;
}

.slide-up-leave-active {
  animation: slide-up 0.3s ease-in reverse;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
