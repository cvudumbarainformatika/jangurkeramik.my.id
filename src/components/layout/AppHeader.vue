<template>
  <q-header :class="[
    'transition-all duration-300',
    elevated && 'shadow-md',
    transparent ? 'bg-transparent' : 'bg-primary',
    customClass
  ]">
    <q-toolbar>
      <q-btn
        v-if="showMenuBtn"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('toggleMenu')"
      />

      <q-toolbar-title :class="titleClass">
        <slot name="title">
          {{ title }}
        </slot>
      </q-toolbar-title>

      <slot></slot>
    </q-toolbar>

    <slot name="below-toolbar"></slot>
  </q-header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Jangur Keramik'
  },
  elevated: {
    type: Boolean,
    default: true
  },
  transparent: {
    type: Boolean,
    default: false
  },
  showMenuBtn: {
    type: Boolean,
    default: true
  },
  titleClass: {
    type: String,
    default: 'font-bold'
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits(['toggleMenu']);
</script>