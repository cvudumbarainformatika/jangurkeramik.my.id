<template>
  <!-- Existing header content -->
  
  <!-- User menu button -->
  <div class="ml-4">
    <button 
      v-if="isLoggedIn" 
      @click="openAuthDialog"
      class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div class="relative">
        <div v-if="user.avatar" class="w-8 h-8 rounded-full overflow-hidden">
          <img :src="user.avatar" alt="User avatar" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
          <span class="text-white font-medium text-sm">{{ userInitials }}</span>
        </div>
        <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      </div>
      <span class="hidden md:block text-sm font-medium">{{ user.nama || user.name }}</span>
    </button>
    
    <button 
      v-else 
      @click="openAuthDialog"
      class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
    >
      <AppIcon name="user" size="sm" />
      <span>Masuk</span>
    </button>
  </div>
  
  <!-- Auth Dialog -->
  <AppAuthDialog :is-open="isAuthDialogOpen" @close="closeAuthDialog" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import AppIcon from '../atoms/AppIcon.vue';
import AppAuthDialog from './AppAuthDialog.vue';

// ... existing props and setup

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user || {});

const userInitials = computed(() => {
  // Prioritaskan nama pengguna (nama atau name)
  const name = user.value.nama || user.value.name || '';
  
  if (name) {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  
  // Jika nama tidak tersedia, gunakan karakter pertama dari email
  if (user.value.email) {
    return user.value.email[0].toUpperCase();
  }
  
  // Fallback jika tidak ada nama atau email
  return 'U';
});

const isAuthDialogOpen = ref(false);

const openAuthDialog = () => {
  isAuthDialogOpen.value = true;
};

const closeAuthDialog = () => {
  isAuthDialogOpen.value = false;
};
</script>
