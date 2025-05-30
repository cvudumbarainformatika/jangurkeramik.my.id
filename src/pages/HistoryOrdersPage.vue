<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white shadow flex items-center border-b border-gray-500">
     <div class="flex items-center justify-between w-full px-2 py-3 mb-2 border-b border-gray-200">
      <div class="flex items-center ">
       <button
        @click="$router.back()"
        class="mr-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
        aria-label="Kembali"
        type="button"
      >
        <AppIcon name="arrow-left" size="sm" class="text-gray-600" />
      </button>
      <div class="text-sm font-bold">Riwayat Pesanan</div>
     </div>

      <div class="flex items-center justify-end mb-2 px-4 pt-2">
        <input
          v-model="search"
          type="text"
          placeholder="Cari No. Pesanan..."
          class="w-40 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-white"
        />
      </div>
     </div>
      <div class="w-full">
        
        <div class="overflow-x-auto no-scrollbar px-2 mb-4">
          <div class="inline-flex gap-2">
            <button
              v-for="s in statusList"
              :key="s.value"
              @click="status = s.value"
              :class="[
                'rounded-full px-4 py-1 text-sm whitespace-nowrap border transition',
                status === s.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              ]"
              type="button"
            >
              {{ s.label }}
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full max-w-2xl mx-auto p-0 sm:p-4 ">
      <!-- Search & Tab status (tetap di atas, tidak ikut scroll) -->
      
      <!-- List orders scrollable -->
      <div class="flex-1 overflow-y-auto space-y-3 px-2">
        <Transition>
          <div v-if="loading" class="pt-2 " key="skeleton">
            <SkeletonOrderCard v-for="n in 5" :key="n" class="mb-2"/>
          </div>
          
          <div v-else class="pt-2">

            <template v-if="filteredOrders.length">
              <OrderCard
                 v-for="item in filteredOrders" :key="item.id"
                :order="item"
                :auth="auth.user"
                @open-detail="openDetail(item)"
                @pembayaran="openPembayaran(item)"
                class="mb-1"
              />
            </template>

            <div v-else class="text-center text-gray-400 py-20">
                <AppIcon name="clock" size="xl" class="mx-auto mb-4 text-gray-300" />
                <div class="text-lg font-semibold text-gray-700 mb-2">Belum Ada Pesanan</div>
                <p class="text-gray-500 mb-6">Anda belum memiliki riwayat pesanan</p>
                <button 
                  @click="$router.push('/')" 
                  class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:shadow-md transition-all"
                >
                  Mulai Belanja
                </button>
            </div>
            
          </div>
        </Transition>
        <OrderDetailDialog v-model="showDetail" :order="selectedOrder" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useOrderStore } from 'src/stores/order-store'
import { useRouter } from 'vue-router'
// import { api } from 'src/boot/axios'
// import OrderStatusBadge from 'components/organisms/order/OrderStatusBadge.vue'

import OrderDetailDialog from 'components/organisms/order/OrderDetailDialog.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue';
import { storeToRefs } from 'pinia';


const OrderCard = defineAsyncComponent(() => import('components/organisms/order/OrderCard.vue'))
const SkeletonOrderCard = defineAsyncComponent(()=> import('src/components/organisms/order/SkeletonOrderCard.vue'))


 
const router = useRouter()
const auth = useAuthStore()
const orderStore = useOrderStore()
const { historyOrder } = orderStore
const { loading, orders, selectedOrder, showDetail } = storeToRefs(orderStore)


const search = ref('')
const status = ref('all')

const statusList = [
  { label: 'Semua', value: 'all' },
  { label: 'Diproses', value: '1' },
  { label: 'Dikirim', value: '2' },
  { label: 'Selesai', value: '3' },
  { label: 'Dibatalkan', value: '0' },
]

const filteredOrders = computed(() => {
  let list = orders.value
  if (status.value !== 'all') {
    list = list.filter(o => o.status_order === status.value)
  }
  if (search.value) {
    list = list.filter(o => o.kode?.toLowerCase().includes(search.value.toLowerCase()))
  }
  return list
})

 
function openDetail(item) {
  selectedOrder.value = item
  router.push(`/orders/${item?.noorder}`)
}
function openPembayaran(item) {
  selectedOrder.value = item
  router.push(`/orders/pembayaran/${item?.noorder}`)
}

// eslint-disable-next-line no-unused-vars
function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}

onMounted(async () => {
  Promise.all([
    historyOrder()
  ])
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
/* Untuk Safari/iOS */
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overscroll-behavior-x: contain;
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>