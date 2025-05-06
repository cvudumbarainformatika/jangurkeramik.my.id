<template>
  <div :class="['flex items-center', customClass]">
    <div v-if="icon || image" class="mr-3">
      <AppIcon v-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
      <img v-else-if="image" :src="image" :alt="title" class="w-10 h-10 rounded-full object-cover">
    </div>
    
    <div>
      <h3 :class="['font-medium', titleClass]">{{ title }}</h3>
      <p v-if="subtitle" :class="['text-sm text-gray-500', subtitleClass]">{{ subtitle }}</p>
    </div>
    
    <div v-if="$slots.action" class="ml-auto">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: 'md'
  },
  iconColor: {
    type: String,
    default: 'primary'
  },
  image: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  subtitleClass: {
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
 * @component AppCardHeader
 * @description Komponen molekul untuk header kartu yang menampilkan judul, subtitle, dan ikon/gambar
 * @example
 * <AppCardHeader 
 *   title="Judul Kartu" 
 *   subtitle="Subtitle kartu" 
 *   icon="star" 
 * >
 *   <template v-slot:action>
 *     <AppButton label="Edit" variant="flat" />
 *   </template>
 * </AppCardHeader>
 */
</script>