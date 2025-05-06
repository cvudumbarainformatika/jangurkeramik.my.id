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
    default: '',
    validator: (val) => ['', 'flat', 'outline', 'custom'].includes(val)
  },
  rounded: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  icon: {
    type: String,
    default: ''
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

<script>
/**
 * @component AppButton
 * @description Komponen atom button yang membungkus q-btn dari Quasar
 * @example
 * <AppButton label="Submit" color="primary" @click="handleSubmit" />
 * <AppButton label="Cancel" variant="flat" />
 * <AppButton icon="add" rounded />
 */
</script>