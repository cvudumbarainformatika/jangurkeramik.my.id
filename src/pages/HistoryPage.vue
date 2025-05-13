<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <div class="sticky top-0 z-10 px-4 pt-10 pb-4 bg-white shadow-sm">
      <div class="flex items-center">
        <div class="text-xl font-bold">Riwayat Pesanan</div>
      </div>
    </div>
    
    <div class="container mx-auto px-4 py-6">
      <!-- Empty State -->
      <div v-if="orders.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm">
        <AppIcon name="clock" size="xl" class="mx-auto mb-4 text-gray-300" />
        <div class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Pesanan</div>
        <p class="text-gray-500 mb-6">Anda belum memiliki riwayat pesanan</p>
        <button 
          @click="$router.push('/products')" 
          class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-md transition-all"
        >
          Mulai Belanja
        </button>
      </div>
      
      <!-- Order List -->
      <div v-else class="space-y-4">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <!-- Order Header -->
          <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <div class="text-sm text-gray-500">Order #{{ order.id }}</div>
              <div class="text-sm font-medium">{{ formatDate(order.date) }}</div>
            </div>
            <div 
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                getStatusClass(order.status)
              ]"
            >
              {{ getStatusLabel(order.status) }}
            </div>
          </div>
          
          <!-- Order Items -->
          <div class="p-4">
            <div class="flex items-center gap-3 mb-3">
              <!-- Product thumbnails -->
              <div class="flex -space-x-2">
                <div 
                  v-for="(item, index) in order.items.slice(0, 3)" 
                  :key="index" 
                  class="w-10 h-10 rounded-lg overflow-hidden border-2 border-white"
                >
                  <img 
                    :src="item.image || 'https://via.placeholder.com/40x40/f97316/ffffff?text=P'" 
                    :alt="item.name" 
                    class="w-full h-full object-cover"
                  >
                </div>
                <div 
                  v-if="order.items.length > 3" 
                  class="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                >
                  +{{ order.items.length - 3 }}
                </div>
              </div>
              
              <div class="flex-1">
                <div class="text-sm font-medium">{{ order.items.length }} produk</div>
                <div class="text-xs text-gray-500">Total: Rp {{ formatPrice(order.total) }}</div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-2 mt-3">
              <button 
                class="flex-1 py-2 px-3 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Detail
              </button>
              <button 
                v-if="order.status === 'delivered'"
                class="flex-1 py-2 px-3 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                Beli Lagi
              </button>
              <button 
                v-if="order.status === 'processing'"
                class="flex-1 py-2 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                Lacak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppIcon from '../components/atoms/AppIcon.vue';

// Simulasi data pesanan
const orders = ref([
  {
    id: 'ORD-2023-001',
    date: new Date(2023, 6, 15),
    status: 'delivered',
    total: 750000,
    items: [
      { 
        id: 1, 
        name: 'Keramik Lantai Granit 60x60', 
        image: 'https://via.placeholder.com/800x1200/f97316/ffffff?text=Product+Image' 
      },
      { 
        id: 2, 
        name: 'Keramik Dinding 25x40', 
        image: 'https://via.placeholder.com/800x1200/3b82f6/ffffff?text=Product+Image' 
      }
    ]
  },
  {
    id: 'ORD-2023-002',
    date: new Date(2023, 7, 3),
    status: 'processing',
    total: 1250000,
    items: [
      { 
        id: 3, 
        name: 'Keramik Kamar Mandi 30x30', 
        image: 'https://via.placeholder.com/800x1200/6366f1/ffffff?text=Product+Image' 
      },
      { 
        id: 4, 
        name: 'Keramik Dapur 40x40', 
        image: 'https://via.placeholder.com/800x1200/a855f7/ffffff?text=Product+Image' 
      },
      { 
        id: 5, 
        name: 'Keramik Teras 40x40', 
        image: 'https://via.placeholder.com/800x1200/ec4899/ffffff?text=Product+Image' 
      },
      { 
        id: 6, 
        name: 'Keramik Kolam 20x20', 
        image: 'https://via.placeholder.com/800x1200/14b8a6/ffffff?text=Product+Image' 
      }
    ]
  }
]);

// Format tanggal
function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Format harga
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0);
}

// Mendapatkan label status
function getStatusLabel(status) {
  const labels = {
    'pending': 'Menunggu Pembayaran',
    'processing': 'Diproses',
    'shipped': 'Dikirim',
    'delivered': 'Selesai',
    'cancelled': 'Dibatalkan'
  };
  
  return labels[status] || status;
}

// Mendapatkan class untuk status
function getStatusClass(status) {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return classes[status] || 'bg-gray-100 text-gray-800';
}
</script>