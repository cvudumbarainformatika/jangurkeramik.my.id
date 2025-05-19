<template>
  <span
    :class="[
      'px-2 py-0.5 rounded text-xs font-semibold',
      statusColor
    ]"
  >
    {{ statusLabel }}
  </span>
</template>

<script setup>
const props = defineProps({ status: String })
const statusMap = {
  '1': { label: 'Diproses', color: 'bg-yellow-100 text-yellow-700' },
  '5': { label: 'Dikirim', color: 'bg-blue-100 text-blue-700' },
  '6': { label: 'Selesai', color: 'bg-green-100 text-green-700' },
  '9': { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
}
const statusLabel = statusMap[props.status]?.label || 'Unknown'
const statusColor = statusMap[props.status]?.color || 'bg-gray-200 text-gray-500'
</script>