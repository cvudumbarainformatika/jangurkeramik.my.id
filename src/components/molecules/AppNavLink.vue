<template>
  <router-link
    v-if="to"
    :to="to"
    :class="[
      'transition-colors',
      active ? activeClass : inactiveClass,
      customClass
    ]"
  >
    <AppIcon v-if="icon" :name="icon" class="mr-2" />
    <span>{{ label }}</span>
  </router-link>
  <a
    v-else
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[inactiveClass, customClass]"
  >
    <AppIcon v-if="icon" :name="icon" class="mr-2" />
    <span>{{ label }}</span>
  </a>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from '../atoms/AppIcon.vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  to: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  icon: {
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
  activeClass: {
    type: String,
    default: 'text-primary font-medium'
  },
  inactiveClass: {
    type: String,
    default: 'text-gray-600 hover:text-primary'
  },
  customClass: {
    type: String,
    default: ''
  }
});

const route = useRoute();

const active = computed(() => {
  if (!props.to) return false;
  return props.exact 
    ? route.path === props.to 
    : route.path === props.to || route.path.startsWith(`${props.to}/`);
});
</script>

<script>
/**
 * @component AppNavLink
 * @description Komponen molekul untuk link navigasi yang dapat digunakan di navbar, sidebar, atau footer
 * @example
 * <AppNavLink label="Beranda" to="/" icon="home" />
 * <AppNavLink label="Produk" to="/products" />
 * <AppNavLink label="Blog" href="https://blog.example.com" external />
 */
</script>