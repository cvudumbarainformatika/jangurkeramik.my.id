<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Menyelesaikan Autentikasi</h2>
      <p class="text-gray-500 dark:text-gray-400">Mohon tunggu sebentar...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    // Ambil token dan data user dari query parameters
    const token = route.query.token;
    const userJson = route.query.user;
    
    if (token && userJson) {
      // Parse data user dari JSON string
      const user = JSON.parse(decodeURIComponent(userJson));
      
      // Simpan token dan user ke auth store
      await authStore.setAuth(token, user);
      console.log('callback', token, userJson);
      
      // Redirect ke halaman utama
      // router.push('/');
      
    } else {
      console.error('Token or user data missing from callback URL');
      router.push('/');
    }
  } catch (error) {
    console.error('Error processing auth callback:', error);
    router.push('/');
  }
});
</script>