<template>
  <ProfileApp>
    <template #default>
      <div class="h-full flex flex-col bg-white">

        <!-- 🕒 Tambahkan komponen jam digital di sini -->
        <DigitalClock class="pt-6"/>

        <!-- Bagian Tengah -->
        <div class="flex-1 flex items-center justify-center">
          <div class="flex flex-col items-center text-center">

            <!-- Kondisi jika bukan status aktif -->
            <div v-if="scheduleStorage.statusStorage !== '1'">
              
              <!-- MASUK -->
              <div v-if="cond === 'masuk'" class="flex flex-col items-center">
                <AppIcon name="bell-ring" size="2xl" class="text-red-500 animate-bell" />
                <div class="text-xs font-bold text-red-500 mt-3">Saatnya Absen</div>
              </div>

              <!-- PULANG -->
              <div v-else-if="cond === 'pulang'" class="flex flex-col items-center">
                <AppIcon name="timer" size="xl" class="text-red-500" />
                <div class="text-xs font-bold text-red-500 mt-3">Saatnya Pulang</div>
              </div>

              <!-- TIDAK ADA JADWAL -->
              <div v-else class="flex flex-col items-center">
                <AppIcon name="check-circle" size="xl" class="text-teal-500" />
                <div class="text-xs font-bold text-teal-500 mt-3">Belum Ada Jadwal</div>
              </div>

            </div>

            <!-- STATUS STORAGE = 1 (tidak ada jadwal) -->
            <div v-else class="flex flex-col items-center">
              <AppIcon name="coffee" size="xl" class="text-blue-500" />
              <div class="text-xs font-bold text-blue-500 mt-3">Tidak Ada Jadwal</div>
            </div>

          </div>
        </div>

        <!-- Bagian Tombol -->
        <div class="w-full">
          <RealtimeMap :store="store" />
          <div class="w-full bg-white rounded-lg shadow flex">
            <button
              class="w-full py-3 text-white font-semibold active:scale-95 transition"
              :class="store.bisaAbsen ? 'bg-primary': 'bg-red-800'"
              @click="toScanQr"
              :disabled="!store.bisaAbsen"
            >
              {{ store.bisaAbsen ? 'Scan QR' : 'Jauh Dari Kantor' }}
            </button>

          </div>
        </div>

      </div>


      <ScanQrModal
        v-if="showQrModal"
        @close="showQrModal = false"
        @success="handleScanSuccess"
      />

    </template>
  </ProfileApp>
</template>

<script setup>
import { ref } from 'vue'
import ProfileApp from './comp/ProfileApp.vue'
import AppIcon from '../../components/atoms/AppIcon.vue'
import RealtimeMap from './compAbsensiPage/RealtimeMap.vue'
import ScanQrModal from './compAbsensiPage/ScanQrModal.vue'
import DigitalClock from './compAbsensiPage/DigitalClock.vue'
import { useAbsenStore } from 'src/stores/absen-store'

const store = useAbsenStore()

const showQrModal = ref(false)

// ✅ Dummy data sesuai permintaan
const scheduleStorage = {
  statusStorage: '0' // ubah ke "1" untuk simulasi "Tidak Ada Jadwal"
}

// ✅ Kondisi dummy: "masuk" | "pulang" | lainnya
const cond = 'masuk' 
// const cond = 'pulang'
// const cond = 'none'

// ✅ Dummy handler
const toScanQr = () => {
  // console.log('Scan QR diklik')
  showQrModal.value = true
}

const handleScanSuccess = (result) => {
  console.log('Hasil scan:', result)
  showQrModal.value = false
  // TODO: panggil API absen di sini
}
</script>

<style scoped>
@keyframes bell-ring {
  0% { transform: rotate(0); }
  10% { transform: rotate(20deg); }
  20% { transform: rotate(-18deg); }
  30% { transform: rotate(16deg); }
  40% { transform: rotate(-14deg); }
  50% { transform: rotate(12deg); }
  60% { transform: rotate(-10deg); }
  70% { transform: rotate(8deg); }
  80% { transform: rotate(-6deg); }
  90% { transform: rotate(4deg); }
  100% { transform: rotate(0); }
}

.animate-bell {
  display: inline-block;
  transform-origin: top center;
  animation: bell-ring 1.2s ease-in-out infinite;
}
</style>