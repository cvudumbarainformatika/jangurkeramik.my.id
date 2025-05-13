<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold text-gray-800">Filter</h5>
      <button 
        v-if="hasActiveFilters" 
        @click="$emit('reset')" 
        class="text-sm text-orange-500 hover:text-orange-600 transition-colors"
      >
        Reset Semua
      </button>
    </div>
    
    <!-- Categories -->
    <AppFilterGroup 
      title="Kategori" 
      :has-selected="filters.categories.length > 0"
      @clear="$emit('clear-filter', 'categories')"
    >
      <AppFilterItem 
        v-for="category in categories" 
        :key="category.value"
        :id="`category-${category.value}`"
        :label="category.label"
        :count="category.count"
        :checked="filters.categories.includes(category.value)"
        @change="updateFilter('categories', category.value, $event)"
      />
    </AppFilterGroup>
    
    <!-- Price Range -->
    <AppFilterGroup 
      title="Rentang Harga" 
      :has-selected="filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000"
      @clear="$emit('clear-filter', 'priceRange')"
    >
      <AppPriceRangeSlider 
        :modelValue="filters.priceRange"
        @update:modelValue="updatePriceRange"
        :min="0"
        :max="1000000"
        :step="10000"
      />
    </AppFilterGroup>
    
    <!-- Colors -->
    <AppFilterGroup 
      title="Warna" 
      :has-selected="filters.colors.length > 0"
      @clear="$emit('clear-filter', 'colors')"
    >
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="color in colors" 
          :key="color.value"
          :style="{ backgroundColor: color.hex }"
          class="w-8 h-8 rounded-full border-2 transition-all"
          :class="[
            filters.colors.includes(color.value) 
              ? 'border-orange-500 scale-110 shadow-md' 
              : 'border-transparent hover:scale-110'
          ]"
          @click="updateFilter('colors', color.value, !filters.colors.includes(color.value))"
        ></button>
      </div>
    </AppFilterGroup>
    
    <!-- Materials -->
    <AppFilterGroup 
      title="Material" 
      :has-selected="filters.materials.length > 0"
      @clear="$emit('clear-filter', 'materials')"
    >
      <AppFilterItem 
        v-for="material in materials" 
        :key="material.value"
        :id="`material-${material.value}`"
        :label="material.label"
        :count="material.count"
        :checked="filters.materials.includes(material.value)"
        @change="updateFilter('materials', material.value, $event)"
      />
    </AppFilterGroup>
    
    <!-- Sizes -->
    <AppFilterGroup 
      title="Ukuran" 
      :has-selected="filters.sizes.length > 0"
      @clear="$emit('clear-filter', 'sizes')"
    >
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="size in sizes" 
          :key="size.value"
          class="px-3 py-1 border rounded-md text-sm transition-all"
          :class="[
            filters.sizes.includes(size.value) 
              ? 'border-orange-500 bg-orange-50 text-orange-600' 
              : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50/50'
          ]"
          @click="updateFilter('sizes', size.value, !filters.sizes.includes(size.value))"
        >
          {{ size.label }}
        </button>
      </div>
    </AppFilterGroup>
    
    <div class="mt-8 pb-24 md:pb-2">
      <button 
        @click="$emit('apply')" 
        class="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all"
      >
        Terapkan Filter
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AppFilterGroup from '../molecules/AppFilterGroup.vue';
import AppFilterItem from '../atoms/AppFilterItem.vue';
import AppPriceRangeSlider from '../molecules/AppPriceRangeSlider.vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  materials: {
    type: Array,
    default: () => []
  },
  sizes: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:filters', 'apply', 'reset', 'clear-filter']);

const hasActiveFilters = computed(() => {
  return props.filters.categories.length > 0 || 
         props.filters.materials.length > 0 || 
         props.filters.sizes.length > 0 || 
         props.filters.colors.length > 0 || 
         props.filters.priceRange[0] > 0 || 
         props.filters.priceRange[1] < 1000000;
});

function updateFilter(filterType, value, checked) {
  const newFilters = { ...props.filters };
  
  if (Array.isArray(newFilters[filterType])) {
    if (checked) {
      if (!newFilters[filterType].includes(value)) {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
  }
  
  emit('update:filters', newFilters);
}

function updatePriceRange(newValue) {
  const newFilters = { ...props.filters, priceRange: newValue };
  emit('update:filters', newFilters);
}
</script>
