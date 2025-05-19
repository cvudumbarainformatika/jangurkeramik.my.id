<template>
  <div class="max-w-xl mx-auto py-8 px-4">
    <!-- Profile Card -->
    <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center relative mb-8">
      <img
        :src="user.avatar || '/images/default-avatar.png'"
        class="w-28 h-28 rounded-full border-4 border-primary object-cover shadow"
        alt="Avatar"
      />
      <button
        class="absolute top-4 right-4 bg-primary text-white rounded-full p-2 shadow hover:bg-primary-dark transition"
        title="Edit Profil"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z"/>
          <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"/>
        </svg>
      </button>
      <div class="mt-4 text-center">
        <div class="text-2xl font-bold text-gray-800 capitalize">{{ user.nama }}</div>
        <div class="text-sm text-gray-500 mb-1">{{ user.email }}</div>
        <div class="flex flex-center gap-2">
          <div class="bg-gray-100 px-2 py-0.5 rounded">Username: {{ user.username }}</div>
          <div class="bg-blue-100 px-2 py-0.5 rounded">{{ user.jabatan }}</div>
        </div>
        <div class="mt-2 flex items-center justify-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-700 text-sm font-medium">
            <svg v-if="user.provider === 'google'" class="w-8 h-8 mr-1" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.17-1.37 3.43-5.273 3.43-3.176 0-5.77-2.626-5.77-5.858s2.594-5.858 5.77-5.858c1.81 0 3.03.77 3.73 1.43l2.55-2.48C17.07 3.7 15.13 2.7 12.625 2.7c-5.02 0-9.09 4.07-9.09 9.09s4.07 9.09 9.09 9.09c5.24 0 8.71-3.68 8.71-8.88 0-.6-.07-1.06-.16-1.57z"/><path fill="#34A853" d="M3.548 7.605l3.25 2.384c.7-1.36 2.01-2.384 3.827-2.384 1.08 0 2.07.37 2.84.97l2.54-2.48C14.66 4.13 13.13 3.5 11.625 3.5c-2.97 0-5.48 1.98-6.41 4.105z"/><path fill="#FBBC05" d="M12.625 21.79c2.5 0 4.6-.83 6.13-2.26l-2.82-2.31c-.77.53-1.75.85-3.31.85-2.54 0-4.68-1.7-5.45-4.01l-3.31 2.56c1.36 2.7 4.25 4.17 8.76 4.17z"/><path fill="#EA4335" d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.17-1.37 3.43-5.273 3.43-3.176 0-5.77-2.626-5.77-5.858s2.594-5.858 5.77-5.858c1.81 0 3.03.77 3.73 1.43l2.55-2.48C17.07 3.7 15.13 2.7 12.625 2.7c-5.02 0-9.09 4.07-9.09 9.09s4.07 9.09 9.09 9.09c5.24 0 8.71-3.68 8.71-8.88 0-.6-.07-1.06-.16-1.57z"/></g></svg>
            {{ user.provider }}
          </span>
          <span v-if="user.email_verified_at" class="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-sm font-medium">
            <svg class="w-8 h-8 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            Email terverifikasi
          </span>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="bg-white rounded-xl shadow p-6 space-y-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="mb-2 text-gray-700 font-semibold text-lg">Informasi Kontak</div>
          <div class="flex flex-col gap-1 text-sm text-gray-600">
            <div><span class="font-medium">Email:</span> {{ user.email }}</div>
            <div><span class="font-medium">No. HP:</span> {{ user.nohp || '-' }}</div>
            <div><span class="font-medium">Alamat:</span> {{ user.alamat || '-' }}</div>
          </div>
        </div>
        <div class="flex-1">
          <div class="mb-2 text-gray-700 font-semibold">Akun</div>
          <div class="flex flex-col gap-1 text-sm text-gray-600">
            <div><span class="font-medium">Username:</span> {{ user.username }}</div>
            <div><span class="font-medium">Akun :</span> {{ user.jabatan }}</div>
            <!-- <div><span class="font-medium">Kode Jabatan:</span> {{ user.kodejabatan }}</div> -->
            <div><span class="font-medium">Dibuat:</span> {{ formatDate(user.created_at) }}</div>
            <div><span class="font-medium">Update Terakhir:</span> {{ formatDate(user.updated_at) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'

const authStore = useAuthStore()
const user = computed(() => authStore.user || {})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.bg-primary {
  @apply bg-blue-600;
}
.bg-primary-dark {
  @apply bg-blue-800;
}
</style>
