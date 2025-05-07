<template>
  <div :class="['text-center', customClass]">
    <h2 class="text-4xl font-bold mb-4 relative inline-block">
      {{ title }}
      <span class="absolute -bottom-2 left-0 h-3 w-full bg-orange-200/60"></span>
    </h2>
    <p v-if="subtitle" class="text-gray-600 max-w-2xl mx-auto text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>

<script>
/**
 * @component AppSectionHeader
 * @description Molecule component for section headers with title and optional subtitle
 * @example
 * <AppSectionHeader 
 *   title="Featured Products" 
 *   subtitle="Explore our most popular ceramic products"
 * />
 */
</script>