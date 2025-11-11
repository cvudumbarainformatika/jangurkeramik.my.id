<template>
  <div class="relative w-full h-[30vh]">
    <!-- Map container -->
    <div id="map" class="w-full h-full rounded-lg shadow-md"></div>

    <!-- Info jarak -->
    <div
      class="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow text-sm font-medium z-[9999]"
    >
      <div>
        📍 Jarak ke kantor:
        <span
          :class="distance < radiusKantor ? 'text-green-600' : 'text-red-500'"
        >
          {{ distance.toFixed(1) }} m
        </span>
      </div>
      <div>
        Status:
        <span
          :class="distance < radiusKantor ? 'text-green-600' : 'text-red-500'"
        >
          {{ distance < radiusKantor ? 'Di dalam area kantor' : 'Di luar area' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

const map = ref(null)
const userMarker = ref(null)
const accuracyCircle = ref(null)
const watchId = ref(null)
const isTracking = ref(false)

const distance = ref(0)
const radiusKantor = 100 // dalam meter
const kantorPos = { lat: -7.75868, lng: 113.2095 } // posisi kantor (Rumah Saya) -7.758685239074591, 113.2095317830789

const defaultZoom = 16
const defaultPosition = [kantorPos.lat, kantorPos.lng]

onMounted(() => {
  map.value = L.map('map', {
    minZoom: 3,
    maxZoom: 19,
    zoomControl: true,
  }).setView(defaultPosition, defaultZoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  // Tandai area kantor di peta (radius biru)
  L.circle(defaultPosition, {
    radius: radiusKantor,
    color: 'green',
    fillOpacity: 0.1,
  }).addTo(map.value)

  startTracking()
})

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

  // Hitung jarak user ke kantor
  distance.value = getDistanceFromLatLonInM(lat, lng, kantorPos.lat, kantorPos.lng)

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

  // Re-center map setiap update
  map.value.setView([lat, lng], map.value.getZoom(), { animate: true })
}

// Fungsi Haversine: menghitung jarak dua koordinat dalam meter
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // jari-jari bumi dalam meter
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // hasil dalam meter
}


watch(distance, (newValue) => {
  // console.log('watch distance', newValue);
  
  if (newValue < radiusKantor) {
    // eslint-disable-next-line vue/no-mutating-props
    props.store.bisaAbsen = true
    console.log('watch store', props.store.bisaAbsen);
  }
},
{
  immediate: true
})

onBeforeUnmount(() => {
  stopTracking()
  if (map.value) map.value.remove()
})
</script>
