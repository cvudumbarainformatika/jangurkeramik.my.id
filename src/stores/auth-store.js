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
    async login(credentials) {
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
        
        // Simpan token di localStorage untuk persistensi
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('auth_user', JSON.stringify(this.user));
        
        return true;
      } catch (error) {
        this.error = error.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async register(userData) {
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
      
      // Hapus data dari localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      
      // Simpan token dan user di localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      return true;
    },
    
    // Cek status login saat aplikasi dimulai
    initAuth() {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    }
  }
});
