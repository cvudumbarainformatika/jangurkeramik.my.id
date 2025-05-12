<template>
  <div class="relative">
    <button 
      @click="$emit('click')" 
      class="relative p-2 rounded-full hover:bg-white/10 transition-colors"
    >
      <AppIcon name="shopping-cart" size="md" color="white" />
      
      <!-- Cart Count Badge -->
      <div 
        v-if="count > 0"
        class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white"
      >
        {{ count > 99 ? '99+' : count }}
      </div>
    </button>
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';

defineProps({
  count: {
    type: Number,
    default: 0
  }
});

defineEmits(['click']);
</script>