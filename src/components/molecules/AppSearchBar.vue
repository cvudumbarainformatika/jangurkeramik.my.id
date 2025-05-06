<template>
  <div class="relative">
    <div class="flex items-center">
      <AppInput
        v-model="localValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :outlined="outlined"
        :dense="dense"
        :class="inputClass"
        @update:model-value="$emit('update:modelValue', $event)"
        @keyup.enter="$emit('search', localValue)"
      >
        <template v-slot:prepend>
          <AppIcon name="search" :color="iconColor" />
        </template>
        
        <template v-slot:append>
          <AppIcon 
            v-if="localValue && clearable" 
            name="close" 
            class="cursor-pointer" 
            @click="clearSearch" 
          />
        </template>
      </AppInput>
      
      <AppButton
        v-if="showButton"
        :label="buttonLabel"
        :color="buttonColor"
        :variant="buttonVariant"
        :disabled="disabled || !localValue"
        class="ml-2"
        @click="$emit('search', localValue)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AppInput from '../atoms/AppInput.vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppButton from '../atoms/AppButton.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Cari...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: true
  },
  dense: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonLabel: {
    type: String,
    default: 'Cari'
  },
  buttonColor: {
    type: String,
    default: 'primary'
  },
  buttonVariant: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: 'gray-500'
  },
  inputClass: {
    type: String,
    default: 'w-full'
  }
});

const emit = defineEmits(['update:modelValue', 'search', 'clear']);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const clearSearch = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<script>
/**
 * @component AppSearchBar
 * @description Komponen molekul search bar yang menggabungkan input dengan icon dan tombol pencarian
 * @example
 * <AppSearchBar v-model="searchQuery" @search="performSearch" />
 * <AppSearchBar v-model="searchQuery" show-button @search="performSearch" />
 */
</script>