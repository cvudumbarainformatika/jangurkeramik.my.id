<template>
  <div class="relative w-full h-[30vh]">
    <!-- Map container -->
    <div id="map" class="w-full h-full rounded-lg shadow-md"></div>

    <!-- Control buttons -->
    <div class="absolute top-4 right-4 space-y-2 z-[9999]">
      <button
        :class="[
          'px-4 py-2 rounded-lg font-semibold text-white shadow-md transition',
          isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        ]"
      >
        {{ isTracking ? 'Berhenti' : 'Mulai' }} Tracking
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)
const userMarker = ref(null)
const accuracyCircle = ref(null)
const watchId = ref(null)
const isTracking = ref(false)

// Default lokasi & zoom
const defaultZoom = 16
const defaultPosition = [-6.2, 106.8] // Jakarta

onMounted(() => {
  map.value = L.map('map', {
    minZoom: 3,
    maxZoom: 19,
    zoomControl: true,
  }).setView(defaultPosition, defaultZoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)


  startTracking()
})

// eslint-disable-next-line no-unused-vars
const toggleTracking = () => {
  isTracking.value ? stopTracking() : startTracking()
}

const startTracking = () => {
  if (!navigator.geolocation) {
    alert('Geolocation tidak didukung di perangkat ini.')
    return
  }

  isTracking.value = true

  watchId.value = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords
      updatePosition(latitude, longitude, accuracy)
    },
    (err) => {
      console.error('Geolocation error:', err)
      alert('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.')
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000
    }
  )
}

const stopTracking = () => {
  if (watchId.value) {
    navigator.geolocation.clearWatch(watchId.value)
    watchId.value = null
  }
  isTracking.value = false
}

const updatePosition = (lat, lng, accuracy) => {
  if (!map.value) return

  // Buat / update marker user
  if (!userMarker.value) {
    const icon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    })
    userMarker.value = L.marker([lat, lng], { icon }).addTo(map.value)
  } else {
    userMarker.value.setLatLng([lat, lng])
  }

  // Buat / update lingkaran akurasi
  if (!accuracyCircle.value) {
    accuracyCircle.value = L.circle([lat, lng], {
      radius: accuracy,
      color: 'blue',
      opacity: 0.2,
      fillOpacity: 0.1
    }).addTo(map.value)
  } else {
    accuracyCircle.value.setLatLng([lat, lng])
    accuracyCircle.value.setRadius(accuracy)
  }

  // Tentukan zoom berdasarkan akurasi
  const targetZoom =
    accuracy < 10 ? 18 :
    accuracy < 25 ? 17 :
    accuracy < 50 ? 16 :
    accuracy < 100 ? 15 :
    accuracy < 250 ? 14 : 13

  // Hanya ubah zoom jika perbedaan besar agar tidak "loncat"
  const currentZoom = map.value.getZoom()
  if (Math.abs(currentZoom - targetZoom) >= 1) {
    map.value.setView([lat, lng], targetZoom, { animate: true })
  } else {
    map.value.panTo([lat, lng])
  }
}

onBeforeUnmount(() => {
  stopTracking()
  if (map.value) map.value.remove()
})
</script>
