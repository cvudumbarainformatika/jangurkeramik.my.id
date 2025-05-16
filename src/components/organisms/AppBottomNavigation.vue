<template>
  <div class="fixed bottom-0 left-0 right-0 z-50">
    <!-- Backdrop with glass morphism effect -->
    <div class="absolute inset-0 bg-white/80 backdrop-blur-xl shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.2)] border-t border-gray-100"></div>
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Dynamic gradient background -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30"></div>
      
      <!-- Animated gradient circles -->
      <div class="absolute -bottom-6 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-xl animate-pulse"></div>
      <div class="absolute -bottom-4 right-1/4 w-14 h-14 rounded-full bg-gradient-to-r from-orange-400/10 to-pink-400/10 blur-xl animate-pulse-slow"></div>
      <div class="absolute bottom-10 left-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-400/10 to-teal-400/10 blur-xl animate-float"></div>
    </div>
    
    <!-- Navigation items -->
    <nav class="relative flex items-center justify-around h-14 px-2">
      <router-link 
        v-for="(item, index) in navItems" 
        :key="index"
        :to="item.to"
        custom
        v-slot="{ navigate, href, isExactActive }"
      >
        <a 
          :href="href"
          @click="navigate"
          class="group flex items-center justify-center w-14 h-14 relative"
          :aria-label="item.label"
        >
          <!-- Active indicator with animated gradient border -->
          <div 
            v-if="isExactActive" 
            class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white rounded-full shadow-sm overflow-hidden"
          >
            <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-gradient-x"></div>
          </div>
          
          <!-- Icon container with animations -->
          <div 
            :class="[
              'relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110',
              isExactActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
            ]"
          >
            <!-- Animated background for active state -->
            <div 
              v-if="isExactActive" 
              class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full"
            ></div>
            
            <!-- Animated glow effect for active state -->
            <div 
              v-if="isExactActive" 
              class="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-70 animate-pulse"
            ></div>
            
            <!-- Icon with spring animation on active -->
            <AppIcon 
              :name="item.icon" 
              :size="isExactActive ? 'lg' : 'md'" 
              :class="[
                'transition-all duration-300',
                isExactActive ? 'scale-110 animate-spring' : 'group-hover:scale-110'
              ]"
            />
            
            <!-- Notification badge with bounce animation -->
            <div 
              v-if="item.badge && item.badge > 0" 
              class="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full border border-white shadow-sm animate-bounce-short"
            >
              {{ item.badge > 99 ? '99+' : item.badge }}
            </div>
          </div>
          
          <!-- Animated dot indicator for active state -->
          <div 
            v-if="isExactActive" 
            class="absolute bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full"
          >
            <div class="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </a>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import AppIcon from '../atoms/AppIcon.vue';
import { useCartStore } from 'src/stores/cart-store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

const cartStore = useCartStore()

const {items} = storeToRefs(cartStore)

// Navigation items with dynamic badges
const navItems = computed(() => [
  { 
    label: 'Beranda', 
    icon: 'home', 
    to: '/' 
  },
  { 
    label: 'Kategori', 
    icon: 'grid', 
    to: '/categories'
  },
  { 
    label: 'Keranjang', 
    icon: 'shopping-cart', 
    to: isLoggedIn.value ? '/cart' : '/auth',
    badge: isLoggedIn.value ? items.value?.length || 0 : 0 // Example: 3 items in cart
  },
  { 
    label: 'Favorit', 
    icon: 'heart', 
    to: isLoggedIn.value ? '/favorites' : '/auth',
    badge: isLoggedIn.value ? 0 : 0 // Example: 5 items in favorites
  }
]);
</script>

<style scoped>
/* Custom animations */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.8;
  }
}

@keyframes bounce-short {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-3px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes spring {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-bounce-short {
  animation: bounce-short 1s infinite;
}

.animate-gradient-x {
  animation: gradient-x 3s linear infinite;
  background-size: 200% 200%;
}

.animate-spring {
  animation: spring 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Ensure minimum width for badge */
.min-w-5 {
  min-width: 1.25rem;
}
</style>
