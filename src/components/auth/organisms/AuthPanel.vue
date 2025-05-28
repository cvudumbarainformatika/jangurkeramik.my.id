<template>
  <div 
    class="min-h-screen bg-white md:rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-100 transition-all duration-500 ease-out max-h-[90vh] overflow-y-auto"
  >
    <!-- Glass effect header -->
    <AuthHeader :title="headerTitle" @close="$emit('close')" />
    
    <!-- Not logged in state with modern UI -->
    <div v-if="!isLoggedIn" class="p-6">
      <!-- <AuthOptionsView 
        v-if="currentView === 'options'"
        @login-with-google="$emit('login-with-google')"
        @email-login="$emit('set-current-view', 'email-login')"
        @register="$emit('register')"
      /> -->
      
      <AuthEmailLoginView
        v-if="currentView === 'email-login' || currentView === 'options'"
        :login-form="loginForm"
        @update:loginForm="$emit('update:loginForm', $event)"
        :show-password="showPassword"
        :login-error="loginError"
        :is-loading="isLoading"
        @back="$emit('set-current-view', 'options')"
        @toggle-password="$emit('toggle-password')"
        @login="$emit('login-with-email')"
        @register="$emit('register')"
      />
      
      <AuthSocialProviderView
        v-else-if="currentView === 'social-provider-detected'"
        :social-provider="socialProvider"
        :email="loginForm.email"
        @back="$emit('set-current-view', 'options')"
        @login-with-provider="$emit('login-with-detected-provider')"
        @set-password="$emit('set-current-view', 'set-password')"
      />
      
      <AuthSetPasswordView
        v-else-if="currentView === 'set-password'"
        :email="loginForm.email"
        :passwordForm="passwordForm"
        @update:passwordForm="updatePasswordForm"
        :show-password="showPassword"
        :show-password-confirmation="showPasswordConfirmation"
        :password-error="passwordError"
        :is-loading="isLoading"
        @back="$emit('set-current-view', 'social-provider-detected')"
        @toggle-password="$emit('toggle-password')"
        @toggle-password-confirmation="$emit('toggle-password-confirmation')"
        @set-password="$emit('set-password')"
      />
    </div>
    
    <!-- Logged in state with modern UI -->
    <AuthUserProfileView
      v-else
      :user="user"
      :user-initials="userInitials"
      @logout="$emit('logout')"
      @avatar-error="$emit('handle-avatar-error', $event)"
    />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, computed } from 'vue';

// Lazy load header component - digunakan di semua view
const AuthHeader = defineAsyncComponent(() => 
  import('../molecules/AuthHeader.vue')
);

// Lazy load view components - hanya dimuat saat diperlukan
// const AuthOptionsView = defineAsyncComponent(() => 
//   import('./AuthOptionsView.vue')
// );
const AuthEmailLoginView = defineAsyncComponent(() => 
  import('./AuthEmailLoginView.vue')
);
const AuthSocialProviderView = defineAsyncComponent(() => 
  import('./AuthSocialProviderView.vue')
);
const AuthSetPasswordView = defineAsyncComponent(() => 
  import('./AuthSetPasswordView.vue')
);
const AuthUserProfileView = defineAsyncComponent(() => 
  import('./AuthUserProfileView.vue')
);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isLoggedIn: Boolean,
  user: Object,
  currentView: String,
  loginForm: Object,
  showPassword: Boolean,
  loginError: String,
  isLoading: Boolean,
  socialProvider: String,
  passwordForm: Object,
  showPasswordConfirmation: Boolean,
  passwordError: String,
  userInitials: String,
  headerTitle: String
});

const emit = defineEmits([
  'close',
  'login-with-google',
  'set-current-view',
  'register',
  'login-with-email',
  'toggle-password',
  'toggle-password-confirmation',
  'login-with-detected-provider',
  'set-password',
  'logout',
  'handle-avatar-error',
  'update:passwordForm',
  'update:loginForm'
]);

// Fungsi untuk meneruskan update passwordForm ke parent
const updatePasswordForm = (newPasswordForm) => {
  emit('update:passwordForm', newPasswordForm);
};
</script>
