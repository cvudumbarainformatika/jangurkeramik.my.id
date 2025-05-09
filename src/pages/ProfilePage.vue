<template>
  <div>
    <!-- Tab navigasi -->
    <div class="tabs">
      <button 
        @click="activeTab = 'info'" 
        :class="{'active': activeTab === 'info'}"
      >
        Informasi Profil
      </button>
      <button 
        @click="activeTab = 'security'" 
        :class="{'active': activeTab === 'security'}"
      >
        Keamanan
      </button>
      <button 
        @click="activeTab = 'login-methods'" 
        :class="{'active': activeTab === 'login-methods'}"
      >
        Metode Login
      </button>
    </div>
    
    <!-- Tab konten -->
    <div v-if="activeTab === 'login-methods'" class="p-4">
      <h2 class="text-xl font-bold mb-4">Metode Login</h2>
      
      <!-- Daftar metode login yang terhubung -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Metode Login Terhubung</h3>
        <div class="space-y-3">
          <!-- Email -->
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <AppIcon name="mail" />
              </div>
              <div class="ml-3">
                <div class="font-medium">Email dan Password</div>
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </div>
            </div>
            <div>
              <button 
                v-if="hasPassword" 
                @click="showChangePasswordModal = true"
                class="text-blue-600 hover:underline text-sm"
              >
                Ubah Password
              </button>
              <button 
                v-else 
                @click="showSetPasswordModal = true"
                class="text-blue-600 hover:underline text-sm"
              >
                Tambahkan Password
              </button>
            </div>
          </div>
          
          <!-- Google -->
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <!-- Google icon SVG -->
                </svg>
              </div>
              <div class="ml-3">
                <div class="font-medium">Google</div>
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </div>
            </div>
            <div>
              <span v-if="isGoogleConnected" class="text-green-600 text-sm">Terhubung</span>
              <button 
                v-else 
                @click="connectGoogle"
                class="text-blue-600 hover:underline text-sm"
              >
                Hubungkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal untuk set/change password -->
    <!-- ... -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import AppIcon from 'src/components/atoms/AppIcon.vue';
import { api } from 'src/boot/axios';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const activeTab = ref('info');
const showChangePasswordModal = ref(false);
const showSetPasswordModal = ref(false);

// Computed untuk mengecek apakah user memiliki password
const hasPassword = computed(() => {
  return user.value?.has_password || false;
});

// Computed untuk mengecek apakah akun Google terhubung
const isGoogleConnected = computed(() => {
  return user.value?.provider === 'google' || user.value?.connected_providers?.includes('google');
});

// Fungsi untuk menghubungkan akun Google
const connectGoogle = async () => {
  try {
    // Dapatkan URL untuk OAuth Google dengan parameter linking=true
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/auth/google/url?linking=true`);
    const data = await response.json();
    
    if (data.status === 'success' && data.redirect_url) {
      // Redirect ke URL Google OAuth
      window.location.href = data.redirect_url;
    }
  } catch (error) {
    console.error('Error getting Google OAuth URL:', error);
  }
};

// Fungsi untuk menambahkan password
// eslint-disable-next-line no-unused-vars
const setPassword = async (password) => {
  try {
    await api.post('api/v2/auth/email/set-password', { 
      email: user.value.email,
      password: password,
      password_confirmation: password
    });
    // Update user data
    await authStore.fetchUser();
    showSetPasswordModal.value = false;
  } catch (error) {
    console.error('Error setting password:', error);
  }
};

// Fungsi untuk mengubah password
// eslint-disable-next-line no-unused-vars
const changePassword = async (currentPassword, newPassword) => {
  try {
    await api.post('api/v2/auth/change-password', { 
      current_password: currentPassword,
      password: newPassword 
    });
    showChangePasswordModal.value = false;
  } catch (error) {
    console.error('Error changing password:', error);
  }
};
</script>
