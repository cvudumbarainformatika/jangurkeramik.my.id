<template>
  <transition name="fade" appear>
    <div class="fixed inset-0 bg-black z-[9999] flex flex-col">
      <!-- Kamera fullscreen -->
      <QrcodeStream
        class="flex-1 object-cover"
        @decode="onDecode"
        @init="onInit"
      />

      <!-- Overlay: header -->
      <div class="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
        <div class="text-white font-semibold text-lg">Scan QR untuk Absen</div>
        <button
          class="text-white text-2xl font-bold hover:scale-110 transition-transform"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Fokus kotak + garis scan -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <!-- Kotak fokus -->
        <div class="relative w-56 h-56 border-4 border-white/80 rounded-xl overflow-hidden">
          <!-- Garis scan bergerak -->
          <div class="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan-line"></div>
        </div>
      </div>

      <!-- Overlay bawah -->
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-center p-6 text-white text-sm">
        Arahkan kamera ke QR code kantor Anda
      </div>
    </div>
  </transition>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'

const emit = defineEmits(['close', 'success'])

const onDecode = (result) => {
  console.log('QR decoded:', result)
  emit('success', result)
}

const onInit = (promise) => {
  promise.catch(err => {
    console.error('Camera error:', err)
    alert('Gagal mengakses kamera. Pastikan izin kamera aktif.')
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fullscreen video */
.qrcode-stream video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Animasi garis scan */
@keyframes scanLine {
  0% { top: 0; opacity: 0.8; }
  50% { top: calc(100% - 4px); opacity: 1; }
  100% { top: 0; opacity: 0.8; }
}

.animate-scan-line {
  animation: scanLine 2s linear infinite;
}
</style>
