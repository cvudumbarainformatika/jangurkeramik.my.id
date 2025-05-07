<template>
  <div>
    <div class="flex justify-between mb-2">
      <span class="text-sm text-gray-600">Rp {{ formatPrice(minValue) }}</span>
      <span class="text-sm text-gray-600">Rp {{ formatPrice(maxValue) }}</span>
    </div>
    
    <div class="relative h-2 bg-gray-200 rounded-full">
      <div 
        class="absolute h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" 
        :style="{
          left: `${((modelValue[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((modelValue[1] - min) / (max - min)) * 100}%`
        }"
      ></div>
      
      <input 
        type="range" 
        :min="min" 
        :max="max" 
        :step="step" 
        v-model.number="minValue"
        class="absolute w-full h-2 opacity-0 cursor-pointer"
      >
      
      <input 
        type="range" 
        :min="min" 
        :max="max" 
        :step="step" 
        v-model.number="maxValue"
        class="absolute w-full h-2 opacity-0 cursor-pointer"
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const model = defineModel();

const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1000000
  },
  step: {
    type: Number,
    default: 10000
  }
});

const minValue = computed({
  get: () => model.value[0],
  set: (value) => {
    const newValue = [Math.min(value, model.value[1] - props.step), model.value[1]];
    model.value = newValue;
  }
});

const maxValue = computed({
  get: () => model.value[1],
  set: (value) => {
    const newValue = [model.value[0], Math.max(value, model.value[0] + props.step)];
    model.value = newValue;
  }
});

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}
</script>
