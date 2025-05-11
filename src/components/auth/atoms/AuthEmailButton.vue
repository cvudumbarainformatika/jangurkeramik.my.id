<template>
  <button 
    @click="$emit('click')"
    class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
  >
    <div class="w-5 h-5 flex items-center justify-center text-blue-600">
      <AppIcon name="mail" size="sm" />
    </div>
    <span class="text-gray-700 font-medium">Lanjutkan dengan Email</span>
  </button>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

defineEmits(['click']);
</script>