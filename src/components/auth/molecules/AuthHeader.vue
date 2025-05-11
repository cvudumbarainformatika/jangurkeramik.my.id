<template>
  <div class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
    <div class="relative p-6 flex justify-between items-center">
      <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {{ title }}
      </div>
      <AppIconButton 
        icon="x"
        color="gray"
        variant="ghost"
        class="hover:bg-white/20"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup>
import AppIconButton from '../../atoms/AppIconButton.vue';

defineProps({
  title: String
});

defineEmits(['close']);
</script>