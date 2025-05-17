<template>
  <div class="flex flex-col h-full bg-gray-50 p-4 border-l border-gray-200 rounded-lg">
    <h3 class="text-xl font-medium mb-4">Ringkasan Pesanan</h3>
    
    <div v-if="!cartItems.length" class="flex flex-col items-center justify-center flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      <p class="text-center text-gray-500 mt-4">Keranjang belanja Anda masih kosong.</p>
      <button 
        class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        @click="$emit('shop')"
      >
        Mulai Belanja
      </button>
    </div>

    <template v-else>
      <div class="overflow-y-auto flex-1 pr-1" style="max-height: calc(100vh - 350px);">
        <div 
          v-for="(item, index) in cartItems" 
          :key="index"
          class="flex items-center py-3 border-b border-gray-200"
        >
          <div class="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="ml-3 flex-1">
            <div class="font-medium">{{ item.name }}</div>
            <div class="text-sm text-gray-500">{{ item.quantity }} x {{ formatPrice(item.price) }}</div>
          </div>
          <div class="text-primary font-medium">
            {{ formatPrice(item.price * item.quantity) }}
          </div>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-200">
        <div class="flex justify-between mb-2">
          <div class="text-gray-600">Subtotal</div>
          <div class="font-medium">{{ formatPrice(subtotal) }}</div>
        </div>
        <div class="flex justify-between mb-2">
          <div class="text-gray-600">PPN 11%</div>
          <div class="font-medium">{{ formatPrice(tax) }}</div>
        </div>
        <div class="flex justify-between mb-2">
          <div class="text-gray-600">Biaya Pengiriman</div>
          <div class="font-medium">{{ shippingCost ? formatPrice(shippingCost) : 'Akan dihitung' }}</div>
        </div>
        <div class="flex justify-between mt-3 pt-3 border-t border-gray-200">
          <div class="text-lg font-medium">Total</div>
          <div class="text-lg text-primary font-medium">{{ formatPrice(totalAmount) }}</div>
        </div>
      </div>
    </template>

    <div class="mt-6">
      <button 
        :class="[
          'w-full py-2 px-4 rounded-md font-medium transition-colors', 
          hasSupplier && cartItems.length ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        ]"
        :disabled="!hasSupplier || !cartItems.length"
        @click="$emit('checkout')"
      >
        {{ hasSupplier ? 'Lanjutkan Pesanan' : 'Pilih Supplier Terlebih Dahulu' }}
      </button>
      <button 
        class="w-full mt-2 py-2 px-4 rounded-md font-medium text-primary bg-white border border-primary hover:bg-primary hover:bg-opacity-5 transition-colors"
        @click="$emit('close')"
      >
        Kembali ke Toko
      </button>
    </div>

    <div class="mt-6 bg-white p-4 rounded-lg border border-gray-200">
      <h4 class="text-lg font-medium mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
        </svg>
        Butuh Bantuan?
      </h4>
      <p class="text-sm text-gray-600 mb-3">
        Tim layanan pelanggan kami siap membantu Anda selama proses pemesanan
      </p>
      <div class="flex items-center mt-2">
        <button class="w-full py-2 px-4 border border-primary rounded-md text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Hubungi Kami
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  hasSupplier: {
    type: Boolean,
    default: false
  }
});

defineEmits(['shop', 'checkout', 'close']);

// Calculate subtotal, tax and total
const subtotal = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.11; // PPN 11%
});

const totalAmount = computed(() => {
  return subtotal.value + tax.value + props.shippingCost;
});

// Format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>