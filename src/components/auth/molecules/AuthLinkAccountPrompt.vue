<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4">Hubungkan Akun</h3>
      <p class="mb-4">
        Email ini sudah terdaftar menggunakan {{ getProviderName(linkProvider) }}. 
        Apakah Anda ingin menghubungkan akun tersebut dengan email dan password?
      </p>
      <div class="flex justify-end gap-2">
        <button 
          @click="$emit('cancel')" 
          class="px-4 py-2 border rounded-lg"
        >
          Batal
        </button>
        <button 
          @click="$emit('link')" 
          class="px-4 py-2 bg-primary text-white rounded-lg"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Memproses...' : 'Hubungkan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { computed } from 'vue';

defineProps({
  linkProvider: String,
  isLoading: Boolean
});

defineEmits(['cancel', 'link']);

// Helper function to get provider name
const getProviderName = (provider) => {
  switch (provider) {
    case 'google': return 'Google';
    case 'facebook': return 'Facebook';
    case 'twitter': return 'Twitter';
    default: return provider;
  }
};
</script>