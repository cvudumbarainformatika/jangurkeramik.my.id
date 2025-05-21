<template>
  <Transition name="toast-fade" appear>
    <div 
      v-if="show"
      :class="[
        'fixed top-0 left-0 z-50 flex items-center gap-4 px-4 py-4 rounded-sm shadow-2xl max-w-xs w-full',
        positionClasses,
        typeClasses,
        'border border-gray-200 bg-white/10 backdrop-blur-sm text-white',
      ]"
    >
      <!-- Brand Icon/Logo -->
      <div class="flex flex-row gap-4">
        <div v-if="showBrandIcon" class="w-10 h-10 bg-white/50 p-1 flex-shrink-0">
        <img 
          src="/icons/icon-128x128.png" 
          alt="Jangur Keramik" 
          class="w-full h-full object-contain"
          loading="eager"
        />
      </div>
      
      <!-- Status Icon -->
      <AppIcon 
        v-else 
        :name="icon" 
        size="lg" 
        class="text-white drop-shadow flex-shrink-0" 
      />

      <div class="flex-1 flex flex-col">
        <div v-if="title" class="font-bold text-md text-white">{{ title }} </div>
        <div class="font-medium text-sm tracking-wide text-white/80">{{ message }} </div>
      </div>
      </div>

      <button 
        @click="$emit('close')" 
        class="p-1 hover:bg-white/10 rounded-full transition-colors absolute right-2 top-2"
      >
        <AppIcon name="x" size="sm" class="text-white/70 hover:text-white" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import AppIcon from './AppIcon.vue';

const props = defineProps({
  show: Boolean,
  message: String,
  title: String,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning', 'brand'].includes(value)
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  showBrandIcon: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

const typeClasses = computed(() => {
  const classes = {
    success: 'bg-gradient-to-r from-orange-500 to-orange-600 bg-opacity-95',
    error: 'bg-gradient-to-r from-red-500 to-red-600 bg-opacity-95',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 bg-opacity-95',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 bg-opacity-95',
    brand: 'bg-gradient-to-r from-orange-500 to-orange-600 bg-opacity-95'
  };
  return classes[props.type];
});

const positionClasses = computed(() => {
  return props.position === 'top' 
    ? 'top-4 left-4' 
    : 'bottom-4 left-4';
});

const icon = computed(() => {
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info',
    warning: 'alert-triangle',
    brand: 'home'
  };
  return icons[props.type];
});
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}

.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
}
</style>