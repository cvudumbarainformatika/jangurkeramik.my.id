<template>
  <div>
    <div class="text-center mb-8">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
        <AppIcon name="user" size="xl" class="text-white" />
      </div>
      <div class="text-lg font-medium text-gray-800 mb-2">Masuk ke Akun Anda</div>
      <p class="text-gray-500">Akses fitur eksklusif dan kelola pesanan Anda</p>
    </div>
    <!-- <div class="mb-6">
      <h4 class="text-lg font-medium text-gray-800 mb-2">Masuk dengan Email</h4>
      <p class="text-gray-500">Masukkan email dan password Anda</p>
    </div> -->
    
    <!-- Login form -->
    <form @submit.prevent="$emit('login')" class="space-y-4">
      <!-- Email input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input 
          id="email"
          v-model="localEmail"
          type="text" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="username"
          required
        />
      </div>
      
      <!-- Password input -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div class="relative">
          <input 
            id="password"
            v-model="localPassword"
            :type="showPassword ? 'text' : 'password'" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Masukkan password"
            required
          />
          <button 
            type="button"
            @click="$emit('toggle-password')"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <AppIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
          </button>
        </div>
      </div>
      
      <!-- Error message -->
      <div v-if="loginError" class="text-red-500 text-sm">
        {{ loginError }}
      </div>
      
      <!-- Login button -->
      <button 
        type="submit"
        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Memproses...' : 'Masuk' }}
      </button>
    </form>
    
    <!-- Back button and register link -->
    <div class="mt-6 flex justify-between items-center">
      <button 
        @click="$emit('back')"
        class="text-gray-600 hover:text-gray-800 flex items-center gap-1"
      >
        <AppIcon name="arrow-left" size="sm" />
        <span>Kembali</span>
      </button>
      
      <button 
        @click="$emit('register')"
        class="text-blue-600 hover:text-blue-800"
      >
        Daftar
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

const props = defineProps({
  loginForm: Object,
  showPassword: Boolean,
  loginError: String,
  isLoading: Boolean
});

const emit = defineEmits(['back', 'toggle-password', 'login', 'register', 'update:loginForm']);

// Buat local state untuk email dan password
const localEmail = ref(props.loginForm.email);
const localPassword = ref(props.loginForm.password);

// Watch perubahan pada localEmail dan emit event untuk update loginForm
watch(localEmail, (newValue) => {
  emit('update:loginForm', {
    ...props.loginForm,
    email: newValue + '@gmail.com'
  });
});

// Watch perubahan pada localPassword dan emit event untuk update loginForm
watch(localPassword, (newValue) => {
  emit('update:loginForm', {
    ...props.loginForm,
    password: newValue
  });
});
</script>
