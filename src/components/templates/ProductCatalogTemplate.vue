<template>
  <div>
    <AppNavbar :title="title" :logo="logo" :navItems="navItems" />
    
    <!-- Category Banner -->
    <div class="relative h-64 md:h-80 bg-gray-200 overflow-hidden">
      <img 
        :src="categoryBanner || '/images/banners/default-category.jpg'" 
        :alt="categoryTitle"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ categoryTitle }}</h1>
          <p class="text-white text-lg md:w-2/3">{{ categoryDescription }}</p>
        </div>
      </div>
    </div>
    
    <!-- Breadcrumbs -->
    <div class="bg-gray-100 py-3">
      <div class="container mx-auto px-4">
        <div class="flex items-center text-sm">
          <router-link to="/" class="text-gray-500 hover:text-primary">Beranda</router-link>
          <span class="mx-2 text-gray-400">/</span>
          <router-link to="/products" class="text-gray-500 hover:text-primary">Produk</router-link>
          <template v-if="categoryTitle !== 'Semua Produk'">
            <span class="mx-2 text-gray-400">/</span>
            <span class="text-primary">{{ categoryTitle }}</span>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-md p-5 sticky top-4">
            <h2 class="text-xl font-bold mb-6">Filter Produk</h2>
            
            <!-- Category Filter -->
            <AppProductFilter
              id="category"
              title="Kategori"
              type="checkbox"
              :options="[
                { label: 'Keramik Lantai', value: 'floor', count: 124 },
                { label: 'Keramik Dinding', value: 'wall', count: 98 },
                { label: 'Keramik Kamar Mandi', value: 'bathroom', count: 56 },
                { label: 'Keramik Dapur', value: 'kitchen', count: 42 },
                { label: 'Keramik Outdoor', value: 'outdoor', count: 38 },
                { label: 'Peralatan', value: 'tools', count: 65 }
              ]"
              v-model="filters.categories"
              @filter-change="applyFilters"
            />
            
            <!-- Price Range Filter -->
            <AppProductFilter
              id="price"
              title="Harga"
              type="range"
              :rangeMin="0"
              :rangeMax="1000000"
              :rangeStep="10000"
              v-model="filters.priceRange"
              :valueFormatter="(value) => `Rp ${formatPrice(value)}`"
              @filter-change="applyFilters"
            />
            
            <!-- Material Filter -->
            <AppProductFilter
              id="material"
              title="Material"
              type="checkbox"
              :options="[
                { label: 'Keramik', value: 'ceramic', count: 185 },
                { label: 'Granit', value: 'granite', count: 92 },
                { label: 'Porcelain', value: 'porcelain', count: 78 },
                { label: 'Marmer', value: 'marble', count: 45 },
                { label: 'Teraso', value: 'terrazzo', count: 23 }
              ]"
              v-model="filters.materials"
              @filter-change="applyFilters"
            />
            
            <!-- Size Filter -->
            <AppProductFilter
              id="size"
              title="Ukuran"
              type="button"
              :options="[
                { label: '30x30', value: '30x30' },
                { label: '40x40', value: '40x40' },
                { label: '60x60', value: '60x60' },
                { label: '30x60', value: '30x60' },
                { label: '20x120', value: '20x120' },
                { label: '80x80', value: '80x80' }
              ]"
              v-model="filters.sizes"
              @filter-change="applyFilters"
            />
            
            <!-- Color Filter -->
            <AppProductFilter
              id="color"
              title="Warna"
              type="color"
              :options="[
                { label: 'Putih', value: 'white', color: '#ffffff' },
                { label: 'Hitam', value: 'black', color: '#000000' },
                { label: 'Abu-abu', value: 'gray', color: '#808080' },
                { label: 'Coklat', value: 'brown', color: '#8B4513' },
                { label: 'Krem', value: 'cream', color: '#F5F5DC' },
                { label: 'Biru', value: 'blue', color: '#1E90FF' }
              ]"
              v-model="filters.colors"
              @filter-change="applyFilters"
            />
            
            <!-- Clear All Filters -->
            <div class="mt-6 pt-4 border-t">
              <button 
                class="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                @click="clearAllFilters"
              >
                Hapus Semua Filter
              </button>
            </div>
          </div>
        </div>
        
        <!-- Product Grid -->
        <div class="lg:w-3/4">
          <!-- Sorting and View Options -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div class="text-gray-600">
              Menampilkan <span class="font-medium">{{ products.length }}</span> produk
            </div>
            
            <div class="flex items-center gap-4">
              <!-- Sort Options -->
              <div class="relative">
                <select 
                  v-model="sortOption"
                  class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  @change="sortProducts"
                >
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                  <option value="popular">Popularitas</option>
                  <option value="rating">Rating</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <AppIcon name="chevron-down" size="sm" color="gray" />
                </div>
              </div>
              
              <!-- View Mode -->
              <div class="flex border border-gray-300 rounded-md overflow-hidden">
                <button 
                  class="p-2 transition"
                  :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
                  @click="viewMode = 'grid'"
                >
                  <AppIcon name="grid" size="sm" />
                </button>
                <button 
                  class="p-2 transition"
                  :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
                  @click="viewMode = 'list'"
                >
                  <AppIcon name="list" size="sm" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="mb-6 flex flex-wrap gap-2">
            <div 
              v-for="(filter, key) in activeFilters" 
              :key="key"
              class="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
            >
              <span class="mr-1">{{ filter.label }}:</span>
              <span class="font-medium">{{ filter.value }}</span>
              <button class="ml-2 text-gray-500 hover:text-red-500" @click="removeFilter(key)">
                <AppIcon name="close" size="xs" />
              </button>
            </div>
          </div>
          
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(product, index) in products" :key="index" 
              class="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
              <!-- Product Image with Quick View -->
              <div class="relative overflow-hidden">
                <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                
                <!-- Badges -->
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span v-if="product.isNew" class="bg-primary text-white text-xs px-2 py-1 rounded">Baru</span>
                  <span v-if="product.discount" class="bg-red-500 text-white text-xs px-2 py-1 rounded">-{{ product.discount }}%</span>
                </div>
                
                <!-- Quick Actions -->
                <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="flex gap-2">
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <AppIcon name="search" size="sm" />
                    </button>
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <AppIcon name="heart" size="sm" />
                    </button>
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <AppIcon name="cart" size="sm" />
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="p-4">
                <div class="text-sm text-gray-500 mb-1">{{ product.category }}</div>
                <h3 class="font-medium text-lg mb-2 group-hover:text-primary transition">{{ product.name }}</h3>
                
                <!-- Rating -->
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400">
                    <AppIcon v-for="i in 5" :key="i" :name="i <= product.rating ? 'star-filled' : 'star'" size="sm" />
                  </div>
                  <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount }})</span>
                </div>
                
                <div class="mt-auto">
                  <div class="flex items-center justify-between">
                    <div>
                      <span v-if="product.discount" class="text-gray-400 line-through text-sm mr-2">Rp {{ formatPrice(product.originalPrice) }}</span>
                      <span class="text-primary font-bold">Rp {{ formatPrice(product.price) }}</span>
                    </div>
                    
                    <div class="text-xs text-gray-500">
                      {{ product.size }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- List View -->
          <div v-else class="space-y-4">
            <div v-for="(product, index) in products" :key="index" 
              class="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl flex flex-col sm:flex-row">
              <!-- Product Image -->
              <div class="relative sm:w-1/3">
                <img :src="product.image" :alt="product.name" class="w-full h-64 sm:h-full object-cover">
                
                <!-- Badges -->
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span v-if="product.isNew" class="bg-primary text-white text-xs px-2 py-1 rounded">Baru</span>
                  <span v-if="product.discount" class="bg-red-500 text-white text-xs px-2 py-1 rounded">-{{ product.discount }}%</span>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="p-4 sm:w-2/3 flex flex-col">
                <div class="text-sm text-gray-500 mb-1">{{ product.category }}</div>
                <h3 class="font-medium text-xl mb-2 group-hover:text-primary transition">{{ product.name }}</h3>
                
                <!-- Rating -->
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400">
                    <AppIcon v-for="i in 5" :key="i" :name="i <= product.rating ? 'star-filled' : 'star'" size="sm" />
                  </div>
                  <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount }})</span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ product.description || 'Keramik berkualitas tinggi dengan desain modern yang cocok untuk berbagai ruangan.' }}</p>
                
                <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span v-if="product.discount" class="text-gray-400 line-through text-sm mr-2">Rp {{ formatPrice(product.originalPrice) }}</span>
                    <span class="text-primary font-bold text-xl">Rp {{ formatPrice(product.price) }}</span>
                    <span class="text-sm text-gray-500 ml-2">{{ product.size }}</span>
                  </div>
                  
                  <div class="flex gap-2">
                    <button class="bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition flex items-center">
                      <AppIcon name="heart" size="sm" class="mr-1" />
                      <span>Wishlist</span>
                    </button>
                    <button class="bg-primary text-white px-3 py-2 rounded hover:bg-primary-dark transition flex items-center">
                      <AppIcon name="cart" size="sm" class="mr-1" />
                      <span>Tambah ke Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="mt-8 flex justify-center">
            <div class="flex">
              <button 
                class="px-3 py-1 border border-gray-300 rounded-l-md bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <AppIcon name="chevron-left" size="sm" />
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                class="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                :class="{ 'bg-primary text-white': page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              
              <button 
                class="px-3 py-1 border border-gray-300 rounded-r-md bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <AppIcon name="chevron-right" size="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recently Viewed -->
    <div class="bg-gray-100 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6">Baru Dilihat</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow p-2 hover:shadow-md transition-shadow">
            <div class="relative">
              <img src="https://via.placeholder.com/150" alt="Product" class="w-full h-32 object-cover rounded">
              <div class="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-tl">
                Rp 185.000
              </div>
            </div>
            <div class="mt-2 text-sm font-medium truncate">Keramik Premium {{ i }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <AppFooter 
      :title="title"
      :logo="logo"
      :description="footerDescription"
      :socialLinks="socialLinks"
      :linkSections="footerLinkSections"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppNavbar from '../organisms/AppNavbar.vue';
import AppFooter from '../organisms/AppFooter.vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppProductFilter from '../organisms/AppProductFilter.vue';

// Props
defineProps({
  title: {
    type: String,
    default: 'Jangur Keramik'
  },
  logo: {
    type: String,
    default: ''
  },
  navItems: {
    type: Array,
    default: () => []
  },
  categoryTitle: {
    type: String,
    default: 'Keramik Lantai'
  },
  categoryDescription: {
    type: String,
    default: 'Koleksi keramik lantai premium untuk rumah Anda'
  },
  categoryBanner: {
    type: String,
    default: 'https://via.placeholder.com/1200x400'
  },
  footerDescription: {
    type: String,
    default: 'Solusi keramik berkualitas untuk rumah dan bangunan Anda.'
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  footerLinkSections: {
    type: Array,
    default: () => []
  }
});

// Data
const viewMode = ref('grid');
const sortOption = ref('newest');
const currentPage = ref(1);
const totalPages = 5;

// Filters
const filters = ref({
  categories: [],
  priceRange: [0, 1000000],
  materials: [],
  sizes: [],
  colors: []
});

// Computed
const hasActiveFilters = computed(() => {
  return filters.value.categories.length > 0 || 
         filters.value.materials.length > 0 || 
         filters.value.sizes.length > 0 || 
         filters.value.colors.length > 0 || 
         filters.value.priceRange[0] > 0 || 
         filters.value.priceRange[1] < 1000000;
});

const activeFilters = computed(() => {
  const result = {};
  
  if (filters.value.categories.length > 0) {
    result.categories = {
      label: 'Kategori',
      value: filters.value.categories.join(', ')
    };
  }
  
  if (filters.value.materials.length > 0) {
    result.materials = {
      label: 'Material',
      value: filters.value.materials.join(', ')
    };
  }
  
  if (filters.value.sizes.length > 0) {
    result.sizes = {
      label: 'Ukuran',
      value: filters.value.sizes.join(', ')
    };
  }
  
  if (filters.value.colors.length > 0) {
    result.colors = {
      label: 'Warna',
      value: filters.value.colors.join(', ')
    };
  }
  
  if (filters.value.priceRange[0] > 0 || filters.value.priceRange[1] < 1000000) {
    result.price = {
      label: 'Harga',
      value: `Rp ${formatPrice(filters.value.priceRange[0])} - Rp ${formatPrice(filters.value.priceRange[1])}`
    };
  }
  
  return result;
});

// Sample products data
const products = [
  {
    id: 1,
    name: 'Keramik Granit Putih Premium',
    category: 'Keramik Lantai',
    image: 'https://via.placeholder.com/400x400',
    price: 185000,
    originalPrice: 220000,
    discount: 15,
    isNew: true,
    rating: 4.5,
    reviewCount: 12,
    size: '60x60 cm',
    description: 'Keramik granit putih dengan kualitas premium, tahan gores dan mudah dibersihkan. Cocok untuk ruang tamu dan area dengan lalu lintas tinggi.'
  },
  {
    id: 2,
    name: 'Keramik Marmer Hitam Elegan',
    category: 'Keramik Lantai',
    image: 'https://via.placeholder.com/400x400',
    price: 250000,
    originalPrice: 250000,
    discount: 0,
    isNew: false,
    rating: 5,
    reviewCount: 8,
    size: '80x80 cm',
    description: 'Keramik motif marmer hitam dengan tampilan elegan dan mewah. Memberikan kesan mewah pada ruangan Anda.'
  },
  {
    id: 3,
    name: 'Keramik Dinding Putih Glossy',
    category: 'Keramik Dinding',
    image: 'https://via.placeholder.com/400x400',
    price: 125000,
    originalPrice: 145000,
    discount: 14,
    isNew: true,
    rating: 4.2,
    reviewCount: 15,
    size: '30x60 cm',
    description: 'Keramik dinding putih dengan finishing glossy yang memberikan kesan bersih dan luas pada ruangan.'
  },
  {
    id: 4,
    name: 'Keramik Motif Kayu Jati',
    category: 'Keramik Lantai',
    image: 'https://via.placeholder.com/400x400',
    price: 195000,
    originalPrice: 195000,
    discount: 0,
    isNew: false,
    rating: 4.7,
    reviewCount: 23,
    size: '20x120 cm',
    description: 'Keramik dengan motif kayu jati yang sangat mirip dengan kayu asli. Tahan air dan lebih awet dibanding kayu.'
  },
  {
    id: 5,
    name: 'Keramik Kamar Mandi Anti Slip',
    category: 'Keramik Kamar Mandi',
    image: 'https://via.placeholder.com/400x400',
    price: 145000,
    originalPrice: 165000,
    discount: 12,
    isNew: false,
    rating: 4.8,
    reviewCount: 19,
    size: '40x40 cm',
    description: 'Keramik khusus kamar mandi dengan permukaan anti slip untuk keamanan. Tahan air dan jamur.'
  },
  {
    id: 6,
    name: 'Keramik Dapur Motif Geometris',
    category: 'Keramik Dapur',
    image: 'https://via.placeholder.com/400x400',
    price: 165000,
    originalPrice: 185000,
    discount: 11,
    isNew: true,
    rating: 4.3,
    reviewCount: 7,
    size: '30x30 cm',
    description: 'Keramik dapur dengan motif geometris modern. Tahan panas dan mudah dibersihkan dari noda minyak.'
  }
];

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

const applyFilters = () => {
  // Implementasi filter produk
  console.log('Applying filters:', filters.value);
  // Reset ke halaman pertama saat filter berubah
  currentPage.value = 1;
};

const clearAllFilters = () => {
  filters.value = {
    categories: [],
    priceRange: [0, 1000000],
    materials: [],
    sizes: [],
    colors: []
  };
  applyFilters();
};

const removeFilter = (key) => {
  if (key === 'price') {
    filters.value.priceRange = [0, 1000000];
  } else {
    filters.value[key] = [];
  }
  applyFilters();
};

const sortProducts = () => {
  // Implementasi sorting produk
  console.log('Sorting by:', sortOption.value);
};

const goToPage = (page) => {
  currentPage.value = page;
  // Implementasi pagination
  console.log('Going to page:', page);
};
</script>

<script>
/**
 * @component ProductCatalogTemplate
 * @description Template untuk halaman katalog produk dengan filter, sorting, dan grid produk
 * @example
 * <ProductCatalogTemplate
 *   categoryTitle="Keramik Lantai"
 *   categoryDescription="Koleksi keramik lantai premium untuk rumah Anda"
 *   categoryBanner="/images/banners/floor-tiles.jpg"
 * />
 */
</script>
