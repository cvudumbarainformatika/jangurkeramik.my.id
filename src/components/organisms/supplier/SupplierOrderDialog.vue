<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-auto" @keydown.esc="close">
    <div class="flex flex-row items-center justify-center min-h-screen p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

      <!-- Dialog Content -->
      <div
        class="relative bg-white w-full mx-auto rounded-lg shadow-xl max-h-[90vh] overflow-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="bg-primary text-white p-4 flex items-center justify-between rounded-t-lg">
          <div class="text-xl font-medium">Pesanan Melalui Supplier</div>
          <button
            class="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
          <!-- Left Section - Supplier Search and List -->
          <div class="w-full md:w-2/3 p-4 overflow-y-auto">
            <!-- Info Banner -->
            <div
              v-if="!selectedSupplier"
              class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r shadow-sm"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <div class="text-blue-800 font-medium">Informasi Pembelian</div>
                  <p class="text-blue-700 text-sm mt-1">
                    Saat ini Jangur Keramik belum menerima pembelian langsung. Anda perlu melakukan
                    pemesanan melalui supplier resmi kami. Silahkan pilih supplier yang tersedia
                    untuk melanjutkan pesanan Anda.
                  </p>
                </div>
              </div>
            </div>

            <!-- Search -->
            <div v-if="!selectedSupplier" class="mb-4">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari supplier berdasarkan nama atau lokasi..."
                  class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Filters -->
            <div v-if="!selectedSupplier" class="flex flex-wrap mb-4 gap-2">
              <button
                @click="filter = 'all'"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Semua
              </button>
              <button
                @click="filter = 'terdekat'"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === 'terdekat'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Terdekat
              </button>
              <button
                @click="filter = 'rating'"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === 'rating'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Rating Tertinggi
              </button>
              <button
                @click="filter = 'promo'"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === 'promo'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Ada Promo
              </button>
            </div>

            <!-- Supplier List or Detail -->
            <SupplierDetail
              v-if="selectedSupplier"
              :supplier="selectedSupplier"
              @back="selectedSupplier = null"
            />

            <div v-else>
              <!-- Empty State -->
              <div
                v-if="filteredSuppliers.length === 0"
                class="flex flex-col items-center justify-center py-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-gray-500 mt-4 text-center">
                  Supplier tidak ditemukan. Silahkan coba kata kunci lain.
                </p>
              </div>

              <!-- Supplier Cards -->
              <div v-else class="space-y-3">
                <SupplierCard
                  v-for="supplier in filteredSuppliers"
                  :key="supplier.id"
                  :supplier="supplier"
                  @click="selectSupplier"
                />
              </div>
            </div>
          </div>

          <!-- Right Section - Order Summary -->
          <div class="w-full md:w-1/3 p-4">
            <OrderSummary
              :cart-items="cartItems"
              :shipping-cost="shippingCost"
              :has-supplier="!!selectedSupplier"
              @shop="close"
              @checkout="proceedToCheckout"
              @close="close"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SupplierCard from './SupplierCard.vue'
import SupplierDetail from './SupplierDetail.vue'
import OrderSummary from './OrderSummary.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'checkout'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// State
const searchQuery = ref('')
const filter = ref('all')
const selectedSupplier = ref(null)
const shippingCost = ref(0)

// Mock data untuk demonstrasi
const suppliersList = ref([
  {
    id: 1,
    name: 'SupplierTrust Indonesia',
    logo: 'https://placehold.co/200x200?text=ST',
    isOfficial: true,
    rating: 4.8,
    reviewCount: 1254,
    location: 'Jakarta Selatan',
    fullAddress: 'Jl. Kemang Raya No. 15, Jakarta Selatan 12730',
    distance: 3.5,
    shippingTime: 'Pengiriman 1-2 hari',
    hasPromo: true,
    promoDescription: 'Diskon 10% untuk pembelian pertama dengan minimum transaksi Rp 2.000.000',
    phone: '(021) 7654-3210',
    email: 'cs@suppliertrust.co.id',
    description:
      'SupplierTrust Indonesia adalah distributor resmi produk keramik premium dengan pengalaman lebih dari 10 tahun. Kami menyediakan berbagai keramik berkualitas tinggi dengan harga kompetitif dan pelayanan terbaik untuk kepuasan pelanggan.',
    minOrder: 'Rp 1.000.000',
    operationalHours: 'Senin-Jumat 08.00-17.00, Sabtu 08.00-15.00',
    paymentMethods: 'Transfer Bank, Virtual Account, QRIS',
    returnPolicy: 'Pengembalian barang dalam 7 hari jika terdapat kerusakan dari pihak supplier',
    products: [
      {
        id: 101,
        name: 'Keramik Granit 60x60',
        category: 'Keramik Lantai',
        image: 'https://placehold.co/300x300?text=Granit',
        price: 185000,
        stock: 500,
      },
      {
        id: 102,
        name: 'Keramik Dinding Kamar Mandi',
        category: 'Keramik Dinding',
        image: 'https://placehold.co/300x300?text=Dinding',
        price: 135000,
        stock: 350,
      },
      {
        id: 103,
        name: 'Keramik Mozaik Dekoratif',
        category: 'Keramik Dekorasi',
        image: 'https://placehold.co/300x300?text=Mozaik',
        price: 225000,
        stock: 120,
      },
    ],
    reviews: [
      {
        id: 1,
        userName: 'Ahmad Rizki',
        userAvatar: 'https://placehold.co/100x100?text=AR',
        rating: 5,
        comment: 'Pengiriman cepat dan produk berkualitas tinggi. Sangat memuaskan!',
        date: '2 minggu lalu',
      },
      {
        id: 2,
        userName: 'Maya Sari',
        userAvatar: 'https://placehold.co/100x100?text=MS',
        rating: 4,
        comment: 'Pelayanan baik, responsif terhadap pertanyaan. Akan belanja lagi.',
        date: '1 bulan lalu',
      },
    ],
    shippingOptions: [
      { name: 'Reguler', estimatedTime: '2-3 hari', cost: 150000 },
      { name: 'Express', estimatedTime: '1 hari', cost: 250000 },
      { name: 'Ekonomi', estimatedTime: '3-5 hari', cost: 100000 },
    ],
    coverageAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Bandung'],
  },
  {
    id: 2,
    name: 'Mega Keramik Distribusi',
    logo: 'https://placehold.co/200x200?text=MK',
    isOfficial: true,
    rating: 4.6,
    reviewCount: 876,
    location: 'Bandung',
    fullAddress: 'Jl. Soekarno-Hatta No. 123, Bandung 40292',
    distance: 8.2,
    shippingTime: 'Pengiriman 2-3 hari',
    hasPromo: false,
    phone: '(022) 8765-4321',
    email: 'contact@megakeramik.co.id',
    description:
      'Mega Keramik Distribusi merupakan distributor berbagai produk keramik berkualitas dari berbagai merek terkemuka di Indonesia. Kami menawarkan harga yang kompetitif dengan jaminan kualitas terbaik.',
    minOrder: 'Rp 2.000.000',
    operationalHours: 'Senin-Sabtu 08.00-16.00',
    paymentMethods: 'Transfer Bank, Kartu Kredit, Cicilan 0%',
    returnPolicy: 'Garansi 14 hari untuk produk cacat',
    products: [
      {
        id: 201,
        name: 'Keramik Granite Marble 80x80',
        category: 'Keramik Premium',
        image: 'https://placehold.co/300x300?text=Marble',
        price: 350000,
        stock: 200,
      },
      {
        id: 202,
        name: 'Keramik Lantai Kayu 15x60',
        category: 'Keramik Motif Kayu',
        image: 'https://placehold.co/300x300?text=Kayu',
        price: 165000,
        stock: 450,
      },
    ],
    reviews: [
      {
        id: 1,
        userName: 'Budi Santoso',
        userAvatar: 'https://placehold.co/100x100?text=BS',
        rating: 5,
        comment: 'Produk sangat bagus dan sesuai ekspektasi. Pengiriman juga tepat waktu.',
        date: '3 minggu lalu',
      },
      {
        id: 2,
        userName: 'Dewi Anggraini',
        userAvatar: 'https://placehold.co/100x100?text=DA',
        rating: 4,
        comment: 'Pelayanan memuaskan, keramik datang dalam kondisi baik. Thanks!',
        date: '2 bulan lalu',
      },
    ],
    shippingOptions: [
      { name: 'Reguler', estimatedTime: '2-3 hari', cost: 175000 },
      { name: 'Express', estimatedTime: '1-2 hari', cost: 275000 },
    ],
    coverageAreas: ['Jakarta', 'Bandung', 'Cimahi', 'Sumedang', 'Garut', 'Tasikmalaya'],
  },
  {
    id: 3,
    name: 'Prima Ceramic Supply',
    logo: 'https://placehold.co/200x200?text=PC',
    isOfficial: false,
    rating: 4.3,
    reviewCount: 532,
    location: 'Surabaya',
    fullAddress: 'Jl. Raya Darmo No. 45, Surabaya 60264',
    distance: 15.7,
    shippingTime: 'Pengiriman 3-5 hari',
    hasPromo: true,
    promoDescription: 'Gratis ongkir untuk pembelian di atas Rp 5.000.000',
    phone: '(031) 9876-5432',
    email: 'info@primaceramic.co.id',
    description:
      'Prima Ceramic Supply fokus pada penyediaan keramik untuk proyek konstruksi dengan harga grosir yang kompetitif. Kami melayani pengiriman ke seluruh Indonesia dengan armada sendiri untuk memastikan keamanan produk.',
    minOrder: 'Rp 3.000.000',
    operationalHours: 'Senin-Jumat 08.30-16.30',
    paymentMethods: 'Transfer Bank, COD untuk area tertentu',
    returnPolicy: 'Pengembalian barang dalam 10 hari dengan syarat dan ketentuan',
    products: [
      {
        id: 301,
        name: 'Keramik Anti Slip 40x40',
        category: 'Keramik Eksterior',
        image: 'https://placehold.co/300x300?text=AntiSlip',
        price: 145000,
        stock: 750,
      },
      {
        id: 302,
        name: 'Keramik Border 10x40',
        category: 'Keramik Aksen',
        image: 'https://placehold.co/300x300?text=Border',
        price: 95000,
        stock: 320,
      },
    ],
    reviews: [
      {
        id: 1,
        userName: 'Hendra Wijaya',
        userAvatar: 'https://placehold.co/100x100?text=HW',
        rating: 4,
        comment: 'Pelayanan cukup baik, produk sesuai dengan deskripsi.',
        date: '1 bulan lalu',
      },
      {
        id: 2,
        userName: 'Siti Rahma',
        userAvatar: 'https://placehold.co/100x100?text=SR',
        rating: 5,
        comment: 'Sangat puas dengan layanan dan kualitas produk!',
        date: '2 bulan lalu',
      },
    ],
    shippingOptions: [
      { name: 'Reguler', estimatedTime: '3-5 hari', cost: 200000 },
      { name: 'Ekonomi', estimatedTime: '6-8 hari', cost: 150000 },
    ],
    coverageAreas: ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik', 'Mojokerto', 'Jombang'],
  },
])

// Mock data untuk keranjang belanja
const cartItems = ref([
  {
    id: 1,
    name: 'Keramik Granit 60x60 Putih',
    image: 'https://placehold.co/300x300?text=Granit',
    price: 185000,
    quantity: 5,
  },
  {
    id: 2,
    name: 'Keramik Dinding Kamar Mandi',
    image: 'https://placehold.co/300x300?text=Dinding',
    price: 135000,
    quantity: 3,
  },
  {
    id: 3,
    name: 'Keramik Mozaik Dekoratif',
    image: 'https://placehold.co/300x300?text=Mozaik',
    price: 225000,
    quantity: 2,
  },
])

// Filter supplier berdasarkan pencarian dan filter
const filteredSuppliers = computed(() => {
  let result = [...suppliersList.value]

  // Filter berdasarkan pencarian
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.location.toLowerCase().includes(query),
    )
  }

  // Filter berdasarkan kategori
  if (filter.value === 'terdekat') {
    result = result.sort((a, b) => (a.distance || 9999) - (b.distance || 9999))
  } else if (filter.value === 'rating') {
    result = result.sort((a, b) => b.rating - a.rating)
  } else if (filter.value === 'promo') {
    result = result.filter((supplier) => supplier.hasPromo)
  }

  return result
})

// Methods
const selectSupplier = (supplier) => {
  selectedSupplier.value = supplier

  // Set biaya pengiriman default ke opsi pengiriman pertama
  if (supplier.shippingOptions && supplier.shippingOptions.length > 0) {
    shippingCost.value = supplier.shippingOptions[0].cost
  }
}

const proceedToCheckout = async () => {
  if (!selectedSupplier.value) return

  try {
    // Di sini bisa diimplementasikan API call untuk proses checkout
    // Untuk contoh kita hanya emit event checkout dengan data pesanan
    emit('checkout', {
      supplier: selectedSupplier.value,
      items: cartItems.value,
      shipping: selectedSupplier.value.shippingOptions.find(
        (option) => option.cost === shippingCost.value,
      ),
      total: getTotalAmount(),
    })

    // Tutup dialog setelah checkout berhasil
    close()
  } catch (error) {
    console.error('Error during checkout:', error)
  }
}

const getTotalAmount = () => {
  const subtotal = cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const tax = subtotal * 0.11 // PPN 11%

  return subtotal + tax + shippingCost.value
}

const close = () => {
  isOpen.value = false
  emit('close')

  // Reset state setelah dialog tertutup
  setTimeout(() => {
    searchQuery.value = ''
    filter.value = 'all'
    selectedSupplier.value = null
  }, 300)
}

// Watch for changes in dialog visibility
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      // Reset filter when dialog opens
      filter.value = 'all'
    }
  },
)
</script>

<style scoped>
/* Styling khusus untuk dialog jika diperlukan */
</style>
