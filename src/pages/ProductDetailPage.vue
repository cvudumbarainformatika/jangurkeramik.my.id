<template>
  <div class="min-h-screen relative">
    <!-- Orange background at the top - 25vh height (fixed) -->
    <!-- <div class="fixed top-0 left-0 right-0 h-[25vh] bg-primary z-0"></div> -->

    <!-- Back Button -->
    <div class="sticky top-0 z-10">
      <div class="relative">
        <!-- <img
          :src="product?.image || '/images/No-Image.svg'"
          :alt="product?.name"
          class="w-full h-full aspect-[1] object-cover"
        > -->

        <AppProductImage
          :src="product?.images?.find(x=>x?.flag_thumbnail === '1')?.gambar || null"
          aspect="1/1"
          hoverZoom
          :allImages="product?.images || []"
          :alt="product?.name"
          :slider="true"
        />

        <div class="absolute top-8 px-4 py-1 w-full">
          <div class="flex items-center justify-start">
            <button
              @click="$router.back()"
              class="flex text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <AppIcon
                name="chevron-left"
                size="xl"
                color="primary"
                customClass="text-orange"
              />
            </button>

            <div class="flex-1 w-full flex flex-row gap-4 justify-end items-center">
              <button @click="addToWishlist"
                class="flex text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <AppIcon
                  name="heart"
                  size="xl"
                  color="primary"
                  customClass="text-orange"
                />
              </button>
              <button 
                class="flex text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <AppIcon
                  name="share"
                  size="xl"
                  color="primary"
                  customClass="text-orange"
                />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>



    <div class="container mx-auto px-4 pb-20 relative z-1">


      <!-- Product Info -->
      <div class="mb-6 pt-10">

        <div class="flex items-start">

          <!-- Product Details -->
          <div class="flex flex-col flex-1">
            <div class="text-2xl font-medium line-clamp-2 w-full">{{ product?.name }}</div>
            <div class="flex items-center flex-wrap gap-2 mt-2">
              <!-- Views Counter - Futuristic Badge -->
              <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md text-white/80">
                <AppIcon name="eye" size="md" class="mr-1 text-white/80" />
                <span class="font-medium">{{ product?.views?.views || 0 }}</span>
              </div>

              <!-- Stock Indicator - Glowing Badge -->
              <div v-if="product?.likes" class="relative">
                <div class="bg-orange-500/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md">
                  <!-- <span class="h-2 w-2 rounded-full mr-1" :class="[product?.stock > 10 ? 'bg-green-400' : (product?.stock > 0 ? 'bg-yellow-400' : 'bg-dark'), 'animate-pulse']"></span> -->
                  <AppIcon name="heart" size="md" class="mr-1 text-white/80" />
                  <span class="font-medium text-white/80">{{ product?.likes?.likes || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center my-2">
          <span class="text-3xl font-bold text-orange-500">Rp {{ formatPrice(product?.price || 0) }}</span>
          <span v-if="product?.discount" class="ml-2 line-through text-gray-400">Rp {{ formatPrice(product?.hargajual2 || 0) }}</span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="product?.category === 'Keramik' || product?.category === 'keramik'" class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Deskripsi</h2>
        <p class="text-gray-700">{{ product?.description || 'Keramik premium dengan desain modern dan kualitas terbaik. Cocok untuk berbagai ruangan di rumah Anda, memberikan kesan elegan dan mewah.' }}</p>
      </div>

      <!-- Specifications -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Spesifikasi</h2>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-y-3">
            <div class="text-gray-600">Brand</div>
            <div>{{ product?.brand || '-' }}</div>
            <div class="text-gray-600">Kualitas </div>
            <div>{{ product?.kualitas || '-' }}</div>
            <div class="text-gray-600">Ukuran</div>
            <div>{{ product?.ukuran || '60x60 cm' }}</div>
            <!-- <div class="text-gray-600">Material</div>
            <div>{{ product?.material || 'Porcelain' }}</div> -->
            <div class="text-gray-600">Warna</div>
            <div>{{ product?.color || '-' }}</div>
          </div>
        </div>
      </div>

      

      

      <!-- Fixed Bottom Action Buttons -->
      <div v-if="auth.isLoggedIn" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex items-center gap-3">
        <!-- Cart Icon with Badge -->
        <div
          class="relative w-12 h-12 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer"
          @click="goToCart"
        >
          <AppIcon name="shopping-cart" size="md" class="text-orange-500" />
          <div
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white"
          >
            {{ cartCount > 99 ? '99+' : cartCount }}
          </div>
        </div>

        <!-- Add to Cart Button -->
        <button
          class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          @click="addedToCart"
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
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30"
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
import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppIcon from '../components/atoms/AppIcon.vue';
import MiniCartPreview from '../components/organisms/MiniCartPreview.vue';
import { useProductStore } from '../stores/product-store';
import { storeToRefs } from 'pinia';
import { useCartStore } from 'src/stores/cart-store';
import { useAuthStore } from 'src/stores/auth-store';
const AppProductImage = defineAsyncComponent(()=> import('src/components/organisms/product/AppProductImage.vue'))

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore()
const auth = useAuthStore()
const { product } = storeToRefs(productStore);
const { getProductId, wishlist } = productStore;

const { cartCount } = storeToRefs(cartStore)
const {addToCart} = cartStore

// State for mini cart
const showMiniCart = ref(false);
const addedProduct = ref(null);
const showQuickBuyOptions = ref(false);
const isNavigating = ref(false);

onMounted(async () => {
  const productId = route.params.id;
  console.log('productId', productId);
  console.log('product mounted', product?.value);

  Promise.all([
    getProductId(productId)
  ])
});

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

function addedToCart() {
  // Add to cart logic
  console.log('Adding to cart:', product.value);

  // Set the added product for the mini cart
  addedProduct.value = product.value;

  // Always show quick buy options regardless of device
  showQuickBuyOptions.value = true;

  // In a real app, you would also update your cart store
  addToCart(product.value);
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
  router.push('/'); // Navigate to home or previous page
}

function addToWishlist() {
  wishlist(product.value?.id)
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
