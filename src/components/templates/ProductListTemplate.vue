<template>
  <div class="container mx-auto py-4 pb-12">
    <!-- Desktop Layout -->
    <div class="desktop-only-flex flex-row gap-8">
      <!-- Sidebar Filter (Left) - Sticky -->
      <div class="w-1/4">
        <div class="sticky top-35 max-h-[calc(100vh-2rem)] overflow-y-auto">
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
          :sort-options="sortOptions"
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
        :sort-options="sortOptions"
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
import { ref, computed, onMounted, defineAsyncComponent, watch } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';
import { useProductStore } from 'src/stores/product-store';
import { storeToRefs } from 'pinia';
const AppProductFilter = defineAsyncComponent(() => import('../organisms/AppProductFilter.vue'))
const AppProductGrid = defineAsyncComponent(() => import('../organisms/AppProductGrid.vue'))

// ============================================================================================================Props
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

// ============================================================================================================State
const showMobileFilter = ref(true);

const productStore = useProductStore()

const { viewMode, filters, filteredProducts, currentPage, itemsPerPage, sortOptions } = storeToRefs(productStore)
const { changeViewMode, sortProducts, clearFilter, resetFilters } = productStore


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

// ============================================================================================================Computed
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



// ============================================================================================================Methods



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



// ============================================================================================================Lifecycle
onMounted(() => {
  // Any initialization logic can go here
});

watch(()=> viewMode, (newVal)=>{
  console.log('watch on productListTemplate',newVal);
  
})
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
