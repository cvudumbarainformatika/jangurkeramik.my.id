import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },
  
  actions: {
    async login() {
      try {
        this.loading = true;
        this.error = null;
        
        // Simulasi login API call
        // Dalam implementasi nyata, ganti dengan panggilan API sebenarnya
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulasi data user
        this.user = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'customer'
        };
        this.token = 'sample-jwt-token';
        
        return true;
      } catch (error) {
        this.error = error.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async register() {
      try {
        this.loading = true;
        this.error = null;
        
        // Simulasi register API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect ke login setelah register berhasil
        return true;
      } catch (error) {
        this.error = error.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        // Jika pengguna sudah login, panggil API logout
        if (this.token) {
          // Import api dari boot/axios
          const { api } = await import('src/boot/axios');
          
          // Panggil endpoint logout sesuai dengan dokumentasi backend
          await api.post('api/v2/auth/email/logout');
          
          // Hapus data dari state lokal
          this.user = null;
          this.token = null;
        }
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        
        // Tetap hapus data lokal meskipun API call gagal
        this.user = null;
        this.token = null;
        return false;
      }
    },
    
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      return true;
    },
    
    // Tidak perlu lagi initAuth karena state akan dimuat secara otomatis
  },
  
  // Konfigurasi persistence
  persist: {
    key: 'auth',
    storage: localStorage,
    paths: ['user', 'token'], // Hanya simpan user dan token
  }
});
