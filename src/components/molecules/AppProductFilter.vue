<template>
  <div class="mb-6 border-b pb-6">
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-medium">{{ title }}</h3>
      <button 
        v-if="hasSelection"
        @click="clearFilter"
        class="text-xs text-primary hover:underline"
      >
        Reset
      </button>
    </div>
    
    <!-- Checkbox Filter -->
    <div v-if="type === 'checkbox'" class="space-y-2">
      <div 
        v-for="option in options" 
        :key="option.value"
        class="flex items-center"
      >
        <input 
          :id="`${id}-${option.value}`"
          type="checkbox"
          :value="option.value"
          v-model="localValue"
          class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          @change="emitChange"
        >
        <label :for="`${id}-${option.value}`" class="ml-2 text-sm text-gray-700 flex-grow">
          {{ option.label }}
        </label>
        <span class="text-xs text-gray-500">{{ option.count }}</span>
      </div>
    </div>
    
    <!-- Range Filter -->
    <div v-else-if="type === 'range'" class="space-y-4">
      <div class="flex justify-between text-xs text-gray-600">
        <span>{{ valueFormatter ? valueFormatter(localValue[0]) : localValue[0] }}</span>
        <span>{{ valueFormatter ? valueFormatter(localValue[1]) : localValue[1] }}</span>
      </div>
      
      <div class="relative">
        <div class="h-1 bg-gray-200 rounded-full">
          <div 
            class="absolute h-1 bg-primary rounded-full"
            :style="{
              left: `${((localValue[0] - rangeMin) / (rangeMax - rangeMin)) * 100}%`,
              right: `${100 - ((localValue[1] - rangeMin) / (rangeMax - rangeMin)) * 100}%`
            }"
          ></div>
        </div>
        
        <input 
          type="range"
          :min="rangeMin"
          :max="rangeMax"
          :step="rangeStep"
          v-model.number="localValue[0]"
          class="absolute w-full h-1 opacity-0 cursor-pointer"
          @input="validateRange(0)"
          @change="emitChange"
        >
        
        <input 
          type="range"
          :min="rangeMin"
          :max="rangeMax"
          :step="rangeStep"
          v-model.number="localValue[1]"
          class="absolute w-full h-1 opacity-0 cursor-pointer"
          @input="validateRange(1)"
          @change="emitChange"
        >
        
        <div 
          class="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -mt-1.5 -ml-2"
          :style="{ left: `${((localValue[0] - rangeMin) / (rangeMax - rangeMin)) * 100}%` }"
        ></div>
        
        <div 
          class="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -mt-1.5 -ml-2"
          :style="{ left: `${((localValue[1] - rangeMin) / (rangeMax - rangeMin)) * 100}%` }"
        ></div>
      </div>
    </div>
    
    <!-- Button Filter -->
    <div v-else-if="type === 'button'" class="flex flex-wrap gap-2">
      <button 
        v-for="option in options" 
        :key="option.value"
        class="px-3 py-1 text-sm border rounded-md transition"
        :class="localValue.includes(option.value) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
        @click="toggleButton(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    
    <!-- Color Filter -->
    <div v-else-if="type === 'color'" class="flex flex-wrap gap-2">
      <button 
        v-for="option in options" 
        :key="option.value"
        class="w-8 h-8 rounded-full border-2 transition-all relative"
        :style="{ backgroundColor: option.color }"
        :class="localValue.includes(option.value) ? 'border-primary scale-110' : 'border-transparent hover:scale-105'"
        @click="toggleButton(option.value)"
      >
        <span v-if="localValue.includes(option.value)" class="absolute inset-0 flex items-center justify-center text-primary">
          <AppIcon name="check" size="sm" :color="isLightColor(option.color) ? 'black' : 'white'" />
        </span>
        <span class="sr-only">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'range', 'button', 'color'].includes(value)
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [Array, Object],
    default: () => []
  },
  rangeMin: {
    type: Number,
    default: 0
  },
  rangeMax: {
    type: Number,
    default: 100
  },
  rangeStep: {
    type: Number,
    default: 1
  },
  valueFormatter: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'filter-change']);

// Local state
const localValue = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : props.modelValue);

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localValue.value = Array.isArray(newValue) ? [...newValue] : newValue;
}, { deep: true });

// Computed
const hasSelection = computed(() => {
  if (props.type === 'range') {
    return localValue.value[0] > props.rangeMin || localValue.value[1] < props.rangeMax;
  }
  return localValue.value.length > 0;
});

// Methods
const emitChange = () => {
  emit('update:modelValue', localValue.value);
  emit('filter-change', { id: props.id, value: localValue.value });
};

const clearFilter = () => {
  if (props.type === 'range') {
    localValue.value = [props.rangeMin, props.rangeMax];
  } else {
    localValue.value = [];
  }
  emitChange();
};

const validateRange = (index) => {
  // Ensure min <= max
  if (index === 0 && localValue.value[0] > localValue.value[1]) {
    localValue.value[0] = localValue.value[1];
  } else if (index === 1 && localValue.value[1] < localValue.value[0]) {
    localValue.value[1] = localValue.value[0];
  }
};

const toggleButton = (value) => {
  const index = localValue.value.indexOf(value);
  if (index === -1) {
    localValue.value.push(value);
  } else {
    localValue.value.splice(index, 1);
  }
  emitChange();
};

const isLightColor = (color) => {
  // Simple function to determine if a color is light or dark
  // for proper contrast of the checkmark
  if (color.startsWith('#')) {
    const hex = color.substring(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }
  return true; // Default to light for non-hex colors
};
</script>

<script>
/**
 * @component AppProductFilter
 * @description Komponen filter produk yang mendukung berbagai tipe filter: checkbox, range, button, dan color
 * @example
 * <AppProductFilter
 *   id="category"
 *   title="Kategori"
 *   type="checkbox"
 *   :options="[
 *     { label: 'Keramik Lantai', value: 'floor', count: 124 },
 *     { label: 'Keramik Dinding', value: 'wall', count: 98 }
 *   ]"
 *   v-model="filters.categories"
 *   @filter-change="applyFilters"
 * />
 */
</script>
