<template>
  <div class="flex items-center">
    <div class="relative">
      <img 
        :src="avatar" 
        :alt="name" 
        class="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
      >
      <div v-if="verified" class="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
        <AppIcon name="check" size="xs" class="text-white" />
      </div>
    </div>
    <div class="ml-4">
      <h4 class="font-bold text-gray-900">{{ name }}</h4>
      <div class="flex items-center text-gray-600 text-sm">
        <AppIcon name="map-pin" size="xs" class="mr-1" />
        <span>{{ location }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';

defineProps({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});
</script>

<script>
/**
 * @component AppCustomerInfo
 * @description Molecule component for displaying customer information with avatar and location
 * @example
 * <AppCustomerInfo 
 *   name="John Doe" 
 *   location="New York" 
 *   avatar="/path/to/avatar.jpg" 
 *   verified 
 * />
 */
</script>