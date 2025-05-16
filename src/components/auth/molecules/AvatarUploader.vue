<template>
  <div class="relative">
    <!-- Avatar Preview -->
    <div 
      class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-2"
      :class="{ 'cursor-pointer': !disabled }"
      @click="!disabled && triggerFileInput()"
    >
      <img 
        v-if="previewUrl" 
        :src="previewUrl" 
        alt="Avatar Preview" 
        class="w-full h-full object-cover"
      />
      <div 
        v-else 
        class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold"
      >
        {{ userInitials }}
      </div>
      
      <!-- Upload Icon Overlay -->
      <div 
        v-if="!disabled"
        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
      >
        <AppIcon name="upload" class="text-white" size="24" />
      </div>
    </div>
    
    <!-- Hidden File Input -->
    <input 
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    
    <!-- Upload Button -->
    <button 
      v-if="!disabled && showButton"
      @click="triggerFileInput"
      class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm flex items-center justify-center gap-2 mx-auto"
    >
      <AppIcon name="upload" size="16" />
      <span>Ubah Avatar</span>
    </button>
    
    <!-- Loading Indicator -->
    <div v-if="isUploading" class="mt-2 text-center text-sm text-gray-500">
      Mengupload...
    </div>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-2 text-center text-sm text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, defineAsyncComponent, computed, watch } from 'vue';
import { api } from 'src/boot/axios';

const AppIcon = defineAsyncComponent(() => 
  import('../../atoms/AppIcon.vue')
);

const props = defineProps({
  user: Object,
  userInitials: {
    type: String,
    default: 'U'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:avatar', 'upload-success', 'upload-error']);

const fileInput = ref(null);
const previewUrl = ref(props.user?.avatar || null);
const isUploading = ref(false);
const errorMessage = ref('');

// Watch untuk memperbarui preview jika avatar user berubah
watch(() => props.user?.avatar, (newAvatar) => {
  if (newAvatar && newAvatar !== previewUrl.value) {
    previewUrl.value = newAvatar;
  }
});

// Fungsi untuk memicu klik pada input file
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Fungsi untuk menangani perubahan file
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validasi tipe file
  if (!file.type.match('image.*')) {
    errorMessage.value = 'Hanya file gambar yang diperbolehkan';
    return;
  }
  
  // Validasi ukuran file (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = 'Ukuran file maksimal 2MB';
    return;
  }
  
  // Reset error
  errorMessage.value = '';
  
  // Tampilkan preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
  
  // Upload ke server
  await uploadAvatar(file);
};

// Fungsi untuk mengupload avatar ke server
const uploadAvatar = async (file) => {
  isUploading.value = true;
  
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('api/v2/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      // Emit event dengan URL avatar baru
      emit('update:avatar', response.data.avatar_url);
      emit('upload-success', response.data);
    } else {
      throw new Error(response.data.message || 'Gagal mengupload avatar');
    }
  } catch (error) {
    console.error('Avatar upload error:', error);
    errorMessage.value = error.response?.data?.message || 'Gagal mengupload avatar';
    emit('upload-error', error);
  } finally {
    isUploading.value = false;
  }
};
</script>