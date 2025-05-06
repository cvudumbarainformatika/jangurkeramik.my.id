<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      colorClasses,
      customClass
    ]"
  >
    <AppIcon v-if="icon" :name="icon" size="xs" class="mr-1" />
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import AppIcon from './AppIcon.vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'accent', 'info', 'warning', 'positive', 'negative', 'dark'].includes(val)
  },
  customClass: {
    type: String,
    default: ''
  }
});

const colorClasses = computed(() => {
  const classes = {
    'primary': 'bg-primary-100 text-primary-800',
    'secondary': 'bg-secondary-100 text-secondary-800',
    'accent': 'bg-accent-100 text-accent-800',
    'info': 'bg-info-100 text-info-800',
    'warning': 'bg-warning-100 text-warning-800',
    'positive': 'bg-positive-100 text-positive-800',
    'negative': 'bg-negative-100 text-negative-800',
    'dark': 'bg-gray-100 text-gray-800'
  };
  
  return classes[props.variant] || classes.primary;
});
</script>

<script>
/**
 * @component AppBadge
 * @description Komponen atom badge untuk menampilkan label status atau notifikasi
 * @example
 * <AppBadge label="New" />
 * <AppBadge variant="warning">Pending</AppBadge>
 * <AppBadge icon="star" variant="positive">Featured</AppBadge>
 */
</script>