<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white shadow flex items-center ">
     <div class="flex items-center justify-between w-full px-2 py-3 mb-2">
      <div class="flex items-center ">
       <button
        @click="$router.back()"
        class="mr-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
        aria-label="Kembali"
        type="button"
      >
        <AppIcon name="arrow-left" size="sm" class="text-gray-600" />
      </button>
      <div class="text-lg font-bold">Riwayat Pesanan</div>
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
        <div v-if="loading" class="space-y-3 px-4">
          <div v-for="i in 3" :key="i" class="h-[90px] bg-gray-200 rounded-xl animate-pulse" />
        </div>
        <div v-else-if="filteredOrders.length === 0" class="text-center text-gray-400 py-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4" />
          </svg>
          <div>Belum ada pesanan.</div>
        </div>
        <div v-else class="pt-2">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="bg-white rounded-xl shadow flex items-center gap-3 p-3 cursor-pointer hover:ring-2 ring-primary transition mb-3"
            @click="openDetail(order)"
          >
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
            </div>
            <AppIcon name="chevron-right" size="md" class="text-gray-400" />
          </div>
        </div>
        <OrderDetailDialog v-model="showDetail" :order="selectedOrder" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import OrderStatusBadge from 'components/organisms/order/OrderStatusBadge.vue'
import OrderDetailDialog from 'components/organisms/order/OrderDetailDialog.vue'
import AppIcon from 'src/components/atoms/AppIcon.vue';

const orders = ref([])
const loading = ref(true)
const search = ref('')
const status = ref('all')
const showDetail = ref(false)
const selectedOrder = ref(null)

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

function openDetail(order) {
  selectedOrder.value = order
  showDetail.value = true
}

function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await api.get('/api/v2/order/penjualan/by-pelanggan')
    console.log('Data orders:', data);
    
    orders.value = data?.data || []
  } finally {
    loading.value = false
  }
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
.bg-primary {
  @apply bg-orange-500;
}
.text-primary {
  @apply text-orange-600;
}
.border-primary {
  @apply border-orange-500;
}
.ring-primary {
  @apply ring-orange-300;
}
</style>