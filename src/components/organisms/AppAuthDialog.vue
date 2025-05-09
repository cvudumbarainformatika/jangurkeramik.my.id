<template>
  <div>
    <!-- Auth Dialog Overlay with improved blur effect -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/20 backdrop-blur-md z-50 transition-all duration-300"
      @click="close"
    ></div>
    
    <!-- Auth Panel with modern design -->
    <transition 
      name="slide-right"
      appear
    >
      <div 
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center z-50 p-0 h-[100vh] flex flex-rows justify-end"
      >
        <div 
          class="min-h-screen bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-100 transition-all duration-500 ease-out max-h-[90vh] overflow-y-auto"
        >
          <!-- Glass effect header -->
          <div class="relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
            <div class="relative p-6 flex justify-between items-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {{ getHeaderTitle }}
              </div>
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
            <!-- Login options view -->
            <div v-if="currentView === 'options'">
              <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                  <AppIcon name="user" size="xl" class="text-white" />
                </div>
                <h4 class="text-lg font-medium text-gray-800 mb-2">Masuk ke Akun Anda</h4>
                <p class="text-gray-500">Akses fitur eksklusif dan kelola pesanan Anda</p>
              </div>
              
              <!-- Auth buttons with modern styling -->
              <div class="flex flex-col gap-6">
                <!-- Google login button with improved design -->
                <button 
                  @click="loginWithGoogle"
                  class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span class="text-gray-700 font-medium">Lanjutkan dengan Google</span>
                </button>
                
                <!-- Email login button -->
                <button 
                  @click="currentView = 'email-login'"
                  class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                >
                  <AppIcon name="mail" class="text-white" />
                  <span>Masuk dengan Email</span>
                </button>
                
                <!-- Register button with subtle design -->
                <button 
                  @click="register"
                  class="w-full flex items-center justify-center gap-3 bg-gray-50 p-3 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
                >
                  <AppIcon name="user-plus" class="text-gray-500" />
                  <span>Daftar Akun Baru</span>
                </button>
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
            
            <!-- Email login form -->
            <div v-else-if="currentView === 'email-login'" class="animate-fade-in">
              <div class="mb-6">
                <button 
                  @click="currentView = 'options'" 
                  class="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <AppIcon name="arrow-left" size="sm" class="mr-1" />
                  <span class="text-sm">Kembali</span>
                </button>
              </div>
              
              <h4 class="text-xl font-medium text-gray-800 mb-6">Masuk dengan Email</h4>
              
              <!-- Login form -->
              <form @submit.prevent="loginWithEmail" class="flex flex-col gap-4">
                <!-- Email input -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    v-model="loginForm.email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <!-- Password input -->
                <div>
                  <div class="flex justify-between mb-1">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <a href="#" class="text-sm text-blue-600 hover:underline">Lupa password?</a>
                  </div>
                  <div class="relative">
                    <input 
                      id="password"
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Masukkan password Anda"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <button 
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <AppIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
                    </button>
                  </div>
                </div>
                
                <!-- Error message -->
                <div v-if="loginError" class="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {{ loginError }}
                </div>
                
                <!-- Submit button -->
                <button 
                  type="submit"
                  class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 mt-2"
                  :disabled="isLoading"
                >
                  <AppIcon v-if="isLoading" name="loader-2" class="animate-spin" />
                  <span>{{ isLoading ? 'Memproses...' : 'Masuk' }}</span>
                </button>
                
                <div class="text-center mt-4">
                  <p class="text-sm text-gray-600">
                    Belum punya akun? 
                    <button 
                      type="button"
                      @click="register" 
                      class="text-blue-600 hover:underline font-medium"
                    >
                      Daftar sekarang
                    </button>
                  </p>
                </div>
              </form>
            </div>
            
            <!-- Tampilan untuk social provider detected dengan UI yang lebih profesional -->
            <div v-else-if="currentView === 'social-provider-detected'" class="animate-fade-in">
              <div class="mb-6">
                <button 
                  @click="currentView = 'options'" 
                  class="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <AppIcon name="arrow-left" size="sm" class="mr-1" />
                  <span class="text-sm">Kembali ke Opsi Login</span>
                </button>
              </div>
              
              <div class="text-center mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                  <svg v-if="socialProvider === 'google'" class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <AppIcon v-else :name="socialProvider" class="w-10 h-10 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-800 mb-2">Akun Terdaftar dengan {{ getProviderName(socialProvider) }}</h4>
                <p class="text-gray-600 mb-4">
                  Email <span class="font-medium">{{ loginForm.email }}</span> sudah terdaftar menggunakan {{ getProviderName(socialProvider) }}. 
                </p>
                <div class="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-6">
                  <div class="flex items-start">
                    <AppIcon name="info" class="mt-0.5 mr-2 text-blue-500" />
                    <p>
                      Anda memiliki dua opsi untuk masuk ke akun ini:
                      <ul class="list-disc ml-5 mt-2 space-y-1">
                        <li>Login menggunakan {{ getProviderName(socialProvider) }}</li>
                        <li>Atur password untuk login dengan email dan password</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col gap-4">
                <!-- Login dengan provider yang terdeteksi -->
                <button 
                  @click="loginWithDetectedProvider"
                  class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <svg v-if="socialProvider === 'google'" class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span class="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Lanjutkan dengan {{ getProviderName(socialProvider) }}</span>
                </button>
                
                <!-- Opsi untuk mengatur password -->
                <button 
                  @click="currentView = 'set-password'"
                  class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                >
                  <AppIcon name="key" class="text-white" />
                  <span>Atur Password untuk Akun Ini</span>
                </button>
              </div>
            </div>
            
            <!-- Tambahkan tampilan untuk set password -->
            <div v-else-if="currentView === 'set-password'" class="animate-fade-in">
              <div class="mb-6">
                <button 
                  @click="currentView = 'social-provider-detected'" 
                  class="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <AppIcon name="arrow-left" size="sm" class="mr-1" />
                  <span class="text-sm">Kembali</span>
                </button>
              </div>
              
              <h4 class="text-xl font-medium text-gray-800 mb-6">Atur Password untuk Akun Anda</h4>
              
              <form @submit.prevent="setPasswordForSocialAccount" class="flex flex-col gap-4">
                <!-- Email input (disabled) -->
                <div>
                  <label for="email-set-password" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email-set-password"
                    v-model="loginForm.email"
                    type="email"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700"
                    disabled
                  />
                </div>
                
                <!-- Password input -->
                <div>
                  <label for="password-set" class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                  <div class="relative">
                    <input 
                      id="password-set"
                      v-model="passwordForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Masukkan password baru"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <button 
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <AppIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Password minimal 6 karakter</p>
                </div>
                
                <!-- Password confirmation input -->
                <div>
                  <label for="password-confirmation" class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <div class="relative">
                    <input 
                      id="password-confirmation"
                      v-model="passwordForm.password_confirmation"
                      :type="showPasswordConfirmation ? 'text' : 'password'"
                      placeholder="Konfirmasi password baru"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <button 
                      type="button"
                      @click="showPasswordConfirmation = !showPasswordConfirmation"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <AppIcon :name="showPasswordConfirmation ? 'eye-off' : 'eye'" size="sm" />
                    </button>
                  </div>
                </div>
                
                <!-- Error message -->
                <div v-if="passwordError" class="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {{ passwordError }}
                </div>
                
                <!-- Submit button -->
                <button 
                  type="submit"
                  class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 mt-2"
                  :disabled="isLoading"
                >
                  <AppIcon v-if="isLoading" name="loader-2" class="animate-spin" />
                  <span>{{ isLoading ? 'Memproses...' : 'Atur Password & Login' }}</span>
                </button>
              </form>
            </div>
          </div>
        
          <!-- Logged in state with modern UI -->
          <div v-else class="p-6">
            <div class="flex items-center mb-8">
              <div class="relative">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <img 
                    v-if="user?.avatar" 
                    :src="user.avatar" 
                    alt="User avatar" 
                    class="w-full h-full object-cover rounded-full" 
                    referrerpolicy="no-referrer"
                    @error="handleAvatarError"
                  />
                  <span v-else class="text-white font-bold text-2xl">{{ userInitials }}</span>
                </div>
                <div class="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-medium text-gray-800">{{ user?.nama || user?.name }}</div>
                <p class="text-gray-500">{{ user?.email }}</p>
              </div>
            </div>
            
            <!-- User menu with modern cards -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                <div class="flex flex-col items-center text-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <AppIcon name="user" class="text-blue-600" />
                  </div>
                  <span class="font-medium text-gray-700">Profil</span>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                <div class="flex flex-col items-center text-center">
                  <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <AppIcon name="shopping-bag" class="text-indigo-600" />
                  </div>
                  <span class="font-medium text-gray-700">Pesanan</span>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                <div class="flex flex-col items-center text-center">
                  <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <AppIcon name="heart" class="text-purple-600" />
                  </div>
                  <span class="font-medium text-gray-700">Wishlist</span>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                <div class="flex flex-col items-center text-center">
                  <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <AppIcon name="settings" class="text-teal-600" />
                  </div>
                  <span class="font-medium text-gray-700">Pengaturan</span>
                </div>
              </div>
            </div>
            
            <!-- Logout button with improved design -->
            <button 
              @click="logout"
              class="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
            >
              <AppIcon name="log-out" />
              <span>Keluar dari Akun</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <div v-if="showLinkAccountPrompt" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4">Hubungkan Akun</h3>
      <p class="mb-4">
        Email ini sudah terdaftar menggunakan {{ getProviderName(linkProvider) }}. 
        Apakah Anda ingin menghubungkan akun tersebut dengan email dan password?
      </p>
      <div class="flex justify-end gap-2">
        <button 
          @click="showLinkAccountPrompt = false" 
          class="px-4 py-2 border rounded-lg"
        >
          Batal
        </button>
        <button 
          @click="linkAccounts" 
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
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { api, refreshCsrfToken } from 'src/boot/axios';
import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';

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

// View management
const currentView = ref('options'); // 'options', 'email-login'

// Login form
const loginForm = ref({
  email: '',
  password: ''
});
const showPassword = ref(false);
const loginError = ref('');
const isLoading = ref(false);

// Computed properties
const userInitials = computed(() => {
  const nama = (user.value?.nama || user.value?.name) ?? '';
  if (!nama) return '';
  
  return nama
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

const getHeaderTitle = computed(() => {
  if (isLoggedIn.value) return 'Akun Saya';
  if (currentView.value === 'email-login') return 'Masuk';
  return 'Selamat Datang';
});

// Animation control
const isAnimating = ref(false);

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden');
    // Reset view to options when dialog opens
    currentView.value = 'options';
    // Reset form
    loginForm.value = { email: '', password: '' };
    loginError.value = '';
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

// eslint-disable-next-line no-unused-vars
const login = () => {
  currentView.value = 'email-login';
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
};

const loginWithEmail = async () => {
  try {
    isLoading.value = true;
    loginError.value = '';
    
    // Refresh CSRF token sebelum login
    await refreshCsrfToken();
    
    // Panggil API login
    const response = await api.post('api/v2/auth/email/login', {
      email: loginForm.value.email,
      password: loginForm.value.password
    });
    
    // Jika berhasil, simpan data user dan token
    if (response.data.success) {
      await authStore.setAuth(response.data.token, response.data.user, 'email');
      close();
    } else if (response.data.provider) {
      // Kasus khusus: user terdaftar dengan provider sosial
      socialProvider.value = response.data.provider;
      
      // Langsung tampilkan opsi untuk login dengan provider atau set password
      currentView.value = 'social-provider-detected';
    } else {
      loginError.value = response.data.message || 'Login gagal. Silakan coba lagi.';
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Cek apakah error berisi informasi tentang social provider
    if (error.response?.data?.provider) {
      socialProvider.value = error.response.data.provider;
      currentView.value = 'social-provider-detected';
    } else {
      loginError.value = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
    }
  } finally {
    isLoading.value = false;
  }
};

const logout = async () => {
  await authStore.logout();
  close();
};

// Handler untuk error loading avatar
const handleAvatarError = (event) => {
  console.error('Error loading avatar image:', event);
  // Tandai avatar sebagai tidak tersedia sehingga fallback ke inisial
  if (user.value) {
    user.value.avatar = null;
  }
};

// Tambahkan state untuk prompt linking
const showLinkAccountPrompt = ref(false);
const linkProvider = ref('');

// Fungsi untuk menghubungkan akun
const linkAccounts = async () => {
  try {
    isLoading.value = true;
    
    const response = await api.post('api/v2/auth/link-accounts', {
      email: loginForm.value.email,
      password: loginForm.value.password,
      provider: linkProvider.value
    });
    
    if (response.data.success) {
      await authStore.setAuth(response.data.token, response.data.user);
      close();
    } else {
      loginError.value = response.data.message || 'Gagal menghubungkan akun.';
    }
  } catch (error) {
    loginError.value = error.response?.data?.message || 'Terjadi kesalahan saat menghubungkan akun.';
  } finally {
    isLoading.value = false;
    showLinkAccountPrompt.value = false;
  }
};

// Tambahkan state untuk social provider
const socialProvider = ref('');

// Fungsi untuk login dengan provider yang terdeteksi
const loginWithDetectedProvider = () => {
  if (socialProvider.value === 'google') {
    loginWithGoogle();
  } else if (socialProvider.value === 'facebook') {
    // Implementasi login Facebook jika ada
    console.log('Facebook login not implemented yet');
  } else if (socialProvider.value === 'twitter') {
    // Implementasi login Twitter jika ada
    console.log('Twitter login not implemented yet');
  }
};

// Tambahkan state untuk form password
const passwordForm = ref({
  password: '',
  password_confirmation: ''
});
const showPasswordConfirmation = ref(false);
const passwordError = ref('');

// Fungsi untuk mendapatkan nama provider yang user-friendly
const getProviderName = (provider) => {
  const providers = {
    'google': 'Google',
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'github': 'GitHub',
    'email': 'Email'
  };
  
  return providers[provider] || provider;
};

// Fungsi untuk mengatur password untuk akun social
const setPasswordForSocialAccount = async () => {
  try {
    // Validasi password
    if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
      passwordError.value = 'Konfirmasi password tidak cocok.';
      return;
    }
    
    if (passwordForm.value.password.length < 6) {
      passwordError.value = 'Password harus minimal 6 karakter.';
      return;
    }
    
    isLoading.value = true;
    passwordError.value = '';
    
    // Refresh CSRF token sebelum request
    await refreshCsrfToken();
    
    // Panggil API untuk set password
    const response = await api.post('api/v2/auth/email/set-password', {
      email: loginForm.value.email,
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation
    });
    
    if (response.data.success) {
      // Login berhasil setelah set password
      await authStore.setAuth(response.data.token, response.data.user);
      close();
    } else {
      passwordError.value = response.data.message || 'Gagal mengatur password.';
    }
  } catch (error) {
    console.error('Error setting password:', error);
    passwordError.value = error.response?.data?.message || 'Terjadi kesalahan saat mengatur password.';
  } finally {
    isLoading.value = false;
  }
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

/* Transisi slide dari kanan */
.slide-right-enter-active {
  transition: all 0.25s ease-out;
}

.slide-right-leave-active {
  transition: all 0.25s ease-in;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out;
}
</style>
