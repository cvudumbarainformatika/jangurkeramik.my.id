<template>
  <div class="mb-2">
    <label :for="id" class="flex items-center cursor-pointer group">
      <input 
        :id="id" 
        type="checkbox" 
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
        class="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
      >
      <span class="ml-2 text-gray-700 group-hover:text-orange-500 transition-colors">{{ label }}</span>
      <span v-if="count" class="ml-auto text-xs text-gray-500 group-hover:text-orange-400 transition-colors">({{ count }})</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: null
  },
  checked: {
    type: Boolean,
    default: false
  }
});

defineEmits(['change']);
</script>