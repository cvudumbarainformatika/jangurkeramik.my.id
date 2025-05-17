<template>
  <div v-if="isOverlay && isOpen" class="fixed inset-0 z-40 h-full bg-black/50 transition-opacity"></div>
  <Transition name="slide-up">
    <div
      v-if="isOpen"
      :class="[
        'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-screen bg-dark',
        fullscreen ? 'h-screen' : '',
        'overflow-hidden rounded-t-lg transition-all duration-300 ease-in-out',
      ]"
      :style="!fullscreen ? { height } : {}"
    >
      <div class="flex flex-col h-full">
        <!-- Header Slot -->
        <template v-if="$slots.header">
          <div class="shrink-0">
            <slot name="header" />
          </div>
        </template>
        <template v-else>
          <div class="flex justify-between items-center border-b border-gray-300 px-4 py-2 shrink-0" :class="bgHeader + ' ' + colorText">
            <div class="font-medium">{{ title }}</div>
            <button @click="close" class="p-1">
              <AppIcon name="x" size="sm" :class="colorText" />
            </button>
          </div>
        </template>
        <div class="flex-1 overflow-auto" :class="bgBody">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>

import { computed } from 'vue'

import AppIcon from 'components/atoms/AppIcon.vue'

const props = defineProps({
  modelValue:{
    type:Boolean,
    default:false
  },
  title:{
    type:String,
    default: ''
  },
  fullscreen:{
    type:Boolean,
    default:false
  },
  isOverlay:{
    type:Boolean,
    default:true
  },
  height:{
    type:String,
    default:'25vh'
  },
  bgHeader:{
    type:String,
    default:'bg-orange-500 text-white'
  },
  colorText:{
    type:String,
    default:'text-white'
  },
  bgBody:{
    type:String,
    default:'bg-white'
  }
})

const emit = defineEmits(['update:modelValue','close'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const close = () => {
  isOpen.value = false
  emit('close')
}
</script>

<style scoped>
.slide-up-enter-active {
  animation: slide-up 0.3s ease-out forwards;
}

.slide-up-leave-active {
  animation: slide-up 0.3s ease-in reverse;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
