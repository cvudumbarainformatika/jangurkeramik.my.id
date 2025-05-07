<template>
  <button 
    :class="[
      'p-2 transition-all duration-300 hover:scale-110 group',
      colorClasses[color] || '',
      customClass
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <AppIcon :name="icon" :size="size" class="group-hover:text-orange-500 group-active:text-orange-600" />
  </button>
</template>

<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'lg'
  },
  color: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'white', 'gray', 'success', 'warning', 'danger', 'info', 'orange'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits(['click']);

const colorClasses = {
  default: 'text-gray-700',
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  gray: 'text-gray-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
  info: 'text-blue-500',
  orange: 'text-orange-500'
};
</script>

<script>
/**
 * @component AppIconButton
 * @description Komponen atom untuk tombol dengan ikon
 * @example
 * <AppIconButton 
 *   icon="home" 
 *   size="lg" 
 *   color="primary" 
 *   @click="handleClick" 
 * />
 */
</script>
