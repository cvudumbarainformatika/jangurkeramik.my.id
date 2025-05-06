<template>
  <span 
    class="inline-flex items-center justify-center"
    :class="[
      sizeClasses,
      colorClasses
    ]"
  >
    <component 
      :is="iconComponent" 
      v-if="iconComponent"
      class="fill-current"
    />
    <span v-else class="text-red-500">
      <!-- Fallback for missing icon -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import IconSearch from '../icons/IconSearch.vue';
import IconHeart from '../icons/IconHeart.vue';
import IconCart from '../icons/IconCart.vue';
import IconStar from '../icons/IconStar.vue';
import IconStarFilled from '../icons/IconStarFilled.vue';
import IconClose from '../icons/IconClose.vue';
import IconChevronDown from '../icons/IconChevronDown.vue';
import IconChevronLeft from '../icons/IconChevronLeft.vue';
import IconChevronRight from '../icons/IconChevronRight.vue';
import IconGrid from '../icons/IconGrid.vue';
import IconList from '../icons/IconList.vue';
import IconCheck from '../icons/IconCheck.vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'current'
  }
});

// Map icon names to components
const iconMap = {
  'search': IconSearch,
  'heart': IconHeart,
  'cart': IconCart,
  'star': IconStar,
  'star-filled': IconStarFilled,
  'close': IconClose,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'grid': IconGrid,
  'list': IconList,
  'check': IconCheck
};

// Get the icon component based on name
const iconComponent = computed(() => {
  return iconMap[props.name] || null;
});

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-6 h-6',
    'lg': 'w-8 h-8',
    'xl': 'w-10 h-10'
  };
  return sizes[props.size] || sizes.md;
});

// Color classes
const colorClasses = computed(() => {
  const colors = {
    'current': 'text-current',
    'primary': 'text-primary',
    'white': 'text-white',
    'black': 'text-black',
    'gray': 'text-gray-500',
    'red': 'text-red-500',
    'green': 'text-green-500',
    'blue': 'text-blue-500',
    'yellow': 'text-yellow-400'
  };
  return colors[props.color] || colors.current;
});
</script>

<script>
/**
 * @component AppIcon
 * @description Komponen ikon yang konsisten dengan berbagai ukuran dan warna
 * @example
 * <AppIcon name="heart" size="md" color="primary" />
 */
</script>
