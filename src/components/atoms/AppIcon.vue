<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="[sizeClasses[size] || '', colorClasses[color] || '', customClass]"
  />
  <span v-else class="icon-fallback">{{ name }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  color: {
    type: String,
    default: 'default',
    validator: (value) =>
      [
        'default',
        'primary',
        'secondary',
        'white',
        'gray',
        'success',
        'warning',
        'danger',
        'info',
        'orange',
      ].includes(value),
  },
  customClass: {
    type: String,
    default: '',
  },
})

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

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
  orange: 'text-orange-500',
}

// Get Lucide icon component
const iconComponent = computed(() => {
  try {
    // Convert kebab-case or snake_case to PascalCase for Lucide naming convention
    const pascalCaseName = props.name
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('')

    // Lucide icons are registered with their original names
    return pascalCaseName
  } catch (error) {
    console.warn(`Error processing icon "${props.name}":`, error)
    return null
  }
})
</script>

<script>
/**
 * @component AppIcon
 * @description Komponen atom untuk menampilkan ikon Lucide
 * @example
 * <AppIcon name="home" size="md" color="primary" />
 * <AppIcon name="shopping-cart" size="lg" color="success" />
 * <AppIcon name="alert-circle" size="sm" color="danger" />
 */
</script>

<style scoped>
.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  opacity: 0.5;
}
</style>
