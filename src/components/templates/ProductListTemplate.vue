<template>
  <div>
    <AppNavbar :title="title" :logo="logo" :navItems="navItems" />
    
    <!-- Page Header -->
    <section class="bg-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ pageTitle }}</h1>
        <p v-if="pageDescription" class="mt-2 text-lg text-gray-600">{{ pageDescription }}</p>
        
        <div v-if="showBreadcrumbs" class="mt-4 flex items-center text-sm text-gray-500">
          <router-link to="/" class="hover:text-primary">Beranda</router-link>
          <span class="mx-2">/</span>
          <span class="font-medium text-gray-900">{{ pageTitle }}</span>
        </div>
      </div>
    </section>
    
    <!-- Filters and Products -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <aside v-if="showFilters" class="lg:col-span-1">
          <div class="sticky top-8 space-y-6">
            <slot name="filters"></slot>
          </div>
        </aside>
        
        <!-- Products Grid -->
        <div :class="[showFilters ? 'lg:col-span-3' : 'lg:col-span-4']">
          <!-- Search and Sort -->
          <div v-if="showSearch || showSort" class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <AppSearchBar 
              v-if="showSearch"
              v-model="searchQuery"
              :placeholder="searchPlaceholder"
              class="w-full sm:w-auto"
              @search="$emit('search', searchQuery)"
            />
            
            <div v-if="showSort" class="flex items-center">
              <span class="text-sm text-gray-500 mr-2">Urutkan:</span>
              <select 
                v-model="sortOption" 
                class="border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary"
                @change="$emit('sort', sortOption)"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          
          <!-- Products -->
          <slot></slot>
          
          <!-- Pagination -->
          <div v-if="showPagination" class="mt-8 flex justify-center">
            <slot name="pagination"></slot>
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
import { ref, watch } from 'vue';
import AppNavbar from '../organisms/AppNavbar.vue';
import AppFooter from '../organisms/AppFooter.vue';
import AppSearchBar from '../molecules/AppSearchBar.vue';

const props = defineProps({
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
  pageTitle: {
    type: String,
    default: 'Produk Kami'
  },
  pageDescription: {
    type: String,
    default: ''
  },
  showBreadcrumbs: {
    type: Boolean,
    default: true
  },
  showFilters: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  searchPlaceholder: {
    type: String,
    default: 'Cari produk...'
  },
  initialSearchQuery: {
    type: String,
    default: ''
  },
  showSort: {
    type: Boolean,
    default: true
  },
  sortOptions: {
    type: Array,
    default: () => [
      { label: 'Terbaru', value: 'newest' },
      { label: 'Harga: Rendah ke Tinggi', value: 'price_asc' },
      { label: 'Harga: Tinggi ke Rendah', value: 'price_desc' },
      { label: 'Nama: A-Z', value: 'name_asc' },
      { label: 'Nama: Z-A', value: 'name_desc' }
    ]
  },
  initialSortOption: {
    type: String,
    default: 'newest'
  },
  showPagination: {
    type: Boolean,
    default: true
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

defineEmits(['search', 'sort']);

const searchQuery = ref(props.initialSearchQuery);
const sortOption = ref(props.initialSortOption);

watch(() => props.initialSearchQuery, (newVal) => {
  searchQuery.value = newVal;
});

watch(() => props.initialSortOption, (newVal) => {
  sortOption.value = newVal;
});
</script>

<script>
/**
 * @component ProductListTemplate
 * @description Template untuk halaman daftar produk yang menggabungkan navbar, filter, pencarian, dan grid produk
 * @example
 * <ProductListTemplate
 *   title="Jangur Keramik"
 *   pageTitle="Keramik Lantai"
 *   pageDescription="Koleksi keramik lantai berkualitas tinggi dengan berbagai desain"
 *   :navItems="[...]"
 *   :initialSearchQuery="searchQuery"
 *   :initialSortOption="sortOption"
 *   @search="handleSearch"
 *   @sort="handleSort"
 * >
 *   <template v-slot:filters>
 *     <!-- Filter components -->
 *   </template>
 *   
 *   <!-- Product grid -->
 *   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 *     <ProductCard v-for="product in products" :key="product.id" :product="product" />
 *   </div>
 *   
 *   <template v-slot:pagination>
 *     <!-- Pagination component -->
 *   </template>
 * </ProductListTemplate>
 */
</script>
