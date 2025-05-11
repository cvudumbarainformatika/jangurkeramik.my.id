<template>
  <div>
    <div class="mb-6">
      <h4 class="text-lg font-medium text-gray-800 mb-2">Atur Password</h4>
      <p class="text-gray-500">Buat password untuk akun {{ email }}</p>
    </div>
    
    <!-- Password form -->
    <form @submit.prevent="$emit('set-password')" class="space-y-4">
      <!-- Password input -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div class="relative">
          <input 
            id="password"
            v-model="localPassword"
            :type="showPassword ? 'text' : 'password'" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Buat password baru"
            required
            minlength="6"
          />
          <button 
            type="button"
            @click="$emit('toggle-password')"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <AppIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
      </div>
      
      <!-- Password confirmation input -->
      <div>
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
        <div class="relative">
          <input 
            id="password_confirmation"
            v-model="localPasswordConfirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Konfirmasi password"
            required
          />
          <button 
            type="button"
            @click="$emit('toggle-password-confirmation')"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <AppIcon :name="showPasswordConfirmation ? 'eye-off' : 'eye'" size="sm" />
          </button>
        </div>
      </div>
      
      <!-- Error message -->
      <div v-if="passwordError" class="text-red-500 text-sm">
        {{ passwordError }}
      </div>
      
      <!-- Submit button -->
      <button 
        type="submit"
        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Memproses...' : 'Atur Password' }}
      </button>
    </form>
    
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
import { defineAsyncComponent, ref, watch } from 'vue';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

const props = defineProps({
  email: String,
  passwordForm: {
    type: Object,
    required: true,
    default: () => ({
      password: '',
      password_confirmation: ''
    })
  },
  showPassword: Boolean,
  showPasswordConfirmation: Boolean,
  passwordError: String,
  isLoading: Boolean
});

const emit = defineEmits(['back', 'toggle-password', 'toggle-password-confirmation', 'set-password', 'update:passwordForm']);

// Buat local state untuk password dan konfirmasi password
const localPassword = ref(props.passwordForm.password);
const localPasswordConfirmation = ref(props.passwordForm.password_confirmation);

// Watch perubahan pada localPassword dan emit event untuk update passwordForm
watch(localPassword, (newValue) => {
  emit('update:passwordForm', {
    ...props.passwordForm,
    password: newValue
  });
});

// Watch perubahan pada localPasswordConfirmation dan emit event untuk update passwordForm
watch(localPasswordConfirmation, (newValue) => {
  emit('update:passwordForm', {
    ...props.passwordForm,
    password_confirmation: newValue
  });
});
</script>
