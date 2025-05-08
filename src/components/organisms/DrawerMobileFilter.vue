<template>
  <div 
    v-if="modelValue" 
    class="fixed inset-0 bg-black/50 z-50 flex items-end mobile-only"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-hidden p-4 absolute bottom-0 animate-slide-up">
      <div class="flex justify-between items-center mb-0 absolute top-4 right-4 z-10">
        <AppIconButton 
          icon="x" 
          @click="$emit('update:modelValue', false)"
          customClass="rounded-full hover:bg-gray-100"
        />
      </div>
      
      <div class="mt-8 overflow-y-auto max-h-[calc(90vh-4rem)]">
        <AppProductFilter 
          :filters="filters"
          @update:filters="$emit('update:filters', $event)"
          :categories="categories"
          :materials="materials"
          :sizes="sizes"
          :colors="colors"
          @apply="applyAndClose"
          @reset="onReset"
          @clear-filter="onClearFilter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIconButton from '../atoms/AppIconButton.vue';
import AppProductFilter from '../organisms/AppProductFilter.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  materials: {
    type: Array,
    default: () => []
  },
  sizes: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([
  'update:modelValue', 
  'update:filters', 
  'apply', 
  'reset', 
  'clear-filter'
]);

function applyAndClose() {
  emit('apply');
  emit('update:modelValue', false);
}

function onReset() {
  emit('reset');
}

function onClearFilter(filterType) {
  emit('clear-filter', filterType);
}
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.2s ease-out forwards;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
