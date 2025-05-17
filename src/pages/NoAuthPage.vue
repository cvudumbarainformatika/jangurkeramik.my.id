<template>
  <div class="min-h-screen bg-gray-200">
    <div class="container mx-auto px-4 py-6">
      <div class="text-center py-16 bg-white rounded-xl shadow-sm">
        <!-- <AppIcon name="shopping-cart" size="xl" class="mx-auto mb-4 text-gray-300" /> -->
        <AppIcon name="users" size="xl" class="mx-auto mb-4 text-gray-300" />
        <div class="text-xl font-semibold text-gray-700 mb-2">Anda Belum Login</div>
        <p class="text-gray-500 mb-6">Harap Login Dahulu Sebelum Mengakses Menu Ini</p>
        <div class="mt-8 flex flex-col gap-6 items-center">
          <button
            @click="isAuthDialogOpen = true"
            class="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-md transition-all"
          >
            Mulai Login
          </button>
          <button
            @click="$router.push('/')"
            class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-full hover:shadow-md transition-all"
          >
            Kembali Ke Home
          </button>
        </div>
      </div>
    </div>




    <AppAuthDialog 
    :isOpen="isAuthDialogOpen" 
    @close="isAuthDialogOpen = false" 
    />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import AppIcon from 'src/components/atoms/AppIcon.vue';

const AppAuthDialog = defineAsyncComponent(()=> import('../components/organisms/AppAuthDialog.vue'))

const isAuthDialogOpen = ref(false);

</script>
