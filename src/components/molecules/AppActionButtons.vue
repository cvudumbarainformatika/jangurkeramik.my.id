<template>
  <div class="flex items-center" :class="[customClass]">

    <!-- Sort Button -->
    <div v-if="showSort" class="relative group">
      <AppIconButton 
        icon="arrow-up-down"
        @click="$emit('sort-click')"
      />
      
      <!-- Sort Dropdown -->
      <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
        <div class="py-1">
          <button 
            v-for="(option, index) in sortOptions" 
            :key="index"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            @click="$emit('sort-change', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- View Mode Toggle -->
    <div v-if="showViewToggle" class="desktop-only-flex items-center">
      <AppIconButton 
        icon="grid"
        @click="$emit('view-mode-change', 'grid')"
      />
      <AppIconButton 
        icon="list"
        @click="$emit('view-mode-change', 'list')"
      />
    </div>
    
    <!-- Product Count -->
    <div v-if="showProductCount" class="desktop-only-flex relative p-2">
      <div class="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
        {{ productCount }}
      </div>
      <AppIcon name="shopping-bag" size="lg" class="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110" />
    </div>
    
    
    
    <!-- Filter Button (Mobile) -->
    <AppIconButton 
      v-if="showMobileFilter" 
      icon="filter"
      class="mobile-only"
      @click="$emit('filter-click')"
    />
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';

defineProps({
  showViewToggle: {
    type: Boolean,
    default: true
  },
  showProductCount: {
    type: Boolean,
    default: false
  },
  productCount: {
    type: Number,
    default: 0
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
      { label: 'Popularitas', value: 'popularity' }
    ]
  },
  showMobileFilter: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits([
  'view-mode-change',
  'sort-click',
  'sort-change',
  'filter-click'
]);
</script>

<script>
/**
 * @component AppActionButtons
 * @description Komponen molekul untuk tombol-tombol aksi seperti toggle view, sort, dan filter
 * @example
 * <AppActionButtons 
 *   :productCount="128"
 *   :showViewToggle="true"
 *   :showProductCount="true"
 *   :showSort="true"
 *   :showMobileFilter="true"
 *   @view-mode-change="changeViewMode"
 *   @sort-change="sortProducts"
 *   @filter-click="openFilterPanel"
 * />
 */
</script>
