<template>
  <transition name="fade" appear>
    <div class="fixed inset-0 bg-black z-[9999] flex flex-col">
      <!-- Kamera -->
      <QrcodeStream
        v-if="!scanned"
        class="flex-1 object-cover"
        @decode="onDecode"
        @init="onInit"
      />

      <!-- Tombol tutup -->
      <button
        class="absolute top-5 right-5 z-20 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-200 backdrop-blur-sm"
        @click="$emit('close')"
      >
        ✕
      </button>

      <!-- Overlay fokus tengah -->
      <div v-if="!scanned" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <!-- Lapisan gelap di luar kotak -->
        <div class="absolute inset-0 bg-black/70"></div>

        <!-- Kotak fokus -->
        <div class="relative w-64 h-64 rounded-xl overflow-hidden z-10 border border-white/20 shadow-[0_0_40px_rgba(0,255,255,0.2)]">
          <!-- Corner brackets -->
          <div class="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"></div>
          <div class="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"></div>
          <div class="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"></div>

          <!-- Garis laser -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 animate-scan-laser shadow-[0_0_10px_#22d3ee]"></div>
        </div>
      </div>

      <!-- Overlay bawah -->
      <div v-if="!scanned" class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-center p-6 text-white text-sm">
        Arahkan kamera ke QR code kantor Anda
      </div>

      <!-- ✅ Animasi sukses -->
      <transition name="scale">
        <div v-if="scanned" class="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
          <svg class="w-28 h-28 text-green-400 animate-bounce-slow" fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div class="mt-4 text-lg font-semibold text-green-400">QR Berhasil Dibaca</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const emit = defineEmits(['close', 'success'])
const scanned = ref(false)
const beep = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg')

const onDecode = (result) => {
  // Efek suara
  beep.currentTime = 0
  beep.play().catch(() => {})

  // Efek vibrasi di mobile
  if (navigator.vibrate) navigator.vibrate(150)

  // Tampilkan animasi sukses
  scanned.value = true
  emit('success', result)

  // Auto-close setelah 1.5 detik
  setTimeout(() => {
    emit('close')
  }, 1500)
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
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Video fullscreen */
.qrcode-stream video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Garis laser animasi */
@keyframes scanLaser {
  0% { top: 0; opacity: 0.9; }
  50% { top: calc(100% - 4px); opacity: 1; }
  100% { top: 0; opacity: 0.9; }
}
.animate-scan-laser {
  animation: scanLaser 2.5s ease-in-out infinite;
}

/* Animasi sukses */
@keyframes bounceSlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.animate-bounce-slow {
  animation: bounceSlow 1.5s infinite;
}

.scale-enter-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.scale-enter-from {
  transform: scale(0.5);
  opacity: 0;
}
</style>
