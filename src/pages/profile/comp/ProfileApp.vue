<template>
  <div class="max-w-xl mx-auto flex flex-col h-[calc(100vh-64px)]">
    
    <!-- HEADER (fixed pada konteks flex) -->
    <div class="shrink-0">
      <slot name="header">
        <HeaderApp :user="user" />
      </slot>
    </div>

    <!-- CONTENT -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <slot />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import HeaderApp from './HeaderApp.vue'
const authStore = useAuthStore()
const user = computed(() => authStore.user || {})
</script>