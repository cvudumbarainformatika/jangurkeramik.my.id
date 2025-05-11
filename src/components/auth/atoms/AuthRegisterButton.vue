<template>
  <button 
    @click="$emit('click')"
    class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-white"
  >
    <div class="w-5 h-5 flex items-center justify-center">
      <AppIcon name="user-plus" size="sm" />
    </div>
    <span class="font-medium">Daftar Akun Baru</span>
  </button>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

defineEmits(['click']);
</script>