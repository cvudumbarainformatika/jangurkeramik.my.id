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
    
    logout() {
      this.user = null;
      this.token = null;
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
