<template>
  <div class="p-6 overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    <div class="flex flex-col items-center mb-6">
      <!-- User avatar or initials -->
      <div class="mb-4">
        <div v-if="user" class="relative">
          <!-- <img 
            :src="optimizedAvatarUrl" 
            :alt="user.nama || user.name" 
            class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            @error="handleAvatarError"
            loading="eager"
            referrerpolicy="no-referrer"
          /> -->
          <AppAvatar
            :user="user"
            size="20"
            alt="Avatar"
          />
          <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div 
          v-else 
          class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        >
          AA
        </div>
      </div>
      
      <!-- User name and email -->
      <div class="text-4xl font-bold text-gray-800 text-center">{{ user.nama || user.name }}</div>
      <p class="text-gray-500">{{ user.username }}</p>
      
      <!-- User role badge -->
      <div class="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {{ user?.jabatan || 'Pelanggan' }}
      </div>
    </div>
    
    <!-- User actions -->
    <div class="space-y-3">
      <!-- Profile button -->
      <button @click="$router.push({ path: '/profile' })"
        class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <AppIcon name="user" />
          </div>
          <span class="font-medium">Profil Saya</span>
        </div>
        <AppIcon name="chevron-right" />
      </button>
      
      <!-- Orders button -->
      <button @click="$router.push({ path: '/orders' })"
        class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <AppIcon name="shopping-bag" />
          </div>
          <span class="font-medium">Pesanan Saya</span>
        </div>
        <AppIcon name="chevron-right" />
      </button>
      
      <!-- Settings button -->
      <button class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <AppIcon name="settings" />
          </div>
          <span class="font-medium">Pengaturan</span>
        </div>
        <AppIcon name="chevron-right" />
      </button>
    </div>
    
    <!-- Logout button -->
    <div class="mt-6">
      <button 
        @click="$emit('logout')"
        class="w-full flex items-center justify-center gap-2 p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
      >
        <AppIcon name="log-out" />
        <span>Keluar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, computed } from 'vue';

const AppAvatar = defineAsyncComponent(() => import('src/components/atoms/AppAvatar.vue'))

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

const props = defineProps({
  user: Object,
});

const emit = defineEmits(['logout', 'avatar-error']);

// State untuk melacak error avatar
const avatarError = ref(false);

// Computed property untuk menentukan apakah avatar dari Google
const isGoogleAvatar = computed(() => {
  return props.user?.avatar?.includes('googleusercontent.com');
});

// Computed property untuk URL avatar yang dioptimalkan
const optimizedAvatarUrl = computed(() => {
  if (!props.user?.avatar) return null;
  
  let url = props.user.avatar;

  if (isGoogleAvatar.value) {
    url = url.replace('=s96-c', '=s64-c');
    // Tambah timestamp hanya jika sudah ada tanda `?`, untuk valid URL
    url += (url.includes('?') ? '&' : '?') + `t=${Date.now() % 1000000}`;
  }

  return url;
});

// Handler untuk error loading avatar
// eslint-disable-next-line no-unused-vars
const handleAvatarError = (event) => {
  console.error('Error loading avatar image:', event);
  avatarError.value = true;
  // Emit event ke parent component
  emit('avatar-error', event);
};

// Validasi URL avatar saat komponen dimount
onMounted(() => {
  // Jika user memiliki avatar, validasi URL
  if (props.user && props.user.avatar) {
    // Cek apakah URL valid
    const img = new Image();
    img.onerror = () => {
      console.log('Avatar URL tidak valid atau tidak dapat diakses:', props.user.avatar);
      avatarError.value = true;
      emit('avatar-error', { target: img });
    };
    // Gunakan URL yang dioptimalkan
    img.src = optimizedAvatarUrl.value;
  }
});
</script>
