<template>
  <div>
    <!-- Auth Dialog Overlay with improved blur effect -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/20 backdrop-blur-md z-50 transition-all duration-300"
      @click="close"
    ></div>
    
    <!-- Auth Panel with modern design - ALTERNATIVE POSITIONING -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div 
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-100 dark:border-gray-800 transition-all duration-500 ease-out max-h-[90vh] overflow-y-auto"
        :class="{ 'opacity-100 scale-100': isOpen, 'opacity-0 scale-95': !isOpen }"
      >
        <!-- Glass effect header -->
        <div class="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
          <div class="relative p-6 flex justify-between items-center">
            <h3 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {{ isLoggedIn ? 'Akun Saya' : 'Selamat Datang' }}
            </h3>
            <AppIconButton 
              icon="x"
              color="gray"
              variant="ghost"
              class="hover:bg-white/20"
              @click="close"
            />
          </div>
        </div>
        
        <!-- Not logged in state with modern UI -->
        <div v-if="!isLoggedIn" class="p-6">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <AppIcon name="user" size="xl" class="text-white" />
            </div>
            <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Masuk ke Akun Anda</h4>
            <p class="text-gray-500 dark:text-gray-400">Akses fitur eksklusif dan kelola pesanan Anda</p>
          </div>
          
          <!-- Auth buttons with modern styling -->
          <div class="space-y-4">
            <!-- Google login button with improved design -->
            <button 
              @click="loginWithGoogle"
              class="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 group"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="text-gray-700 dark:text-gray-200 font-medium">Lanjutkan dengan Google</span>
            </button>
            
            <!-- Email login button -->
            <button 
              @click="login"
              class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              <AppIcon name="mail" class="text-white" />
              <span>Masuk dengan Email</span>
            </button>
            
            <!-- Register button with subtle design -->
            <button 
              @click="register"
              class="w-full flex items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-200"
            >
              <AppIcon name="user-plus" class="text-gray-500" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>
          
          <!-- Terms and privacy notice -->
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
            Dengan melanjutkan, Anda menyetujui 
            <a href="#" class="text-blue-600 hover:underline">Ketentuan Layanan</a> dan 
            <a href="#" class="text-blue-600 hover:underline">Kebijakan Privasi</a> kami.
          </p>
        </div>
        
        <!-- Logged in state with modern UI -->
        <div v-else class="p-6">
          <div class="flex items-center mb-8">
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span class="text-white font-bold text-xl">{{ userInitials }}</span>
              </div>
              <div class="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-medium text-gray-800 dark:text-white">{{ user.name }}</h4>
              <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
            </div>
          </div>
          
          <!-- User menu with modern cards -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer group">
              <div class="flex flex-col items-center text-center">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <AppIcon name="user" class="text-blue-600 dark:text-blue-400" />
                </div>
                <span class="font-medium text-gray-700 dark:text-gray-200">Profil</span>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer group">
              <div class="flex flex-col items-center text-center">
                <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <AppIcon name="shopping-bag" class="text-indigo-600 dark:text-indigo-400" />
                </div>
                <span class="font-medium text-gray-700 dark:text-gray-200">Pesanan</span>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer group">
              <div class="flex flex-col items-center text-center">
                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <AppIcon name="heart" class="text-purple-600 dark:text-purple-400" />
                </div>
                <span class="font-medium text-gray-700 dark:text-gray-200">Wishlist</span>
              </div>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer group">
              <div class="flex flex-col items-center text-center">
                <div class="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <AppIcon name="settings" class="text-teal-600 dark:text-teal-400" />
                </div>
                <span class="font-medium text-gray-700 dark:text-gray-200">Pengaturan</span>
              </div>
            </div>
          </div>
          
          <!-- Logout button with improved design -->
          <button 
            @click="logout"
            class="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <AppIcon name="log-out" />
            <span>Keluar dari Akun</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';
// import AppButton from '../atoms/AppButton.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

const userInitials = computed(() => {
  if (!user.value || !user.value.name) return '';
  return user.value.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Animation control
const isAnimating = ref(false);

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden');
  } else {
    setTimeout(() => {
      document.body.classList.remove('overflow-hidden');
    }, 300); // Match with transition duration
  }
});

const close = () => {
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  emit('close');
  
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

const login = () => {
  router.push('/login');
  close();
};

const register = () => {
  router.push('/register');
  close();
};

const loginWithGoogle = async () => {
  try {
    // Dapatkan URL redirect dari backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/auth/google/url`);
    const data = await response.json();
    
    if (data.status === 'success' && data.redirect_url) {
      // Redirect ke URL Google OAuth
      window.location.href = data.redirect_url;
    } else {
      console.error('Failed to get Google OAuth URL');
    }
  } catch (error) {
    console.error('Error during Google login:', error);
  }
  
  close();
};

const logout = async () => {
  await authStore.logout();
  close();
};
</script>

<style scoped>
/* Optional: Add some animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out;
}
</style>
