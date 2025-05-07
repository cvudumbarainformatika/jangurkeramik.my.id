<template>
  <div class="container mx-auto py-4 pb-12">
    <!-- Desktop Layout -->
    <div class="desktop-only-flex flex-row gap-8">
      <!-- Sidebar Filter (Left) - Sticky -->
      <div class="w-1/4">
        <div class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <AppProductFilter 
            v-model:filters="filters"
            :categories="filterOptions.categories"
            :materials="filterOptions.materials"
            :sizes="filterOptions.sizes"
            :colors="filterOptions.colors"
            @apply="applyFilters"
            @reset="resetFilters"
            @clear-filter="clearFilter"
          />
        </div>
      </div>
      
      <!-- Product Grid (Right) -->
      <div class="w-3/4">
        <AppProductGrid 
          :title="pageTitle"
          :subtitle="pageSubtitle"
          :products="paginatedProducts"
          :view-mode="viewMode"
          :active-filters="activeFiltersFormatted"
          :current-page="currentPage"
          :total-pages="totalPages"
          @sort="sortProducts"
          @view-mode-change="changeViewMode"
          @clear-filter="clearFilter"
          @clear-all-filters="resetFilters"
          @page-change="changePage"
        />
      </div>
    </div>
    
    <!-- Mobile Layout -->
    <div class="desktop-hidden">
      <AppProductGrid 
        :title="pageTitle"
        :subtitle="pageSubtitle"
        :products="paginatedProducts"
        :view-mode="viewMode"
        :active-filters="activeFiltersFormatted"
        :current-page="currentPage"
        :total-pages="totalPages"
        @sort="sortProducts"
        @view-mode-change="changeViewMode"
        @clear-filter="clearFilter"
        @clear-all-filters="resetFilters"
        @page-change="changePage"
      />
      
      <!-- Mobile Filter Button -->
      <button 
        @click="showMobileFilter = true"
        class="fixed bottom-4 left-4 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200"
      >
        <AppIcon name="filter" class="text-orange-500" />
      </button>
    </div>
    
    <!-- Mobile Filter Drawer -->
    <div 
      v-if="showMobileFilter" 
      class="fixed inset-0 bg-black/50 z-50 flex items-end mobile-only"
      @click.self="showMobileFilter = false"
    >
      <div class="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto p-4 animate-slide-up">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Filter</h2>
          <AppIconButton 
            icon="x" 
            @click="showMobileFilter = false"
            customClass="rounded-full hover:bg-gray-100"
          />
        </div>
        
        <AppProductFilter 
          v-model:filters="filters"
          :categories="filterOptions.categories"
          :materials="filterOptions.materials"
          :sizes="filterOptions.sizes"
          :colors="filterOptions.colors"
          @apply="applyFiltersAndCloseDrawer"
          @reset="resetFilters"
          @clear-filter="clearFilter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';
import AppProductFilter from '../organisms/AppProductFilter.vue';
import AppProductGrid from '../organisms/AppProductGrid.vue';

// Props
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Koleksi Keramik'
  },
  pageSubtitle: {
    type: String,
    default: 'Temukan koleksi keramik berkualitas tinggi untuk rumah Anda'
  }
});

// State
const showMobileFilter = ref(true);
const viewMode = ref('grid');
const currentPage = ref(1);
const itemsPerPage = ref(12);
const sortBy = ref('newest');

const filters = ref({
  categories: [],
  materials: [],
  sizes: [],
  colors: [],
  priceRange: [0, 1000000]
});

// Sample data for filters
const filterOptions = {
  categories: [
    { label: 'Lantai', value: 'floor', count: 45 },
    { label: 'Dinding', value: 'wall', count: 32 },
    { label: 'Dekorasi', value: 'decoration', count: 18 },
    { label: 'Outdoor', value: 'outdoor', count: 12 },
    { label: 'Kamar Mandi', value: 'bathroom', count: 24 },
    { label: 'Dapur', value: 'kitchen', count: 16 }
  ],
  materials: [
    { label: 'Porselen', value: 'porcelain', count: 38 },
    { label: 'Keramik', value: 'ceramic', count: 42 },
    { label: 'Marmer', value: 'marble', count: 15 },
    { label: 'Granit', value: 'granite', count: 22 },
    { label: 'Terracotta', value: 'terracotta', count: 8 }
  ],
  sizes: [
    { label: '30x30', value: '30x30' },
    { label: '40x40', value: '40x40' },
    { label: '60x60', value: '60x60' },
    { label: '80x80', value: '80x80' },
    { label: '30x60', value: '30x60' },
    { label: '60x120', value: '60x120' }
  ],
  colors: [
    { label: 'Putih', value: 'white', hex: '#ffffff' },
    { label: 'Hitam', value: 'black', hex: '#000000' },
    { label: 'Abu-abu', value: 'gray', hex: '#808080' },
    { label: 'Coklat', value: 'brown', hex: '#8B4513' },
    { label: 'Krem', value: 'cream', hex: '#FFFDD0' },
    { label: 'Biru', value: 'blue', hex: '#1E90FF' },
    { label: 'Hijau', value: 'green', hex: '#228B22' },
    { label: 'Merah', value: 'red', hex: '#B22222' }
  ]
};

// Sample product data
const products = ref([
  {
    id: 1,
    name: 'Keramik Lantai Marmer Putih',
    category: 'Lantai',
    price: 185000,
    discountPrice: 165000,
    discount: 10,
    rating: 4.5,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Keramik Dinding Motif Geometris',
    category: 'Dinding',
    price: 210000,
    discountPrice: null,
    discount: 0,
    rating: 4.2,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Keramik Kamar Mandi Anti Slip',
    category: 'Kamar Mandi',
    price: 175000,
    discountPrice: 140000,
    discount: 20,
    rating: 4.8,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Keramik Dapur Modern',
    category: 'Dapur',
    price: 195000,
    discountPrice: null,
    discount: 0,
    rating: 4.0,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Keramik Outdoor Tahan Cuaca',
    category: 'Outdoor',
    price: 230000,
    discountPrice: 207000,
    discount: 10,
    rating: 4.6,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Keramik Dekorasi Dinding 3D',
    category: 'Dekorasi',
    price: 250000,
    discountPrice: null,
    discount: 0,
    rating: 4.9,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Keramik Lantai Kayu',
    category: 'Lantai',
    price: 220000,
    discountPrice: 198000,
    discount: 10,
    rating: 4.3,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Keramik Dinding Tekstur Batu',
    category: 'Dinding',
    price: 190000,
    discountPrice: 152000,
    discount: 20,
    rating: 4.1,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Keramik Mozaik Premium',
    category: 'Dekorasi',
    price: 280000,
    discountPrice: 224000,
    discount: 20,
    rating: 4.7,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    name: 'Keramik Lantai Granit Hitam',
    category: 'Lantai',
    price: 320000,
    discountPrice: null,
    discount: 0,
    rating: 4.4,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    name: 'Keramik Dinding Minimalis',
    category: 'Dinding',
    price: 175000,
    discountPrice: 148750,
    discount: 15,
    rating: 4.2,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    name: 'Keramik Kamar Mandi Pola Geometris',
    category: 'Kamar Mandi',
    price: 195000,
    discountPrice: null,
    discount: 0,
    rating: 4.5,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  }
]);

// Computed
const filteredProducts = computed(() => {
  let result = [...products.value];
  
  // Filter by category
  if (filters.value.categories.length > 0) {
    result = result.filter(product => 
      filters.value.categories.some(cat => 
        product.category.toLowerCase().includes(cat.toLowerCase())
      )
    );
  }
  
  // Filter by price range
  result = result.filter(product => {
    const price = product.discountPrice || product.price;
    return price >= filters.value.priceRange[0] && price <= filters.value.priceRange[1];
  });
  
  // Sort products
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      break;
    case 'price_desc':
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      break;
    case 'newest':
      result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Default sorting (newest)
      result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
  }
  
  return result;
});

 
const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

const activeFiltersFormatted = computed(() => {
  const result = {};
  
  // Categories
  if (filters.value.categories.length > 0) {
    result.categories = {
      label: 'Kategori',
      value: filters.value.categories.join(', ')
    };
  }
  
  // Price Range
  if (filters.value.priceRange[0] > 0 || filters.value.priceRange[1] < 1000000) {
    result.priceRange = {
      label: 'Harga',
      value: `Rp ${filters.value.priceRange[0].toLocaleString()} - Rp ${filters.value.priceRange[1].toLocaleString()}`
    };
  }
  
  // Materials
  if (filters.value.materials.length > 0) {
    result.materials = {
      label: 'Material',
      value: filters.value.materials.join(', ')
    };
  }
  
  // Sizes
  if (filters.value.sizes.length > 0) {
    result.sizes = {
      label: 'Ukuran',
      value: filters.value.sizes.join(', ')
    };
  }
  
  // Colors
  if (filters.value.colors.length > 0) {
    const colorLabels = filters.value.colors.map(colorValue => {
      const color = filterOptions.colors.find(c => c.value === colorValue);
      return color ? color.label : colorValue;
    });
    
    result.colors = {
      label: 'Warna',
      value: colorLabels.join(', ')
    };
  }
  
  return result;
});

// Methods
function sortProducts(option) {
  sortBy.value = option;
  currentPage.value = 1; // Reset to first page when sorting changes
}

function changeViewMode(mode) {
  viewMode.value = mode;
}

function changePage(page) {
  currentPage.value = page;
  // Scroll to top when changing page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyFilters() {
  currentPage.value = 1; // Reset to first page when filters change
}

function applyFiltersAndCloseDrawer() {
  applyFilters();
  showMobileFilter.value = false;
}

function resetFilters() {
  filters.value = {
    categories: [],
    materials: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000000]
  };
  currentPage.value = 1;
  showMobileFilter.value = false;
}

function clearFilter(filterType) {
  if (filterType === 'priceRange') {
    filters.value.priceRange = [0, 1000000];
  } else if (Object.prototype.hasOwnProperty.call(filters.value, filterType)) {
    filters.value[filterType] = [];
  }
  currentPage.value = 1;
}

// Lifecycle
onMounted(() => {
  // Any initialization logic can go here
});
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
