<template>
  <div class="relative">
    <input
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
      @focus="onFocus"
      @blur="hideDropdown"
      @input="onInput"
      autocomplete="off"
    />
    <AppIcon
      name="search"
      size="sm"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <button
      v-if="inputValue"
      @mousedown.prevent="clear"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.53-10.47a.75.75 0 00-1.06-1.06L10 8.94 7.53 6.47a.75.75 0 10-1.06 1.06L8.94 10l-2.47 2.47a.75.75 0 101.06 1.06L10 11.06l2.47 2.47a.75.75 0 101.06-1.06L11.06 10l2.47-2.47z" clip-rule="evenodd"/>
      </svg>
    </button>
    <!-- Dropdown Slot -->
    <slot name="dropdown" 
      v-if="showDropdown && $slots.dropdown" 
      :options="filteredOptions" 
      :select="selectOption" 
      :noResult="filteredOptions.length === 0"
    />
    <!-- Default Dropdown -->
    <ul
      v-else-if="showDropdown"
      class="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-48 overflow-auto shadow"
    >
      <li
        v-for="option in filteredOptions"
        :key="option.id || option.label || option"
        @mousedown.prevent="selectOption(option)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ option.label || option }}
      </li>
      <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-400 cursor-default">
        No Result
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppIcon from 'components/atoms/AppIcon.vue'

const props = defineProps({
  modelValue: [String, Object],
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Cari...'
  },
  minChars: {
    type: Number,
    default: 1
  },
  returnObject: {
    type: Boolean,
    default: false // jika true, emit object, jika false emit label
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(typeof props.modelValue === 'object' && props.modelValue !== null
  ? props.modelValue.label || ''
  : props.modelValue || ''
)
const showDropdown = ref(false)

watch(() => props.modelValue, (val) => {
  if (typeof val === 'object' && val !== null) {
    inputValue.value = val.label || ''
  } else {
    inputValue.value = val || ''
  }
})

const filteredOptions = computed(() => {
  if (inputValue.value.length < props.minChars) return []
  return props.options.filter(opt =>
    (opt.label || opt).toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

function selectOption(option) {
  inputValue.value = option.label || option
  emit('update:modelValue', props.returnObject ? option : (option.label || option))
  showDropdown.value = false
}

function clear() {
  inputValue.value = ''
  emit('update:modelValue', props.returnObject ? null : '')
  showDropdown.value = false
}

function onFocus() {
  if (inputValue.value.length >= props.minChars) {
    showDropdown.value = true
  }
}

function onInput() {
  if (inputValue.value.length >= props.minChars) {
    showDropdown.value = true
  } else {
    showDropdown.value = false
  }
}

function hideDropdown() {
  setTimeout(() => { showDropdown.value = false }, 100)
}
</script>