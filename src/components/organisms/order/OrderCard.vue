<template>
  <div class="flex items-center gap-3 bg-white rounded-lg shadow p-3 cursor-pointer hover:ring-2 ring-primary transition"
       @click="$emit('click')">
    <img
      :src="order.rincians?.[0]?.image || '/images/No-Image.svg'"
      class="w-16 h-16 rounded-lg object-cover border"
      alt="Produk"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-gray-800 truncate">#{{ order.noorder }}</span>
        <OrderStatusBadge :status="order.status_order" />
      </div>
      <div class="text-xs text-gray-500 mt-1">
        {{ order.rincians?.length }} produk &middot; {{ formatRupiah(order.total_harga) }}
      </div>
      <div class="text-xs text-gray-400 mt-1">
        {{ order.tglorder ? new Date(order.tglorder).toLocaleDateString() : '' }}
      </div>
      <div class="flex ">
        <div class="text-xs text-gray-200 bg-orange-500 py-0.5 px-2 rounded-full">
          {{ auth?.kodejabatan === 3 ? 'Pelanggan' : 'Sales' }}:

          {{ auth?.kodejabatan === 3 ? order?.pelanggan?.nama : order?.sales?.nama }}
        </div>
      </div>
    </div>
    <div>
       <AppIcon name="chevron-right" size="md" class="text-gray-400" />
    </div>
  </div>
</template>

<script setup>
import OrderStatusBadge from './OrderStatusBadge.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'
 
defineProps({ order: Object, auth: Object })

function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}
</script>