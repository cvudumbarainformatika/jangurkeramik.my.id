<template>
  <AppDialog
    v-model="isOpen"
    @close="close"
    :title="`Detail Pesanan # ${order?.noorder }`"
    height="80vh"
    bg-header="bg-primary"
  >
    <!-- <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="close"
    > -->
    <template #body>
      <div class="w-full">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2 text-xs text-white bg-orange-500 py-0.5 px-2 rounded-full">
            <AppIcon name="users" size="xs" color="white" />
            <div> {{ order?.pelanggan?.nama }} </div>
          </div>
          
          <div class="flex flex-col justify-end gap-1">
            <OrderStatusBadge :status="order.status_order" />
            
          </div>
        </div>
        <!-- Produk List -->
        <div class="px-4 py-4 max-h-72 overflow-y-auto divide-y divide-gray-300">
          <div
            v-for="item in order?.rincians"
            :key="item.produk_id"
            class="flex gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div class="flex">
              <img
              :src="item?.image || '/images/No-Image.svg'"
              class="w-12 h-12 rounded-lg object-cover border border-gray-300"
              alt="Produk"
            />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-800 truncate">{{ item?.barang?.namabarang }}</div>
              <div class="text-xs text-gray-500">x{{ item?.jumlah }} &middot; {{ formatRupiah(item.harga) }}</div>
              <div class="font-semibold text-gray-700 text-right">{{ formatRupiah(parseFloat(item.harga) * item.jumlah) }}</div>
            </div>
          </div>
        </div>
        <!-- Total -->
        <div class="px-6 py-3 border-t border-gray-200 flex justify-between text-sm bg-gray-300">
          <span>Total</span>
          <span class="font-bold text-primary">{{ formatRupiah(order.total_harga) }}</span>
          
        </div>
        <div class="px-6 py-2 border-t border-gray-200 flex justify-between text-sm bg-gray-300">
          <div class="text-xs text-gray-500 mb-2">
              Order Tanggal : 
              {{ order.tglorder ? new Date(order.tglorder).toLocaleDateString('id-ID',{
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : '' }}
            </div>
          
        </div>
        <!-- Actions -->
        <div class="flex gap-2 p-4">
          

          <div class="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-4 flex items-start gap-3">
            <div class="flex items-center gap-2">
              <AppIcon name="info" class="text-blue-500 mt-0.5" />
              <div class="font-medium">Menunggu Persetujuan Dari Admin ... </div>
            </div>
            <div class="text-sm leading-relaxed">
              Mohon menunggu persetujuan dari Admin sebelum melanjutkan proses pembayaran.  
              Setelah metode pembayaran dipilih dan disetujui, pengiriman barang akan segera diproses.
            </div>
          </div>

          <div class="full-width flex justify-between items-center">
            <button
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-orange-600 transition text-sm"
              type="button"
            >
              <AppIcon name="undo-2" size="sm"  /> Kembali
            </button>
            <button
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-gray-100  font-semibold hover:bg-gray-300 transition text-sm"
              type="button"
            >
              <AppIcon name="receipt" size="sm" color="white" /> Simpan Pembayaran
            </button>
          </div>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { watch, ref, defineAsyncComponent,computed } from 'vue'
// import OrderStatusBadge from './OrderStatusBadge.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'


const AppDialog = defineAsyncComponent(()=> import('src/components/atoms/AppDialog.vue'));
const OrderStatusBadge = defineAsyncComponent(()=> import('src/components/organisms/order/OrderStatusBadge.vue'))

const props = defineProps({
  modelValue: Boolean,
  order: {type:Object, default:null}
})
const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function close() {
  emit('update:modelValue', false)
}

function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.animate-fadeIn {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
/* .text-primary {
  @apply text-orange-600;
}
.bg-primary {
  @apply bg-orange-500;
} */
</style>