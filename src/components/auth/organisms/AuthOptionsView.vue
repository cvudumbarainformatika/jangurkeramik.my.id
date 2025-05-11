<template>
  <div>
    <div class="text-center mb-8">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
        <AppIcon name="user" size="xl" class="text-white" />
      </div>
      <h4 class="text-lg font-medium text-gray-800 mb-2">Masuk ke Akun Anda</h4>
      <p class="text-gray-500">Akses fitur eksklusif dan kelola pesanan Anda</p>
    </div>
    
    <!-- Auth buttons with modern styling -->
    <div class="flex flex-col gap-6">
      <AuthGoogleButton @click="$emit('login-with-google')" />
      <AuthEmailButton @click="$emit('email-login')" />
      <AuthRegisterButton @click="$emit('register')" />
    </div>
    
    <!-- Terms and privacy notice -->
    <div class="mt-6">
      <p class="text-xs text-gray-500 text-center">
        Dengan melanjutkan, Anda menyetujui 
        <a href="#" class="text-blue-600 hover:underline">Ketentuan Layanan</a> dan 
        <a href="#" class="text-blue-600 hover:underline">Kebijakan Privasi</a> kami.
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

// Lazy load atom components
const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);
const AuthGoogleButton = defineAsyncComponent(() => 
  import('../atoms/AuthGoogleButton.vue')
);
const AuthEmailButton = defineAsyncComponent(() => 
  import('../atoms/AuthEmailButton.vue')
);
const AuthRegisterButton = defineAsyncComponent(() => 
  import('../atoms/AuthRegisterButton.vue')
);

defineEmits(['login-with-google', 'email-login', 'register']);
</script>
