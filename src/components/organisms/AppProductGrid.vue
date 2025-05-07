<template>
  <div>
    <!-- Header with sorting and view options -->
    <AppGridHeader
      :title="title"
      :subtitle="subtitle"
      :viewMode="viewMode"
      :sortOption="sortOption"
      :sortOptions="sortOptions"
      :showSort="true"
      :showViewToggle="true"
      @sort="$emit('sort', $event)"
      @view-mode-change="$emit('view-mode-change', $event)"
    />
    
    <!-- Active Filters -->
    <div v-if="Object.keys(activeFilters).length > 0" class="flex flex-wrap items-center gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
      <span class="text-sm text-gray-600 mr-2">Filter Aktif:</span>
      <div 
        v-for="(filter, key) in activeFilters" 
        :key="key"
        class="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200 text-sm"
      >
        <span class="text-gray-800">{{ filter.label }}: <span class="text-orange-500">{{ filter.value }}</span></span>
        <button 
          @click="$emit('clear-filter', key)"
          class="ml-2 text-gray-400 hover:text-red-500"
        >
          <AppIcon name="x" size="xs" />
        </button>
      </div>
      
      <button
        @click="$emit('clear-all-filters')"
        class="ml-auto text-sm text-orange-500 hover:text-orange-600 transition-colors"
      >
        Hapus Semua
      </button>
    </div>
    
    <!-- Products Grid -->
    <div :class="[
      viewMode === 'grid' ? 'grid grid-flow-col max-sm:grid-rows-12 sm:grid-rows-6 lg:grid-rows-4 xl:grid-rows-4 gap-4' : 'space-y-4'
    ]">
    <!-- <div class="grid grid-flow-col grid-rows-4 gap-4"> -->
      <template v-if="products.length > 0">
        <AppProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product"
          :view-mode="viewMode"
        />
      </template>
      <div v-else class="col-span-full py-16 text-center">
        <AppIcon name="search-x" size="xl" class="mx-auto mb-4 text-gray-400" />
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak ada produk ditemukan</h3>
        <p class="text-gray-500 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
        <button 
          @click="$emit('clear-all-filters')" 
          class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Reset Filter
        </button>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="mt-10 flex justify-center">
      <div class="flex items-center space-x-2">
        <button 
          :disabled="currentPage === 1"
          @click="$emit('page-change', currentPage - 1)"
          class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-300"
        >
          <AppIcon name="chevron-left" size="sm" />
        </button>
        
        <template v-for="page in displayedPages" :key="page">
          <button 
            v-if="page !== '...'"
            @click="$emit('page-change', page)"
            :class="[
              'min-w-[40px] h-10 rounded-lg border transition-colors',
              currentPage === page 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300'
            ]"
          >
            {{ page }}
          </button>
          <span v-else class="px-2 text-gray-500">...</span>
        </template>
        
        <button 
          :disabled="currentPage === totalPages"
          @click="$emit('page-change', currentPage + 1)"
          class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-300"
        >
          <AppIcon name="chevron-right" size="sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppProductCard from '../molecules/AppProductCard.vue';
import AppGridHeader from '../molecules/AppGridHeader.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Produk Kami'
  },
  subtitle: {
    type: String,
    default: 'Temukan koleksi keramik berkualitas tinggi'
  },
  products: {
    type: Array,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  },
  sortOptions: {
    type: Array,
    default: () => [
      { label: 'Terbaru', value: 'newest' },
      { label: 'Harga: Rendah ke Tinggi', value: 'price_asc' },
      { label: 'Harga: Tinggi ke Rendah', value: 'price_desc' },
      { label: 'Popularitas', value: 'popularity' },
      { label: 'Rating', value: 'rating' }
    ]
  },
  activeFilters: {
    type: Object,
    default: () => ({})
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  }
});

// eslint-disable-next-line no-unused-vars
const emit = defineEmits([
  'sort', 
  'view-mode-change', 
  'clear-filter', 
  'clear-all-filters', 
  'page-change'
]);

const sortOption = ref(props.sortOptions[0]?.value || 'newest');

const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (props.totalPages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    // Calculate middle pages
    const startPage = Math.max(2, props.currentPage - 1);
    const endPage = Math.min(props.totalPages - 1, props.currentPage + 1);
    
    // Add ellipsis if needed before middle pages
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed after middle pages
    if (endPage < props.totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page
    pages.push(props.totalPages);
  }
  
  return pages;
});
</script>
