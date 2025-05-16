import { defineBoot } from '#q-app/wrappers';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Penting untuk mengirim cookies (termasuk CSRF token)
  // Tambahkan timeout untuk mencegah permintaan menggantung terlalu lama
  timeout: 30000 // 30 detik
});

// eslint-disable-next-line no-unused-vars
export default defineBoot(({ app, store }) => {
  // Tambahkan interceptor untuk menambahkan token ke header permintaan
  api.interceptors.request.use(config => {
    const authStore = useAuthStore();
    
    // Tambahkan Authorization header jika ada token
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    
    // Tambahkan X-XSRF-TOKEN header dari cookie
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken; // Laravel menggunakan X-XSRF-TOKEN
    }
    
    // HAPUS: Jangan mencoba mengatur header Cookie secara manual
    // if (!config.headers.Cookie && document.cookie) {
    //   config.headers.Cookie = document.cookie;
    // }
    
    return config;
  });

  // Tambahkan interceptor untuk menangani error CSRF dan autentikasi
  api.interceptors.response.use(
    response => response,
    async error => {
      // Jika error 419 (CSRF token mismatch), coba refresh CSRF token
      if (error.response && error.response.status === 419) {
        try {
          console.log('Mencoba refresh CSRF token...');
          // Panggil endpoint sanctum/csrf-cookie untuk mendapatkan token baru
          await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
          });
          
          console.log('CSRF token diperbarui, mencoba ulang permintaan...');
          // Coba ulang permintaan asli
          return api(error.config);
        } catch (refreshError) {
          console.error('Failed to refresh CSRF token:', refreshError);
          return Promise.reject(error);
        }
      }
      
      // Jika error 401 (Unauthorized), mungkin token kedaluwarsa
      if (error.response && error.response.status === 401) {
        const authStore = useAuthStore();
        
        // Jika pengguna seharusnya sudah login, coba refresh token
        if (authStore.isLoggedIn) {
          try {
            console.log('Token mungkin kedaluwarsa, mencoba refresh...');
            // Implementasikan logika refresh token di sini jika ada
            // await authStore.refreshToken();
            
            // Coba ulang permintaan asli
            return api(error.config);
          } catch (refreshError) {
            console.error('Failed to refresh auth token:', refreshError);
            // Jika refresh gagal, logout pengguna
            authStore.logout();
            return Promise.reject(error);
          }
        }
      }
      
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

// Fungsi untuk mendapatkan CSRF token dari cookie
function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

// Fungsi untuk mendapatkan CSRF token baru
export async function refreshCsrfToken() {
  try {
    console.log('Meminta CSRF token baru...');
    await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
    console.log('CSRF token baru diterima');
    return true;
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
    return false;
  }
}

// Fungsi untuk menangani permintaan dengan retry jika terjadi error CSRF
export async function apiWithCsrfRetry(requestFn) {
  try {
    return await requestFn();
  } catch (error) {
    if (error.response && error.response.status === 419) {
      // Refresh CSRF token dan coba lagi
      await refreshCsrfToken();
      return await requestFn();
    }
    throw error;
  }
}

export { api };
