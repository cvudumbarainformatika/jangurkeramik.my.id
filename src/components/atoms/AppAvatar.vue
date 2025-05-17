<template>
        <div v-if="user && user?.avatar && !avatarError" class="relative">
          <img 
            :src="optimizedAvatarUrl" 
            :alt="user?.nama || user?.name" 
            class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            @error="handleAvatarError"
            loading="eager"
            referrerpolicy="no-referrer"
          />
          <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div 
          v-else 
          class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        >
          {{ userInitials }}
        </div>

</template>

<script setup>

import { computed, ref, onMounted } from 'vue';

const props = defineProps({
  user: Object,
});


// State untuk melacak error avatar
const avatarError = ref(false);

// Computed properties
const userInitials = computed(() => {
  const nama = (props?.user?.nama || props?.user?.name) ?? '';
  if (!nama) return 'A';
  
  return nama
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

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
const handleAvatarError = (event) => {
  console.error('Error loading avatar image:', event);
  avatarError.value = true;
};

// Validasi URL avatar saat komponen dimount
onMounted(() => {
  // Jika user memiliki avatar, validasi URL
  if (props?.user && props?.user?.avatar) {
    // Cek apakah URL valid
    const img = new Image();
    img.onerror = () => {
      console.log('Avatar URL tidak valid atau tidak dapat diakses:', props?.user?.avatar);
      avatarError.value = true;
    };
    // Gunakan URL yang dioptimalkan
    img.src = optimizedAvatarUrl.value;
  }
});


</script>