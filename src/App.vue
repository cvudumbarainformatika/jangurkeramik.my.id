<template>
  <router-view />
  <AppToast
    :show="toast.show"
    :message="toast.message"
    :type="toast.type"
    :title="toast.title"
    :position="toast.position"
    :show-brand-icon="toast.showBrandIcon"
    @close="toast.show = false"
  />
</template>

<script setup>
// Tidak perlu lagi memanggil initAuth karena state akan dimuat secara otomatis
// import InstallPrompt from 'src/components/atoms/InstallPrompt.vue'
import AppToast from 'src/components/atoms/AppToast.vue'
import { useToast } from 'src/composables/useToast'

const { toast } = useToast()
</script>
