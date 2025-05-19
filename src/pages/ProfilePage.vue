<template>
  <div class="max-w-xl mx-auto py-8 px-0">
    <!-- Profile Header -->
    <div class="flex flex-col items-center mb-8">
      <div class="relative">
        <img
          :src="user?.avatar || '/images/No-Image.png'"
          class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          alt="Avatar"
        />
        <button
          class="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 shadow hover:bg-primary-dark transition"
          title="Ganti Foto"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z"/>
            <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"/>
          </svg>
        </button>
      </div>
      <div class="mt-4 text-center">
        <div class="text-xl font-bold text-gray-800">{{ user?.nama || 'User' }}</div>
        <div class="text-sm text-gray-500">{{ user?.email }}</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b mb-6 bg-white px-0">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'flex-1 py-2 text-center font-semibold transition',
          activeTab === tab.value
            ? 'border-b-2 border-primary text-primary'
            : 'text-gray-500 hover:text-primary'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <transition name="fade" mode="out-in">
      <div :key="activeTab" class="h-full px-4">
        <!-- Info Tab -->
        <div v-if="activeTab === 'info'" class="space-y-4">
          <div class="bg-white rounded-xl shadow p-4">
            <div class="font-semibold mb-2 text-gray-700">Informasi Profil</div>
            <div class="flex flex-col gap-2">
              <div><span class="text-gray-500">Nama:</span> {{ user?.name || '-' }}</div>
              <div><span class="text-gray-500">Email:</span> {{ user?.email || '-' }}</div>
              <!-- Tambahkan info lain sesuai kebutuhan -->
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-else-if="activeTab === 'security'" class="space-y-4">
          <div class="bg-white rounded-xl shadow p-4">
            <div class="font-semibold mb-2 text-gray-700">Keamanan</div>
            <div class="flex items-center justify-between">
              <span>Password</span>
              <button
                v-if="hasPassword"
                @click="showChangePasswordModal = true"
                class="text-blue-600 hover:underline text-sm"
              >
                Ubah Password
              </button>
              <button
                v-else
                @click="showSetPasswordModal = true"
                class="text-blue-600 hover:underline text-sm"
              >
                Tambahkan Password
              </button>
            </div>
          </div>
        </div>

        <!-- Login Methods Tab -->
        <div v-else-if="activeTab === 'login-methods'" class="space-y-4">
          <div class="bg-white rounded-xl shadow p-4">
            <div class="font-semibold mb-2 text-gray-700">Metode Login Terhubung</div>
            <div class="space-y-3">
              <!-- Email -->
              <div class="flex items-center justify-between p-3 border rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <AppIcon name="mail" />
                  </div>
                  <div class="ml-3">
                    <div class="font-medium">Email & Password</div>
                    <div class="text-sm text-gray-500">{{ user.value?.email }}</div>
                  </div>
                </div>
                <div>
                  <button
                    v-if="hasPassword"
                    @click="showChangePasswordModal = true"
                    class="text-blue-600 hover:underline text-sm"
                  >
                    Ubah Password
                  </button>
                  <button
                    v-else
                    @click="showSetPasswordModal = true"
                    class="text-blue-600 hover:underline text-sm"
                  >
                    Tambahkan Password
                  </button>
                </div>
              </div>
              <!-- Google -->
              <div class="flex items-center justify-between p-3 border rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <!-- Google icon SVG -->
                      <g><path fill="#4285F4" d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.17-1.37 3.43-5.273 3.43-3.176 0-5.77-2.626-5.77-5.858s2.594-5.858 5.77-5.858c1.81 0 3.03.77 3.73 1.43l2.55-2.48C17.07 3.7 15.13 2.7 12.625 2.7c-5.02 0-9.09 4.07-9.09 9.09s4.07 9.09 9.09 9.09c5.24 0 8.71-3.68 8.71-8.88 0-.6-.07-1.06-.16-1.57z"/><path fill="#34A853" d="M3.548 7.605l3.25 2.384c.7-1.36 2.01-2.384 3.827-2.384 1.08 0 2.07.37 2.84.97l2.54-2.48C14.66 4.13 13.13 3.5 11.625 3.5c-2.97 0-5.48 1.98-6.41 4.105z"/><path fill="#FBBC05" d="M12.625 21.79c2.5 0 4.6-.83 6.13-2.26l-2.82-2.31c-.77.53-1.75.85-3.31.85-2.54 0-4.68-1.7-5.45-4.01l-3.31 2.56c1.36 2.7 4.25 4.17 8.76 4.17z"/><path fill="#EA4335" d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.17-1.37 3.43-5.273 3.43-3.176 0-5.77-2.626-5.77-5.858s2.594-5.858 5.77-5.858c1.81 0 3.03.77 3.73 1.43l2.55-2.48C17.07 3.7 15.13 2.7 12.625 2.7c-5.02 0-9.09 4.07-9.09 9.09s4.07 9.09 9.09 9.09c5.24 0 8.71-3.68 8.71-8.88 0-.6-.07-1.06-.16-1.57z"/></g>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="font-medium">Google</div>
                    <div class="text-sm text-gray-500">{{ user.value?.email }}</div>
                  </div>
                </div>
                <div>
                  <span v-if="isGoogleConnected" class="text-green-600 text-sm">Terhubung</span>
                  <button
                    v-else
                    @click="connectGoogle"
                    class="text-blue-600 hover:underline text-sm"
                  >
                    Hubungkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import AppIcon from 'src/components/atoms/AppIcon.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const tabs = [
  { value: 'info', label: 'Profil' },
  { value: 'security', label: 'Keamanan' },
  { value: 'login-methods', label: 'Metode Login' }
]
const activeTab = ref('info')
const showChangePasswordModal = ref(false)
const showSetPasswordModal = ref(false)

const hasPassword = computed(() => user.value?.has_password || false)
const isGoogleConnected = computed(() =>
  user.value?.provider === 'google' || user.value?.connected_providers?.includes('google')
)

const connectGoogle = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/auth/google/url?linking=true`)
    const data = await response.json()
    if (data.status === 'success' && data.redirect_url) {
      window.location.href = data.redirect_url
    }
  } catch (error) {
    console.error('Error getting Google OAuth URL:', error)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
