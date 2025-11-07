<template>
  <div class="flex justify-between items-center bg-primary/50 text-white px-2 py-2">
    <!-- Kiri -->
    <div class="flex items-center">
      <!-- Avatar -->
       <AppAvatar
        :user="user"
        size="10"
        alt="Avatar"
      />

      <!-- Teks -->
      <div class="flex flex-col ml-2">
        <div class="text-[10px]">Selamat Datang, 👋</div>
        <div class="text-[12px] font-semibold">
          {{ user?.nama }}
        </div>
      </div>
    </div>

    <!-- Kanan -->
    <div class="flex items-center">
      <i class="eva eva-bell-outline text-white text-[18px]"></i>
      <!-- Jika pakai material icons gunakan ini:
      <i class="material-icons text-[18px]">notifications_none</i>
      -->
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const AppAvatar = defineAsyncComponent(() => import('src/components/atoms/AppAvatar.vue'))
defineProps({
  user: {
    type: Object,
    default: null,
  }
})
</script>
