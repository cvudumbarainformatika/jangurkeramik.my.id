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

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Tambahkan interceptor untuk menangani error CSRF dan autentikasi
 api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle 401 and token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue the request
      if (isRefreshing) {
        try {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Start refresh process
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const authStore = useAuthStore();
        const newToken = await authStore.refreshToken();

        if (newToken) {
          // Update request authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Process queued requests
          processQueue(null, newToken);
          
          // Retry original request
          return api(originalRequest);
        }

        // If no new token, clear queue and redirect to login
        processQueue(new Error('Refresh failed'));
        authStore.logout();
        // window.location.href = '/login';
        return Promise.reject(error);

      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
