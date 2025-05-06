<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-negative">*</span>
    </label>
    
    <q-input
      :id="id"
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      :hint="hint"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :disable="disabled"
      :readonly="readonly"
      :dense="dense"
      :outlined="outlined"
      :filled="filled"
      :borderless="borderless"
      :class="inputClass"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template v-if="$slots.prepend" v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      
      <template v-if="$slots.append" v-slot:append>
        <slot name="append"></slot>
      </template>
    </q-input>
    
    <div v-if="helperText && !errorMessage" class="text-xs text-gray-500 mt-1">
      {{ helperText }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`
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
  helperText: {
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
    default: 'mb-4'
  },
  inputClass: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});
</script>