<template>
  <div
    class="gap-4 bg-white rounded-xl shadow-sm p-2 cursor-pointer hover:ring-2 ring-primary transition-all duration-200"
  >

<!-- Order Header -->
    <div class="p-2 border-b border-gray-100 flex justify-between items-center">
      <div>
        <div class="text-sm text-gray-500">Order # {{ order.noorder }}</div>
        <div class="text-sm font-medium">
          {{ order.tglorder ? new Date(order.tglorder).toLocaleDateString('id-ID',{
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : '' }}
        </div>
      </div>
      
        <OrderStatusBadge :status="order.status_order" />
    </div>

    <!-- Order Items -->
    <div class="p-4">
      <div class="flex items-center gap-3 mb-3">
        <!-- Product thumbnails -->
        <div class="flex -space-x-2">
          <div 
            v-for="(item, index) in order.rincians?.slice(0, 3)" 
            :key="index" 
            class="w-10 h-10 rounded-lg overflow-hidden border-2 border-white"
          >
            <img 
              :src="item?.barang?.images[0] || '/images/No-Image.svg'"
              :alt="item?.barang?.namabarang" 
              class="w-full h-full object-cover"
            >
          </div>
          <div 
            v-if="order?.rincians?.length > 3" 
            class="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
          >
            +{{ order?.rincians.length - 3 }}
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <AppIcon name="shopping-cart" size="xs" color="gray" />
            {{ order.rincians?.length }} produk &middot; 
          </div>
          <div class="text-xs text-gray-500 font-bold">Total: {{ formatRupiah(order?.total_harga) }}</div>
        </div>
      </div>
      
        <!-- Action Buttons -->
      <div class="flex gap-4 mt-4">
        <button 
          class="flex-1 p-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          @click="$emit('open-detail')"
        >
          Detail
        </button>
        <button 
          v-if="parseInt(order.status_order) === 3"
          class="flex-1 p-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
          @click="$emit('pembayaran')"
        >
          Pembayaran
        </button>
        <button 
          v-if="parseInt(order.status_order) === 6"
          class="flex-1 p-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
        >
          Pesan Lagi
        </button>
        <button 
          v-if="parseInt(order.status_order) < 6 && parseInt(order.status_order) > 4"
          class="flex-1 p-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
        >
          Batalkan
        </button>
      </div>
    </div>




    <!-- Gambar Produk -->
    <!-- <img
      :src="order.rincians?.[0]?.image || '/images/No-Image.svg'"
      alt="Produk"
      class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-200"
    /> -->

    <!-- Konten Detail -->
    <!-- <div class="flex-1 min-w-0 space-y-1.5">
      <div class="flex flex-wrap items-center gap-2">
        <div class="font-medium text-sm sm:text-base text-gray-800 truncate">
          # {{ order.noorder }}
        </div>
      </div>

      <div class="flex items-center gap-2 text-xs text-gray-500">
        <AppIcon name="shopping-cart" size="xs" color="gray" />
        {{ order.rincians?.length }} produk &middot; <span class="text-gray-500 font-bold">{{ formatRupiah(order.total_harga) }}</span>
      </div>

      
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <AppIcon name="watch" size="xs" color="gray" />
        {{ order.tglorder ? new Date(order.tglorder).toLocaleDateString('id-ID',{
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : '' }}
      </div>

      <div class="flex items-center justify-between mt-1">
        <div class="flex items-center gap-2 text-xs text-white bg-orange-500 py-0.5 px-2 rounded-full">
          <AppIcon name="users" size="xs" color="white" />
          <div> {{ auth?.kodejabatan === 3 ? order?.pelanggan?.nama : order?.sales?.nama }} </div>
        </div>
        <OrderStatusBadge :status="order.status_order" />
      </div>
    </div> -->
  </div>
</template>

<script setup>
import OrderStatusBadge from './OrderStatusBadge.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'

defineProps({
  order: Object,
  auth: Object
})

function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val || 0)
}



</script>
