import { defineStore } from 'pinia'
import { api, refreshCsrfToken } from 'src/boot/axios'
import { useCartStore } from './cart-store'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },

  actions: {
    async loginWithGoogle() {
      try {
        // Dapatkan URL redirect dari backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/auth/google/url`)
        const data = await response.json()

        // console.log('loginWithGoogle', data);

        if (data.status === 'success' && data.redirect_url) {
          // Redirect ke URL Google OAuth

          // this.checkAuth()

          window.location.href = data.redirect_url
        } else {
          console.error('Failed to get Google OAuth URL')
        }
      } catch (error) {
        console.error('Error during Google login:', error)
      }
    },

    async register() {
      try {
        this.loading = true
        this.error = null

        // Simulasi register API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Redirect ke login setelah register berhasil
        return true
      } catch (error) {
        this.error = error.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        this.loading = true

        // Jika pengguna sudah login, panggil API logout
        if (this.token) {
          try {
            // Refresh CSRF token sebelum logout
            await refreshCsrfToken()

            // Panggil endpoint logout sesuai dengan dokumentasi backend
            await api.post('api/v2/auth/email/logout')
            console.log('Logout API call berhasil')
          } catch (apiError) {
            // Tangani error API tapi tetap lanjutkan proses logout lokal
            console.error('Logout API error:', apiError.message || apiError)
            // Jika error bukan 401, log error lengkap
            if (!apiError.response || apiError.response.status !== 401) {
              console.error('Detail error:', apiError)
            }
          }
        }

        // Hapus data dari state lokal
        this.user = null
        this.token = null

        return true
      } catch (error) {
        console.error('Logout error:', error)

        // Tetap hapus data lokal meskipun API call gagal
        this.user = null
        this.token = null
        return false
      } finally {
        this.loading = false
      }
    },

    setAuth(token, user) {
      this.token = token
      this.user = user
      return true
    },

    // Tambahkan fungsi refreshToken
    async refreshToken() {
      try {
        this.loading = true

        // Refresh CSRF token terlebih dahulu
        await refreshCsrfToken()

        // Panggil endpoint refresh token
        const response = await api.post('api/v2/auth/refresh')

        if (response.data.success) {
          // Update token dan user jika perlu
          this.token = response.data.token
          if (response.data.user) {
            this.user = response.data.user
          }
          return true
        } else {
          throw new Error(response.data.message || 'Failed to refresh token')
        }
      } catch (error) {
        console.error('Token refresh error:', error)
        // Jika refresh gagal, hapus data lokal
        this.user = null
        this.token = null
        return false
      } finally {
        this.loading = false
      }
    },

    // Fungsi untuk memeriksa status autentikasi
    async checkAuth() {
      try {
        // Jika tidak ada token, user tidak terautentikasi
        if (!this.token) return false

        // Panggil endpoint untuk memeriksa token
        const response = await api.get('api/v2/auth/me')
        console.log('Auth check response:', response)

        // Jika token valid, perbarui data user jika ada
        if (response.data.success) {
          // console.log('Auth check response:', response.data);

          if (response.data.user) {
            this.user = response.data.user

            // Menambahkan cart user
            const cartStore = useCartStore()
            cartStore.restoreCartFromServer()
          }
          return true
        } else {
          // Jika token tidak valid, hapus data lokal
          this.user = null
          this.token = null
          return false
        }
      } catch (error) {
        console.error('Auth check error:', error)
        // Jika terjadi error, hapus data lokal
        this.user = null
        this.token = null
        return false
      }
    },
  },

  // Konfigurasi persistence
  persist: {
    key: 'auth',
    storage: localStorage,
    paths: ['user', 'token'], // Hanya simpan user dan token
  },
})
