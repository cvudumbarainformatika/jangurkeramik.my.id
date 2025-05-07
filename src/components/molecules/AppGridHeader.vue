<template>
  <div class="flex flex-wrap items-center justify-between">
    <div class="mb-4 md:mb-0">
      <div class="text-2xl font-bold text-gray-800">{{ title }}</div>
      <p class="text-gray-600">{{ subtitle }}</p>
    </div>
    
    <div class="flex items-center space-x-4">
      <!-- Sort Dropdown -->
      <div v-if="showSort" class="relative">
        <select 
          v-model="sortOptionModel" 
          @change="$emit('sort', sortOptionModel)"
          class="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <AppIcon name="chevron-down" size="sm" class="text-gray-500" />
        </div>
      </div>
      
      <!-- View Toggle -->
      <div v-if="showViewToggle" class="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
        <button 
          @click="$emit('view-mode-change', 'grid')"
          :class="[
            'p-1 rounded transition-colors',
            viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-orange-500'
          ]"
        >
          <AppIcon name="grid" size="sm" />
        </button>
        <button 
          @click="$emit('view-mode-change', 'list')"
          :class="[
            'p-1 rounded transition-colors',
            viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-orange-500'
          ]"
        >
          <AppIcon name="list" size="sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Produk Kami'
  },
  subtitle: {
    type: String,
    default: 'Temukan koleksi keramik berkualitas tinggi'
  },
  viewMode: {
    type: String,
    default: 'grid'
  },
  sortOption: {
    type: String,
    default: 'newest'
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
  showSort: {
    type: Boolean,
    default: true
  },
  showViewToggle: {
    type: Boolean,
    default: true
  }
});

defineEmits(['sort', 'view-mode-change']);

// Create a local ref for sortOption to avoid directly mutating props
const sortOptionModel = ref(props.sortOption);

// Watch for changes in the prop and update the local ref
watch(() => props.sortOption, (newValue) => {
  sortOptionModel.value = newValue;
});
</script>

<script>
/**
 * @component AppGridHeader
 * @description Komponen header untuk grid produk dengan judul, subtitle, dropdown sorting, dan toggle tampilan
 * @example
 * <AppGridHeader
 *   title="Produk Terbaru"
 *   subtitle="Koleksi produk terbaru kami"
 *   :viewMode="viewMode"
 *   :sortOption="sortOption"
 *   :sortOptions="sortOptions"
 *   @sort="handleSort"
 *   @view-mode-change="handleViewModeChange"
 * />
 */
</script>