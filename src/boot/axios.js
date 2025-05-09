import { defineBoot } from '#q-app/wrappers';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // Penting untuk mengirim cookies (termasuk CSRF token)
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
    
    return config;
  });

  // Tambahkan interceptor untuk menangani error CSRF
  api.interceptors.response.use(
    response => response,
    async error => {
      // Jika error 419 (CSRF token mismatch), coba refresh CSRF token
      if (error.response && error.response.status === 419) {
        try {
          // Panggil endpoint sanctum/csrf-cookie untuk mendapatkan token baru
          await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
          });
          
          // Coba ulang permintaan asli
          return api(error.config);
        } catch (refreshError) {
          console.error('Failed to refresh CSRF token:', refreshError);
          return Promise.reject(error);
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
    await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
    return true;
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
    return false;
  }
}

export { api };
