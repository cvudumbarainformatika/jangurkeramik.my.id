<template>
  <div>
    <div class="mb-6">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
        <AppIcon :name="getProviderIcon(socialProvider)" size="xl" class="text-white" />
      </div>
      <h4 class="text-lg font-medium text-gray-800 mb-2 text-center">Akun {{ getProviderName(socialProvider) }} Terdeteksi</h4>
      <p class="text-gray-500 text-center">Email {{ email }} sudah terdaftar dengan {{ getProviderName(socialProvider) }}</p>
    </div>
    
    <div class="space-y-4">
      <!-- Login with provider button -->
      <button 
        @click="$emit('login-with-provider')"
        class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        <AppIcon :name="getProviderIcon(socialProvider)" size="md" />
        <span>Lanjutkan dengan {{ getProviderName(socialProvider) }}</span>
      </button>
      
      <!-- Set password button -->
      <button 
        @click="$emit('set-password')"
        class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all"
      >
        <AppIcon name="key" size="md" />
        <span>Atur Password untuk Email Ini</span>
      </button>
    </div>
    
    <!-- Back button -->
    <div class="mt-6">
      <button 
        @click="$emit('back')"
        class="text-gray-600 hover:text-gray-800 flex items-center gap-1"
      >
        <AppIcon name="arrow-left" size="sm" />
        <span>Kembali</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

defineProps({
  socialProvider: String,
  email: String
});

defineEmits(['back', 'login-with-provider', 'set-password']);

// Helper functions
const getProviderName = (provider) => {
  switch (provider) {
    case 'google': return 'Google';
    case 'facebook': return 'Facebook';
    case 'twitter': return 'Twitter';
    default: return provider;
  }
};

const getProviderIcon = (provider) => {
  switch (provider) {
    case 'google': return 'google';
    case 'facebook': return 'facebook';
    case 'twitter': return 'twitter';
    default: return 'user';
  }
};
</script>