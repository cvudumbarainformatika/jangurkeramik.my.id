<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-3">
      <div class="text-xl font-bold text-gray-800">{{ title }}</div>
      <button 
        v-if="showClear && hasSelected" 
        @click="$emit('clear')" 
        class="text-xs text-orange-500 hover:text-orange-600 transition-colors"
      >
        Reset
      </button>
    </div>
    
    <div class="space-y-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showClear: {
    type: Boolean,
    default: true
  },
  hasSelected: {
    type: Boolean,
    default: false
  }
});

defineEmits(['clear']);
</script>