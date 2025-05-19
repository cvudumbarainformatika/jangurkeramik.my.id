<template>
  <div class="flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-2">
      <div class="text-xl font-medium ml-2">Detail Pelanggan</div>
      <button 
        @click="$emit('close')" 
        class="ml-auto p-2 rounded-full hover:bg-gray-200 transition"
      >
        <AppIcon name="x" size="lg" class="text-gray-600" />
      </button>
    </div>

    <!-- Supplier Header -->
    <div class="border border-gray-200 rounded-lg p-4 mb-4">
      <div class="flex flex-row items-start gap-4">
        <div class="relative mb-4">
          <div class="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
             <AppAvatar
              :user="user"
            />
          </div>

          
        </div>
        <div class="flex-1 relative mt-4">
          <div class="flex flex-col items-start">
            <div class="text-xl font-medium text-gray-900">{{ user?.nama }}</div>
            <div class="text-sm font-medium text-gray-900">{{ user?.username }}</div>
            
          </div>
          
          <div class="mt-2 text-gray-700">
           
            <div class="flex items-center mt-1">
              <AppIcon name="phone" size="sm" class="text-gray-500" />
              <span class="ml-2">{{ user?.nohp || '(021) 1234-5678' }}</span>
            </div>
            
            
          </div>

          <!-- <div class="mt-2 flex flex-start text-white bg-primary rounded-full p-1.5">
            <div class="flex items-center mt-1">
              <AppIcon name="user" size="sm" class="text-white" />
              <span class="ml-2">{{ user?.jabatan }}</span>
            </div>
          </div> -->
          
        </div>
      </div>
    </div>




    
  </div>
</template>

<script setup>
import AppIcon from 'src/components/atoms/AppIcon.vue';
import { defineAsyncComponent } from 'vue';

const AppAvatar = defineAsyncComponent(() => 
  import('src/components/atoms/AppAvatar.vue')
);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);
</script>