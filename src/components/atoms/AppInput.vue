<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <!-- Prepend slot absolute kiri -->
      <div v-if="prepend" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <slot name="prepend" />
      </div>
      <input
        :id="id"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :class="[
          'block w-full rounded-lg border',
          errorMessage
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
          'bg-white px-3 py-2 text-gray-900 text-sm shadow-sm focus:outline-none focus:ring-2 transition',
          prepend ? 'pl-10' : '',
          append ? 'pr-10' : '',
          inputClass
        ]"
        @input="onInput"
        autocomplete="off"
      />
      <!-- Append slot absolute kanan -->
      <div v-if="append" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="append" />
      </div>
    </div>
    <div v-if="hint && !errorMessage" class="text-xs text-gray-400 mt-1">{{ hint }}</div>
    <div v-if="errorMessage" class="text-xs text-red-500 mt-1">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, watch, computed, useSlots } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  id: { type: String, default: () => `input-${Math.random().toString(36).slice(2, 9)}` },
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  hint: String,
  errorMessage: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  wrapperClass: { type: String, default: 'mb-4' },
  inputClass: { type: String, default: '' },
  debounce: { type: Number, default: 300 }
})

const emit = defineEmits(['update:modelValue', 'debounce'])
const slots = useSlots()
const prepend = computed(() => !!slots.prepend)
const append = computed(() => !!slots.append)

const inputValue = ref(props.modelValue)
let debounceTimeout = null

// Sync prop <-> local
watch(() => props.modelValue, v => {
  if (v !== inputValue.value) inputValue.value = v
})

// Debounce emit
function onInput(e) {
  inputValue.value = e.target.value
  emit('update:modelValue', inputValue.value)
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    emit('debounce', inputValue.value)
  }, props.debounce)
}
</script>

<script>
/**
 * @component AppInput
 * @description Komponen atom input yang membungkus q-input dari Quasar
 * @example
 * <AppInput v-model="name" label="Nama" placeholder="Masukkan nama" />
 * <AppInput v-model="email" type="email" label="Email" required />
 */
</script>