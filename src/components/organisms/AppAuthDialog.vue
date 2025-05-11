<template>
  <div class="">
    <!-- Auth Dialog Overlay with improved blur effect -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 w-full h-[100vh] bg-black/20 backdrop-blur-md z-50 transition-all duration-300"
      @click="close"
    ></div>
    
    <!-- Auth Panel with modern design -->
    <transition 
      name="slide-right"
      appear
    >
      <div 
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center z-50 p-0 h-[100vh] flex flex-rows justify-end "
      >
        <AuthPanel 
          :is-logged-in="isLoggedIn"
          :user="user"
          :current-view="currentView"
          :login-form="loginForm"
          @update:loginForm="loginForm = $event"
          :show-password="showPassword"
          :login-error="loginError"
          :is-loading="isLoading"
          :social-provider="socialProvider"
          :password-form="passwordForm"
          @update:passwordForm="passwordForm = $event"
          :show-password-confirmation="showPasswordConfirmation"
          :password-error="passwordError"
          :user-initials="userInitials"
          :header-title="getHeaderTitle"
          @close="close"
          @login-with-google="loginWithGoogle"
          @set-current-view="currentView = $event"
          @register="register"
          @login-with-email="loginWithEmail"
          @toggle-password="showPassword = !showPassword"
          @toggle-password-confirmation="showPasswordConfirmation = !showPasswordConfirmation"
          @login-with-detected-provider="loginWithDetectedProvider"
          @set-password="setPasswordForSocialAccount"
          @logout="logout"
          @handle-avatar-error="handleAvatarError"
        />
      </div>
    </transition>
  </div>
  <AuthLinkAccountPrompt
    v-if="showLinkAccountPrompt"
    :link-provider="linkProvider"
    :is-loading="isLoading"
    @cancel="showLinkAccountPrompt = false"
    @link="linkAccounts"
  />
</template>

<script setup>
import { computed, ref, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { api, refreshCsrfToken } from 'src/boot/axios';

// Lazy load components
const AuthPanel = defineAsyncComponent(() => 
  import('../auth/organisms/AuthPanel.vue')
);
const AuthLinkAccountPrompt = defineAsyncComponent(() => 
  import('../auth/molecules/AuthLinkAccountPrompt.vue')
);

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
// eslint-disable-next-line no-unused-vars
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
