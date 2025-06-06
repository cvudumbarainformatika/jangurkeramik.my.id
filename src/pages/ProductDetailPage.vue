<template>
  <div class="min-h-screen relative" :class="{ 'bg-white': isLoading }">
    <!-- Image Section with Skeleton -->
    <div class="sticky top-0 z-10">
      <div class="relative">
        <template v-if="isLoading">
          <div class="w-full aspect-[1/1] bg-gray-200 animate-pulse"></div>
        </template>
        <template v-else>
          <AppProductImage
            :src="product?.images?.find(x=>x?.flag_thumbnail === '1')?.gambar || null"
            aspect="1/1"
            hoverZoom
            :allImages="product?.images || []"
            :alt="product?.name"
            :slider="true"
          />
        </template>

        <!-- Controls overlay - always visible -->
        <div class="absolute top-10 px-4 py-1 w-full">
          <div class="flex items-center justify-start">
             <button
              class="bg-primary text-white rounded-full p-2 shadow hover:bg-primary-dark transition transition-colors"
              title="Edit Profil"
              @click="$router.push('/')"
            >
              <AppIcon name="undo-2" color="white"></AppIcon>
            </button>
            

            <div class="flex-1 w-full flex flex-row gap-4 justify-end items-center">
              <button 
                @click="addToWishlist"
                class="bg-primary text-white rounded-full p-2 shadow hover:bg-primary-dark transition transition-colors"
              >
                <AppIcon
                  name="heart"
                  color="white"
                />
              </button>
              <button 
                class="bg-primary text-white rounded-full p-2 shadow hover:bg-primary-dark transition transition-colors"
              >
                <AppIcon
                  name="external-link"
                  color="white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 pb-20 relative z-1">
      <!-- Product Info with Skeleton -->
      <div class="mb-6 pt-6">
        <div class="flex items-start">
          <div class="flex flex-col flex-1">
            <template v-if="isLoading">
              <!-- Title Skeleton -->
              <div class="h-8 bg-gray-200 rounded-md w-3/4 mb-3 animate-pulse"></div>
              <div class="h-6 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
            </template>
            <template v-else>
              <div class="text-sm line-clamp-2 w-full">{{ product?.category }}</div>
              <div class="text-xl font-medium line-clamp-2 w-full">{{ product?.name }}</div>
              <div class="text-md font-medium line-clamp-3 w-full text-gray-500">{{ product?.namagabung }}</div>

              <div class="flex items-center justify-between">
                <div class="flex items-center flex-wrap gap-2 mt-2">
                  <div class="bg-orange-500 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md text-white/80">
                    <AppIcon name="eye" size="md" class="mr-1 text-white/80" />
                    <span class="font-medium">{{ product?.views?.views || 0 }}</span>
                  </div>

                  <!-- Stock Indicator - Glowing Badge -->
                  <div v-if="product?.likes" class="relative">
                    <div class="bg-orange-500 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center text-md">
                      <AppIcon name="heart" size="md" class="mr-1 text-white/80" />
                      <span class="font-medium text-white/80">{{ product?.likes?.likes || 0 }}</span>
                    </div>
                  </div>
                
                </div>

                <div>
                  <div :class="`${setStok(product)==='No Stok'? 'bg-orange-800':'bg-orange-500'} text-white font-medium px-2 py-1 rounded-full`">
                    <span v-if="auth?.user" 
                      >

                      {{ setStok(product) }}
                    </span>
                  </div>
                </div>
              </div>
              
            </template>
          </div>
        </div>

        <!-- Price Skeleton -->
        <div class="flex items-center my-2">
          <template v-if="isLoading">
            <div class="h-8 bg-gray-200 rounded-md w-32 animate-pulse"></div>
          </template>
          <template v-else>
            <span class="text-3xl font-bold text-orange-500">
              Rp {{ formatPrice(product?.price || 0) }}
            </span>
            <span v-if="product?.discount" class="ml-2 line-through text-gray-400">
              Rp {{ formatPrice(product?.hargajual2 || 0) }}
            </span>
          </template>
        </div>
      </div>

      <!-- Specifications Skeleton -->
      <div class="mb-6">
        <div class="text-lg font-semibold mb-2">Spesifikasi</div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-y-3">
            <template v-if="isLoading">
              <template v-for="(_, index) in 4" :key="index">
                <div class="h-2 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div class="h-2 bg-gray-200 rounded w-24 animate-pulse"></div>
              </template>
            </template>
            <template v-else>
              <div class="text-gray-600">Brand</div>
              <div>{{ product?.brand || '-' }}</div>
              <div class="text-gray-600">Kualitas </div>
              <div>{{ product?.kualitas || '-' }}</div>
              <div class="text-gray-600">Ukuran</div>
              <div>{{ product?.ukuran || '60x60 cm' }}</div>
              <div class="text-gray-600">Warna</div>
              <div>{{ product?.color || '-' }}</div>
            </template>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Action Buttons -->
      <div v-if="auth.isLoggedIn && lihatStok(product) > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex items-center gap-3">
        <!-- Cart Icon with Badge -->
        <div
          
          class="relative w-12 h-12 flex-shrink-0 bg-primary rounded-full flex items-center justify-center cursor-pointer"
          @click="goToCart"
        >
          <AppIcon name="shopping-cart" size="md" color="white" />
          <div
            v-if="cartItems > 0"
            class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white"
          >
            {{ cartItems > 99 ? '99+' : cartItems }}
          </div>
        </div>

        <!-- Add to Cart Button -->
        <button
          class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          @click="setQuantity"
        >
          <AppIcon name="plus" size="md" class="mr-2" color="white" />
          Masukkan Keranjang
        </button>
        
      </div>
    </div>

    <!-- Quick Buy Options - Appears when product is added to cart -->
    <Transition name="slide-up">
      <div
        v-if="showQuickBuyOptions"
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-xl z-30"
      >
        <div class="flex justify-between items-center mb-3 border-b border-gray-300 px-4 py-2">
          <div class="font-medium text-gray-800">Harap Set Quantity Pesanan</div>
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

            <div class="my-4">
              <QuantitySelector
                v-model="jumlah"
                :maxPcs="lihatStok(product)"
                :isiPerDus="product?.isi"
                :satuan-besar="product?.satuan_b"
                :satuan-kecil="product?.satuan_k"
                :default-unit="product?.satuan_k"
                @update:input-mode="handleUnitChange"
              />
            </div>


            <div class="text-orange-500 font-bold">Subtotal : Rp {{ formatPrice(sub || 0) }}</div>
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
            @click="addedToCart"
            class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all disabled:opacity-80"
            :disabled="isNavigating"
          >
            <template v-if="isNavigating">
              <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Menuju Keranjang...
            </template>
            <template v-else>
              <AppIcon name="shopping-cart" size="sm" class="mr-1" color="white" />
              Masuk Keranjang
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
// import MiniCartPreview from '../components/organisms/MiniCartPreview.vue';
import { useProductStore } from '../stores/product-store';
import { storeToRefs } from 'pinia';
import { useCartStore } from 'src/stores/cart-store';
import { useAuthStore } from 'src/stores/auth-store';
import { useToast } from 'src/composables/useToast.js';
import { formatStok } from 'src/modules/konversi'


const AppProductImage = defineAsyncComponent(()=> import('src/components/organisms/product/AppProductImage.vue'))
const QuantitySelector = defineAsyncComponent(()=> import('src/components/atoms/QuantitySelector.vue'))

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore()
const auth = useAuthStore()
const { product } = storeToRefs(productStore);
const { getProductId, wishlist } = productStore;

const { cartItems } = storeToRefs(cartStore)
 
const { addToCart } = cartStore
const { showToast } = useToast()

// State for mini cart
const showMiniCart = ref(false);
const addedProduct = ref(null);
const showQuickBuyOptions = ref(false);
const isNavigating = ref(false);
const isLoading = ref(true);

const jumlah = ref(0)
const unit = ref(product.satuan_k)
const sub = ref(0)

onMounted(async () => {
  const productId = route.params.id;
  isLoading.value = true;
  unit.value = product.value.satuan_k
  
  try {
    await getProductId(productId);
  } catch (error) {
    console.error('Error loading product:', error);
  } finally {
    isLoading.value = false;
  }
});

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

function setStok(product){
  const data = product?.stoks || []
  const totalJumlahK = data?.reduce((total, item) => {
    return total + parseInt(item.jumlah_k || 0);
  }, 0);

  return formatStok(totalJumlahK, product?.isi, product?.satuan_b, product?.satuan_k, 'No Stok')
}


function setQuantity() {
  const satuan = unit.value
  console.log('setQuantity', satuan);
  
  const item = {
    ... product.value,
    satuan
  }
  addedProduct.value = item;
  showQuickBuyOptions.value = true;
}

 
function addedToCart() {
  const quantity = jumlah.value
  const satuan = unit.value
  const satuans = [product.value.satuan_k, product.value.satuan_b]

  const images = product.value?.images;

  product.value.image = Array.isArray(images) && images.length
    ? images.find(x => x?.flag_thumbnail === '1')?.gambar 
        || images[0]?.gambar 
        || null
    : null

    const subtotal = sub.value

  const item = {
    ... product.value,
    quantity,satuan,subtotal,satuans
  }

  // Set the added product for the mini cart
  addedProduct.value = item;

  showQuickBuyOptions.value = false;

  addToCart(item);
  showToast('Produk berhasil ditambahkan ke keranjang', {
    type: 'brand',
    showBrandIcon: true,
    position: 'top',
    duration: 3000
  })
}


function handleUnitChange(val){
  unit.value = val
  jumlah.value = 0
}

function handleSubtotalItem(val){
  
  jumlah.value = val
  const totalSub = parseFloat(product.value?.price || 0) * parseFloat(val || 0);

  sub.value = totalSub
  console.log('hanle subtotal', sub.value);
}

function lihatStok(product){
  const data = product?.stoks || []
  const totalJumlahK = data?.reduce((total, item) => {
    return total + parseInt(item.jumlah_k || 0);
  }, 0);
  return totalJumlahK
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
watch(jumlah, (newVal) => {
  if (newVal !== null && newVal !== undefined) {
    handleSubtotalItem(newVal)
  }
});


// Add loading state when route changes
watch(() => route.params.id, async (newId) => {
  if (newId) {
    isLoading.value = true;
    try {
      await getProductId(newId);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      isLoading.value = false;
    }
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
