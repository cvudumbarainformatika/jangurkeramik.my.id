<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Main content -->
    <main class="max-w-7xl mx-auto bg-gray-100 oerflow-visible">
      <router-view v-slot="{ Component }">
        <transition 
          :name="getTransitionName()" 
          mode="out-in"
          :duration="{ enter: 300, leave: 250 }"
        >
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// eslint-disable-next-line no-unused-vars
const router = useRouter();
const route = useRoute();

// Deteksi mobile
const isMobile = ref(false);
// Untuk menyimpan riwayat navigasi
const routeHistory = ref([]);
// Arah navigasi (forward atau backward)
const navigationDirection = ref('forward');

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

// Fungsi untuk mendapatkan nama transisi berdasarkan arah navigasi dan device
function getTransitionName() {
  if (!isMobile.value) {
    return 'fade'; // Desktop selalu menggunakan fade
  }
  
  // Mobile menggunakan transisi berbeda berdasarkan arah navigasi
  return navigationDirection.value === 'forward' ? 'ios-page-forward' : 'ios-page-backward';
}

// Watch perubahan route untuk mendeteksi arah navigasi
watch(() => route.fullPath, (newPath) => {
  // Jika riwayat kosong, ini adalah navigasi pertama
  if (routeHistory.value.length === 0) {
    routeHistory.value.push(newPath);
    navigationDirection.value = 'forward';
    return;
  }
  
  // eslint-disable-next-line no-unused-vars
  const previousPath = routeHistory.value[routeHistory.value.length - 1];
  
  // Cek apakah ini navigasi mundur (kembali)
  if (routeHistory.value.length > 1 && routeHistory.value[routeHistory.value.length - 2] === newPath) {
    navigationDirection.value = 'backward';
    routeHistory.value.pop(); // Hapus path terakhir dari riwayat
  } else {
    // Ini adalah navigasi maju
    navigationDirection.value = 'forward';
    routeHistory.value.push(newPath);
  }
}, { immediate: true });

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style>
/* Transisi iOS-style untuk mobile - navigasi maju */
.ios-page-forward-enter-active {
  z-index: 1;
  position: absolute;
  width: 100%;
  animation: ios-page-in-forward 0.3s ease-out;
}

.ios-page-forward-leave-active {
  z-index: 0;
  position: absolute;
  width: 100%;
  animation: ios-page-out-forward 0.25s ease-in;
}

@keyframes ios-page-in-forward {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes ios-page-out-forward {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-30%);
    opacity: 0.7;
  }
}

/* Transisi iOS-style untuk mobile - navigasi mundur */
.ios-page-backward-enter-active {
  z-index: 0;
  position: absolute;
  width: 100%;
  animation: ios-page-in-backward 0.3s ease-out;
}

.ios-page-backward-leave-active {
  z-index: 1;
  position: absolute;
  width: 100%;
  animation: ios-page-out-backward 0.25s ease-in;
}

@keyframes ios-page-in-backward {
  from {
    transform: translateX(-30%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes ios-page-out-backward {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Transisi fade untuk desktop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.fade-slide-enter-active {
  transition: all 0.4s ease-out;
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
