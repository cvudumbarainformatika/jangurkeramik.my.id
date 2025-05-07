<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'span'"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      customClass,
      isActive ? activeClass : inactiveClass
    ]"
    @click="$emit('click', $event)"
  >
    <slot :active="isActive">{{ label }}</slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  label: {
    type: String,
    default: ''
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
  exact: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  activeClass: {
    type: String,
    default: 'text-primary font-medium'
  },
  inactiveClass: {
    type: String,
    default: 'text-gray-700 hover:text-primary'
  }
});

defineEmits(['click']);

const route = useRoute();

const isActive = computed(() => {
  if (!props.to) return false;
  
  const toPath = typeof props.to === 'string' ? props.to : props.to.path;
  
  if (props.exact) {
    return route.path === toPath;
  }
  
  return route.path.startsWith(toPath);
});
</script>

<script>
/**
 * @component AppNavLink
 * @description Komponen molekul untuk link navigasi dengan dukungan router-link dan state aktif
 * @example
 * <AppNavLink 
 *   label="Beranda"
 *   to="/"
 *   exact
 *   customClass="py-2"
 *   activeClass="text-primary font-bold"
 *   inactiveClass="text-gray-700 hover:text-primary"
 * />
 */
</script>
