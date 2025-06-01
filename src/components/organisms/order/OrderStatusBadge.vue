<template>
  <span
    :class="[
      'px-2 py-0.5 rounded-xl text-xs font-semibold',
      statusColor
    ]"
  >
    {{ statusLabel }}
  </span>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({ status: String })
const statusMap = {
//     - 2: menunggu persetujuan
// - 3: disetujui
// - 4: diproses

  '1': { label: 'Diproses', color: 'bg-yellow-200 text-yellow-700' },
  '2': { label: 'Diproses', color: 'bg-yellow-200 text-yellow-700' },
  '3': { label: 'Disetujui', color: 'bg-violet-200 text-violet-700' }, // sambil lakukan pembayaran
  '4': { label: 'Tunggu Pengiriman', color: 'bg-sky-200 text-sky-700' }, // setelah pembayaran
  '5': { label: 'Dikirim', color: 'bg-green-100 text-green-700' },
  '6': { label: 'Selesai', color: 'bg-blue-100 text-blue-700' },
  '9': { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
}
const statusLabel = computed(()=> {
  return statusMap[props.status]?.label || 'Unknown'
})
const statusColor = computed(()=> {
  return statusMap[props.status]?.color || 'bg-gray-200 text-gray-500'
})
</script>