<template>
  <div :class="wrapperClass">
    <AppInput
      :id="id"
      v-model="localValue"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :hint="hint"
      :error-message="errorMessage"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :dense="dense"
      :outlined="outlined"
      :filled="filled"
      :borderless="borderless"
      :wrapper-class="''"
      :input-class="inputClass"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template v-if="$slots.prepend" v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      
      <template v-if="$slots.append" v-slot:append>
        <slot name="append"></slot>
      </template>
    </AppInput>
    
    <div v-if="helpText" class="mt-1 text-sm text-gray-500">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AppInput from '../atoms/AppInput.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: () => `field-${Math.random().toString(36).substring(2, 9)}`
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  helpText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: true
  },
  filled: {
    type: Boolean,
    default: false
  },
  borderless: {
    type: Boolean,
    default: false
  },
  wrapperClass: {
    type: String,
    default: 'mb-6'
  },
  inputClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<script>
/**
 * @component AppFormField
 * @description Komponen molekul form field yang menggabungkan input dengan help text
 * @example
 * <AppFormField v-model="email" label="Email" type="email" required help-text="Kami tidak akan membagikan email Anda kepada siapapun." />
 */
</script>