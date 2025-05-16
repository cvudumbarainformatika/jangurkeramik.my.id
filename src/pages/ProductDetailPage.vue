<template>
  <div class="min-h-screen relative">
    <!-- Orange background at the top - 25vh height (fixed) -->
    <!-- <div class="fixed top-0 left-0 right-0 h-[25vh] bg-primary z-0"></div> -->
    
    <!-- Back Button -->
    <div class="sticky top-0 z-10 px-4 pt-10 pb-8 bg-primary">
      <div class="flex flex-rows items-start">
        <!-- Back Button (Icon Only) -->
        <button 
          @click="$router.back()" 
          class="flex-none px-2 py-1 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <AppIcon 
            name="chevron-left" 
            size="lg" 
            color="white" 
            customClass="text-white"
          />
        </button>
        
        <!-- Product Details -->
        <div class="flex flex-col flex-1">
          <div class="text-base sm:text-md font-medium text-white line-clamp-2 w-full">{{ product?.name }}</div>
          <div class="flex items-center flex-wrap gap-2 mt-2">
            <!-- Views Counter - Futuristic Badge -->
            <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md text-white/80">
              <AppIcon name="eye" size="md" class="mr-1 text-white/80" />
              <span class="font-medium">{{ product?.viewCount || 342 }}</span>
            </div>
            
            <!-- Stock Indicator - Glowing Badge -->
            <div class="relative">
              <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md">
                <!-- <span class="h-2 w-2 rounded-full mr-1" :class="[product?.stock > 10 ? 'bg-green-400' : (product?.stock > 0 ? 'bg-yellow-400' : 'bg-dark'), 'animate-pulse']"></span> -->
                <AppIcon name="heart" size="md" class="mr-1 text-white/80" />
                <span class="font-medium text-white/80">20</span>
              </div>
              <div class="absolute inset-0 rounded-full bg-white/10 blur-sm -z-10" :class="[product?.stock > 10 ? 'bg-green-400/20' : (product?.stock > 0 ? 'bg-yellow-400/20' : 'bg-red-400/20')]"></div>
            </div>
            
            <!-- Rating Stars - Modern Style -->
            <!-- <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md text-white/80">
              <div class="flex">
                <template v-for="i in 5" :key="i">
                  <AppIcon 
                    :name="i <= Math.floor(product?.rating || 4.5) ? 'star' : (i <= (product?.rating || 4.5) + 0.5 ? 'star-half' : 'star')" 
                    size="sm" 
                    class="text-white/80"
                  />
                </template>
              </div>
              <span class="ml-1 font-medium">{{ product?.rating || 4.5 }}</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 pb-20 relative z-1">
      <!-- Product Image - 3/4 of viewport height -->
      <div class="mb-6 h-[75vh] overflow-hidden rounded-2xl shadow-xl relative">
        <img 
          :src="product?.image || '/images/No-Image.svg'" 
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
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex items-center gap-3">
        <!-- Cart Icon with Badge -->
        <div 
          class="relative w-12 h-12 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer"
          @click="goToCart"
        >
          <AppIcon name="shopping-cart" size="md" class="text-orange-500" />
          <div 
            v-if="cartItemCount > 0"
            class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white"
          >
            {{ cartItemCount > 99 ? '99+' : cartItemCount }}
          </div>
        </div>
        
        <!-- Add to Cart Button -->
        <button 
          class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          @click="addToCart"
        >
          <AppIcon name="plus" size="sm" class="mr-2" />
          Masukkan Keranjang
        </button>
      </div>
    </div>
    
    <!-- Mini Cart Preview -->
    <MiniCartPreview 
      :is-open="showMiniCart" 
      :added-product="addedProduct"
      @close="showMiniCart = false"
    />
    
    <!-- Quick Buy Options - Appears when product is added to cart -->
    <Transition name="slide-up">
      <div 
        v-if="showQuickBuyOptions"
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30"
      >
        <div class="flex justify-between items-center mb-3">
          <div class="font-medium text-gray-800">Produk Berahasil ditambahkan ke keranjang</div>
          <button @click="showQuickBuyOptions = false" class="p-1">
            <AppIcon name="x" size="sm" class="text-gray-500" />
          </button>
        </div>
        
        <div class="flex gap-3 mb-3">
          <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              :src="product?.image || 'https://via.placeholder.com/800x1200/f97316/ffffff?text=Product+Image'" 
              :alt="product?.name" 
              class="w-full h-full object-cover"
            >
          </div>
          <div class="flex-1">
            <div class="font-medium line-clamp-1">{{ product?.name }}</div>
            <div class="text-orange-500 font-bold">Rp {{ formatPrice(product?.price || 1250000) }}</div>
          </div>
        </div>
        
        <div class="flex gap-3">
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppIcon from '../components/atoms/AppIcon.vue';
import MiniCartPreview from '../components/organisms/MiniCartPreview.vue';
import { useProductStore } from '../stores/product-store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { getProductId } = productStore;

// State for mini cart
const showMiniCart = ref(false);
const addedProduct = ref(null);
const cartItemCount = ref(0); // Simulasi jumlah item di keranjang
const showQuickBuyOptions = ref(false);
const isNavigating = ref(false);

onMounted(async () => {
  const productId = route.params.id;
  console.log('productId', productId);

  Promise.all([
    getProductId(productId)
  ])
  
  // Simulasi mendapatkan jumlah item di keranjang
  // Dalam aplikasi nyata, ini akan berasal dari cart store
  cartItemCount.value = 3;
});

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

function addToCart() {
  // Add to cart logic
  console.log('Adding to cart:', product.value);
  
  // Set the added product for the mini cart
  addedProduct.value = product.value;
  
  // Increment cart count (simulasi)
  cartItemCount.value++;
  
  // Always show quick buy options regardless of device
  showQuickBuyOptions.value = true;
  
  // In a real app, you would also update your cart store
  // cartStore.addItem(product.value);
}

function goToCart() {
  isNavigating.value = true;
  
  // Simulasi delay navigasi untuk menunjukkan loading state
  setTimeout(() => {
    router.push('/cart');
    isNavigating.value = false;
  }, 300);
}

function continueShopping() {
  showQuickBuyOptions.value = false;
}

function addToWishlist() {
  // Add to wishlist logic
  console.log('Adding to wishlist:', product.value);
}

// Close quick buy options when mini cart is opened
watch(showMiniCart, (newVal) => {
  if (newVal) {
    showQuickBuyOptions.value = false;
  }
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
