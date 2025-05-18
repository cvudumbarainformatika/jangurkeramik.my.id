<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="close"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-2 animate-fadeIn">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
          <div>
            <div class="font-bold text-md">Detail Pesanan #{{ order.noorder }}</div>
            <OrderStatusBadge :status="order.status_order" />
          </div>
          <button
            @click="close"
            class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            aria-label="Tutup"
            type="button"
          >
            <AppIcon name="x" size="md" class="text-gray-500" />
          </button>
        </div>
        <div class="px-6 text-xs text-gray-500 mb-2">{{ order.tglorder }}</div>
        <!-- Produk List -->
        <div class="px-6 py-2 max-h-72 overflow-y-auto divide-y">
          <div
            v-for="item in order.rincians"
            :key="item.produk_id"
            class="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <img
              :src="item.image || '/images/No-Image.svg'"
              class="w-12 h-12 rounded-lg object-cover border"
              alt="Produk"
            />
            <div class="flex-1 min-w-0">
              <div class="font-medium text-gray-800 truncate">{{ item?.barang?.namabarang }}</div>
              <div class="text-xs text-gray-500">x{{ item.jumlah }} &middot; {{ formatRupiah(item.harga) }}</div>
            </div>
            <div class="font-semibold text-gray-700 text-right">{{ formatRupiah(parseFloat(item.harga) * item.jumlah) }}</div>
          </div>
        </div>
        <!-- Total -->
        <div class="px-6 py-3 border-t border-gray-200 flex justify-between text-sm bg-gray-50 rounded-b-2xl">
          <span>Total</span>
          <span class="font-bold text-primary">{{ formatRupiah(order.total_harga) }}</span>
        </div>
        <!-- Actions -->
        <div class="flex justify-end gap-2 px-6 pb-6 pt-2">
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition text-sm"
            type="button"
          >
            <AppIcon name="location-arrow" size="sm" /> Lacak Pesanan
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition text-sm"
            type="button"
          >
            <AppIcon name="receipt" size="sm" /> Invoice
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch, ref } from 'vue'
import OrderStatusBadge from './OrderStatusBadge.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'

const props = defineProps({
  modelValue: Boolean,
  order: Object
})
const emit = defineEmits(['update:modelValue'])

const dialogModel = ref(props.modelValue)
watch(() => props.modelValue, val => { dialogModel.value = val })
watch(dialogModel, val => { emit('update:modelValue', val) })

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
.text-primary {
  @apply text-orange-600;
}
.bg-primary {
  @apply bg-orange-500;
}
</style>