<template>
  <q-btn
    :color="color"
    :flat="variant === 'flat'"
    :outline="variant === 'outline'"
    :rounded="rounded"
    :size="size"
    :label="label"
    :icon="icon"
    :disable="disabled"
    :loading="loading"
    :class="[
      customClass,
      variant === 'custom' && 'bg-gradient-to-r from-primary to-secondary text-white'
    ]"
    @click="$emit('click')"
  />
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary'
  },
  variant: {
    type: String,
    default: 'filled',
    validator: (val) => ['filled', 'outline', 'flat', 'custom'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val)
  },
  icon: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits(['click']);
</script>