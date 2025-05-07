<template>
  <div class="flex items-center gap-1">
    <AppIcon 
      v-for="i in max" 
      :key="i" 
      :name="i <= rating ? 'star-filled' : 'star'" 
      :size="size"
      :class="[
        'transition-transform duration-300 group-hover:scale-110',
        {[`group-hover:text-${activeColor}-500`]: i <= rating}
      ]"
    />
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  rating: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 5
  },
  size: {
    type: String,
    default: 'md'
  },
  activeColor: {
    type: String,
    default: 'orange'
  }
});
</script>

<script>
/**
 * @component AppRatingStars
 * @description Atom component for displaying star ratings
 * @example
 * <AppRatingStars :rating="4.5" :max="5" size="md" activeColor="orange" />
 */
</script>
