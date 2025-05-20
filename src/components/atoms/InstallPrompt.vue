<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-white shadow-xl rounded-xl flex items-center gap-3 px-4 py-3 border border-gray-200 max-w-md mx-auto"
    >
      <AppIcon name="download" class="text-primary w-7 h-7" />
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-gray-800 text-sm">Install Aplikasi</div>
        <div class="text-xs text-gray-500 truncate">Dapatkan pengalaman terbaik dengan menginstal aplikasi ini di perangkat Anda.</div>
      </div>
      <button
        @click="install"
        class="ml-2 px-4 py-1.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-orange-600 transition"
      >
        Install
      </button>
      <button
        @click="close"
        class="ml-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        aria-label="Tutup"
      >
        <AppIcon name="x" class="w-5 h-5 text-gray-400" />
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'

const show = ref(false)
let deferredPrompt = null

function close() {
  show.value = false
}

function install() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      show.value = false
      deferredPrompt = null
    })
  }
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event triggered');
    
    e.preventDefault()
    deferredPrompt = e
    show.value = true
  })
  // Optional: hide prompt if already installed
  window.addEventListener('appinstalled', () => {
    show.value = false
    deferredPrompt = null
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
/* .bg-primary {
  @apply bg-orange-500;
}
.text-primary {
  @apply text-orange-600;
} */
</style>