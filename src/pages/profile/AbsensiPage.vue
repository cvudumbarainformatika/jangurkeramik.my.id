<template>
  <ProfileApp>
    <template #default>
      <div class="h-full flex flex-col bg-white">

        <!-- Bagian Tengah -->
        <div class="flex-1 flex items-center justify-center">
          <div class="flex flex-col items-center text-center">

            <!-- Kondisi jika bukan status aktif -->
            <div v-if="scheduleStorage.statusStorage !== '1'">
              
              <!-- MASUK -->
              <div v-if="cond === 'masuk'" class="flex flex-col items-center">
                <AppIcon name="bell-ring" size="xl" class="text-red-500" />
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
          <div class="w-full bg-white rounded-lg shadow flex">
            
            <button
              class="w-1/2 py-3 text-white bg-gray-900 font-semibold active:scale-95 transition"
              @click="toScanQr"
            >
              Scan QR
            </button>

            <button
              class="w-1/2 py-3 text-white bg-teal-600 font-semibold active:scale-95 transition"
              @click="toScanFace"
            >
              Scan Wajah
            </button>

          </div>
        </div>

      </div>

    </template>
  </ProfileApp>
</template>

<script setup>
import ProfileApp from './comp/ProfileApp.vue'
import AppIcon from '../../components/atoms/AppIcon.vue'

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
  console.log('Scan QR diklik')
}

const toScanFace = () => {
  console.log('Scan Wajah diklik')
}
</script>