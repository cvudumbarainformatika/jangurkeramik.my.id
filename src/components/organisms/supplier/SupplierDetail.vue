<template>
  <div class="flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-2">
      <div class="text-xl font-medium ml-2">Detail Supplier</div>
      <button 
        @click="$emit('close')" 
        class="ml-auto p-2 rounded-full hover:bg-gray-200 transition"
      >
        <AppIcon name="x" size="lg" class="text-gray-600" />
      </button>
    </div>

    <!-- Supplier Header -->
    <div class="border border-gray-200 rounded-lg p-4 mb-4">
      <div class="flex flex-row items-start gap-4">
        <div class="relative mb-4">
          <div class="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
            <!-- <img :src="supplier?.logo" :alt="supplier.name" class="object-cover w-full h-full" /> -->
             <AppAvatar
              :user="supplier"
            />
          </div>
          
          <div class="absolute -bottom-0 -right-0 bg-primary text-white rounded-full p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>

          
        </div>
        <div class="flex-1 relative">
          <div class="flex items-center">
            <div class="text-xl font-medium text-gray-900">{{ supplier?.nama }}</div>
            
          </div>
          
          <div class="mt-2 text-gray-700">
           
            <div class="flex items-center mt-1">
              <AppIcon name="phone" size="sm" class="text-gray-500" />
              <span class="ml-2">{{ supplier?.nohp || '(021) 1234-5678' }}</span>
            </div>
            
            
          </div>
          <div class="absolute -bottom-10 bg-primary text-white text-xs px-2 py-0.5 rounded-full" >
              Supplier Resmi
            </div>
          
        </div>
      </div>
    </div>

    <!-- Supplier Tabs -->
    <div class="border-b border-gray-200 mb-4">
      <nav class="flex -mb-px">
        <button 
          @click="activeTab = 'info'"
          :class="[
            'py-2 px-4 text-center border-b-2 font-medium text-sm',
            activeTab === 'info' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Informasi
        </button>
        <!-- <button 
          @click="activeTab = 'products'"
          :class="[
            'py-2 px-4 text-center border-b-2 font-medium text-sm',
            activeTab === 'products' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Produk
        </button> -->
        <button 
          @click="activeTab = 'reviews'"
          :class="[
            'py-2 px-4 text-center border-b-2 font-medium text-sm',
            activeTab === 'reviews' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Ulasan
        </button>
        <!-- <button 
          @click="activeTab = 'shipping'"
          :class="[
            'py-2 px-4 text-center border-b-2 font-medium text-sm',
            activeTab === 'shipping' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Pengiriman
        </button> -->
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="overflow-y-auto" style="max-height: calc(100vh - 350px);">
      <!-- Info Tab -->
      <div v-if="activeTab === 'info'">
        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium mb-2">Tentang {{ supplier.name }}</h4>
          <p class="text-gray-700">{{ supplier.description || 'Informasi tentang supplier belum tersedia.' }}</p>
          
          <h4 class="text-lg font-medium mt-4 mb-2">Kebijakan Supplier</h4>
          <ul class="list-disc pl-4 text-gray-700">
            <li class="mb-1">Minimum pemesanan: {{ supplier.minOrder || 'Rp 1.000.000' }}</li>
            <li class="mb-1">Jam operasional: {{ supplier.operationalHours || 'Senin-Jumat 08.00-17.00' }}</li>
            <li class="mb-1">Metode pembayaran: {{ supplier.paymentMethods || 'Transfer Bank, QRIS' }}</li>
            <li class="mb-1">Kebijakan pengembalian: {{ supplier.returnPolicy || '7 hari untuk produk cacat' }}</li>
          </ul>

          <div v-if="supplier.hasPromo" class="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-red-800 font-medium">Promo Spesial!</h3>
                <p class="text-red-700 mt-1">{{ supplier.promoDescription || 'Dapatkan penawaran spesial untuk pembelian melalui supplier ini.' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Tab -->
      <!-- <div v-if="activeTab === 'products'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="product in supplier.products || []" 
            :key="product.id"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div class="h-48 bg-gray-200">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm">{{ product.category }}</p>
              <div class="flex items-center justify-between mt-2">
                <div class="text-primary font-bold">{{ formatPrice(product.price) }}</div>
                <div class="text-gray-500 text-sm">Stok: {{ product.stock }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!supplier.products || supplier.products.length === 0" class="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
          </svg>
          <p class="text-gray-500 mt-4 text-center">Daftar produk belum tersedia.</p>
        </div>
      </div> -->

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'">
        <div class="flex flex-col space-y-4">
          <div 
            v-for="review in supplier.reviews || []" 
            :key="review.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img :src="review.userAvatar" :alt="review.userName" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                  <div class="font-medium">{{ review.userName }}</div>
                  <div class="text-gray-500 text-sm">{{ review.date }}</div>
                </div>
                <div class="flex items-center mt-1">
                  <div class="flex">
                    <svg 
                      v-for="i in 5" 
                      :key="i" 
                      :class="[
                        'h-4 w-4',
                        i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      ]"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p class="mt-2 text-gray-700">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!supplier.reviews || supplier.reviews.length === 0" class="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
          </svg>
          <p class="text-gray-500 mt-4 text-center">Belum ada ulasan untuk supplier ini.</p>
        </div>
      </div>

      <!-- Shipping Tab -->
      <!-- <div v-if="activeTab === 'shipping'">
        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="text-lg font-medium mb-2">Informasi Pengiriman</h4>
          <div class="text-gray-700 mb-4">
            <p>{{ supplier.name }} melayani pengiriman ke berbagai wilayah dengan beberapa pilihan layanan ekspedisi.</p>
          </div>

          <div class="flex flex-col space-y-4">
            <div 
              v-for="(shipping, index) in supplier.shippingOptions || defaultShippingOptions" 
              :key="index" 
              class="p-3 border border-gray-200 rounded-lg flex items-center"
            >
              <div class="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <svg class="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0017 6h-3V4a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <div class="font-medium">{{ shipping.name }}</div>
                <div class="text-sm text-gray-500">Estimasi: {{ shipping.estimatedTime }}</div>
              </div>
              <div class="ml-auto font-medium">{{ formatPrice(shipping.cost) }}</div>
            </div>
          </div>

          <h4 class="text-lg font-medium mt-4 mb-2">Area Pengiriman</h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div 
              v-for="(area, index) in supplier.coverageAreas || defaultCoverageAreas" 
              :key="index"
              class="border border-gray-200 rounded-lg p-2 text-center"
            >
              {{ area }}
            </div>
          </div>
        </div>
      </div> -->
    </div>




    
  </div>
</template>

<script setup>
import AppIcon from 'src/components/atoms/AppIcon.vue';
import { defineAsyncComponent, ref } from 'vue';

const AppAvatar = defineAsyncComponent(() => 
  import('src/components/atoms/AppAvatar.vue')
);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  supplier: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const activeTab = ref('info');

// Default values
// const defaultShippingOptions = [
//   { name: 'Reguler', estimatedTime: '2-3 hari', cost: 150000 },
//   { name: 'Express', estimatedTime: '1 hari', cost: 250000 },
//   { name: 'Ekonomi', estimatedTime: '3-5 hari', cost: 100000 }
// ];

// const defaultCoverageAreas = ['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Yogyakarta', 'Medan'];

// Format price to IDR
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0
//   }).format(price);
// };
</script>