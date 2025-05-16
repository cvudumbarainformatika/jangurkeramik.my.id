<template>
  <div>
    <!-- Toast Notification -->
    <Transition name="toast-fade" appear>
    <div 
      v-if="showToast"
      class="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center space-x-3 animate-slide-in"
    >
      <AppIcon name="check-circle" size="sm" class="text-white drop-shadow" />
      <span class="font-medium tracking-wide">Produk berhasil ditambahkan ke keranjang</span>
    </div>
  </Transition>
    <!-- Mini Cart Slide-in Panel -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      :class="[isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none']"
      @click="close"
    ></div>
    
    <div 
      class="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col"
      :class="[isOpen ? 'translate-x-0' : 'translate-x-full']"
    >
      <!-- Header -->
      <div class="bg-primary text-white p-4 flex items-center justify-between">
        <div class="flex items-center">
          <AppIcon name="shopping-cart" size="md" class="mr-2" />
          <h2 class="text-lg font-medium">Keranjang Belanja</h2>
        </div>
        <button @click="close" class="p-1 rounded-full hover:bg-white/10 transition-colors">
          <AppIcon name="x" size="md" />
        </button>
      </div>
      
      <!-- Added Product -->
      <div v-if="addedProduct" class="p-4 border-b border-gray-200 bg-orange-50">
        <div class="flex items-center">
          <div class="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img :src="addedProduct.image" :alt="addedProduct.name" class="w-full h-full object-cover">
            <div class="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</div>
          </div>
          <div class="ml-3 flex-grow">
            <div class="font-medium line-clamp-1">{{ addedProduct.name }}</div>
            <div class="text-orange-500 font-bold">Rp {{ formatPrice(addedProduct.price) }}</div>
          </div>
        </div>
        <div class="mt-2 text-sm text-green-600 flex items-center">
          <AppIcon name="check" size="sm" class="mr-1" />
          Berhasil ditambahkan ke keranjang
        </div>
      </div>
      
      <!-- Cart Items -->
      <div class="flex-grow overflow-auto p-4">
        <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-500">
          <AppIcon name="shopping-cart" size="xl" class="mx-auto mb-2 opacity-30" />
          <p>Keranjang belanja Anda kosong</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(item, index) in cartItems" :key="index" class="flex items-center border-b border-gray-100 pb-4">
            <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="ml-3 flex-grow">
              <div class="font-medium line-clamp-1">{{ item.name }}</div>
              <div class="flex items-center justify-between mt-1">
                <div class="text-orange-500 font-bold">Rp {{ formatPrice(item.price) }}</div>
                <div class="flex items-center border border-gray-200 rounded-lg">
                  <button class="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
                  <span class="px-2">{{ item.quantity }}</span>
                  <button class="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cart Summary -->
      <div class="border-t border-gray-200 p-4 bg-gray-50">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Subtotal ({{ totalItems }} item)</span>
          <span class="font-bold">Rp {{ formatPrice(subtotal) }}</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-gray-600">Estimasi Ongkir</span>
          <span class="font-bold">Rp {{ formatPrice(shipping) }}</span>
        </div>
        <div class="flex justify-between text-lg mb-4">
          <span class="font-medium">Total</span>
          <span class="font-bold text-orange-500">Rp {{ formatPrice(total) }}</span>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-3">
          <button 
            @click="goToCheckout" 
            class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            <AppIcon name="credit-card" size="sm" class="mr-2" />
            Checkout Sekarang
          </button>
          
          <button 
            @click="goToCart" 
            class="w-full bg-white border border-orange-500 text-orange-500 py-3 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors"
          >
            <AppIcon name="shopping-cart" size="sm" class="mr-2" />
            Lihat Keranjang
          </button>
          
          <button 
            @click="close" 
            class="w-full text-gray-600 py-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <AppIcon name="arrow-left" size="sm" class="mr-2" />
            Lanjut Belanja
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../atoms/AppIcon.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  addedProduct: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const router = useRouter();
const showToast = ref(false);

// Sample cart data - in a real app, this would come from a store
const cartItems = ref([
  // This would be populated from your cart store
]);

// Computed properties
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const shipping = computed(() => {
  return subtotal.value > 0 ? 15000 : 0;
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});

// Methods
function close() {
  emit('close');
}

function goToCart() {
  router.push('/cart');
  close();
}

function goToCheckout() {
  router.push('/checkout');
  close();
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

// Show toast when product is added
watch(() => props.addedProduct, (newVal) => {
  if (newVal) {
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
    
    // In a real app, you would add the product to the cart here
    // cartStore.addItem(newVal);
  }
});

// Add the newly added product to the cart items for display
watch(() => props.addedProduct, (newVal) => {
  if (newVal && !cartItems.value.some(item => item.id === newVal.id)) {
    cartItems.value.push({
      ...newVal,
      quantity: 1
    });
  }
}, { immediate: true });

onMounted(() => {
  // In a real app, you would fetch the cart items here
  // cartItems.value = cartStore.items;
});
</script>

<style scoped>
/* .toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
} */


 .toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Opsional animasi khusus saat masuk */
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-slide-in {
  animation: slide-in 0.4s ease-out;
}
</style>