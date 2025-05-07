<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center',
      sizeClasses[size],
      variantClasses[variant]?.[color] || '',
      roundedClasses[rounded],
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      block ? 'w-full' : '',
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <AppIcon v-if="iconLeft" :name="iconLeft" class="mr-2" :size="iconSize" />
    <slot>{{ label }}</slot>
    <AppIcon v-if="iconRight" :name="iconRight" class="ml-2" :size="iconSize" />
  </component>
</template>

<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'white', 'gray', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outline', 'text', 'custom'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
  },
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: 'sm'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  external: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits(['click']);

const sizeClasses = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2.5',
  xl: 'text-xl px-6 py-3'
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

const variantClasses = {
  filled: {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-2 focus:ring-secondary/50',
    white: 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200',
    gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-200',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500/50',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500/50',
    info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/50'
  },
  outline: {
    primary: 'border border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50',
    secondary: 'border border-secondary text-secondary hover:bg-secondary/10 focus:ring-2 focus:ring-secondary/50',
    white: 'border border-white text-white hover:bg-white/10 focus:ring-2 focus:ring-white/50',
    gray: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200',
    success: 'border border-green-500 text-green-500 hover:bg-green-500/10 focus:ring-2 focus:ring-green-500/50',
    warning: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500/50',
    danger: 'border border-red-500 text-red-500 hover:bg-red-500/10 focus:ring-2 focus:ring-red-500/50',
    info: 'border border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring-2 focus:ring-blue-500/50'
  },
  text: {
    primary: 'text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50',
    secondary: 'text-secondary hover:bg-secondary/10 focus:ring-2 focus:ring-secondary/50',
    white: 'text-white hover:bg-white/10 focus:ring-2 focus:ring-white/50',
    gray: 'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200',
    success: 'text-green-500 hover:bg-green-500/10 focus:ring-2 focus:ring-green-500/50',
    warning: 'text-yellow-500 hover:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500/50',
    danger: 'text-red-500 hover:bg-red-500/10 focus:ring-2 focus:ring-red-500/50',
    info: 'text-blue-500 hover:bg-blue-500/10 focus:ring-2 focus:ring-blue-500/50'
  },
  custom: {}
};
</script>

<script>
/**
 * @component AppButton
 * @description Komponen atom button yang dapat dikustomisasi dengan berbagai opsi
 * @example
 * <AppButton 
 *   label="Lihat Produk" 
 *   color="primary" 
 *   variant="filled" 
 *   size="md" 
 *   rounded="full"
 *   iconLeft="shopping_cart"
 *   @click="handleClick"
 * />
 */
</script>
