<template>
  <div class="fixed bottom-0 left-0 right-0">
    <!-- Futuristic glass backdrop with advanced blur effect -->
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-2xl shadow-[0_-8px_40px_-15px_rgba(0,0,0,0.3)] border-t border-white/10"
    ></div>

    <!-- Advanced background effects -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Modern gradient mesh background -->
      <div
        class="absolute inset-0 bg-gradient-to-tr from-slate-900/50 via-slate-800/30 to-slate-900/50"
      ></div>

      <!-- Futuristic animated elements -->
      <div class="absolute inset-0">
        <!-- Animated lines -->
        <div
          class="absolute left-0 right-0 h-[1px] bottom-[3.5rem] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-70 animate-pulse-slow"
        ></div>

        <!-- Animated particles -->
        <div
          class="absolute -bottom-2 left-1/5 w-12 h-12 rounded-full bg-gradient-to-r from-orange-400/5 to-red-400/5 blur-xl animate-float-slow"
        ></div>
        <div
          class="absolute -bottom-3 right-1/5 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400/5 to-blue-400/5 blur-xl animate-float"
        ></div>

        <!-- Futuristic glow -->
        <div
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 blur-sm animate-pulse-slow"
        ></div>
      </div>
    </div>

    <!-- Navigation items - Redesigned with futuristic approach -->
    <nav class="relative flex items-center justify-around h-16 px-2">
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
          class="group flex flex-col items-center justify-center w-16 h-16 relative"
          :aria-label="item.label"
        >
          <!-- Futuristic active indicator -->
          <div v-if="isExactActive" class="absolute inset-0 flex items-center justify-center">
            <!-- Advanced active state effect -->
            <div
              class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-b-lg animate-gradient-x"
            ></div>
            <div
              class="w-full h-full rounded-2xl bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 opacity-70"
            ></div>
          </div>

          <!-- Icon container with neo-futuristic design -->
          <div
            :class="[
              'relative z-10 flex items-center justify-center transition-all duration-300 p-2',
              isExactActive ? 'text-orange-500' : 'text-white group-hover:text-white/80',
            ]"
          >
            <!-- Advanced glow effect for active state -->
            <div
              v-if="isExactActive"
              class="absolute -inset-3 bg-orange-500/10 rounded-xl blur-lg opacity-70 animate-pulse-slow"
            ></div>

            <!-- Icon with advanced animation -->
            <AppIcon
              :name="item.icon"
              :size="isExactActive ? 'lg' : 'md'"
              :color="isExactActive ? 'orange' : 'white'"
              :customClass="
                isExactActive
                  ? 'scale-105 animate-float-micro transition-all duration-300'
                  : 'group-hover:scale-105 transition-all duration-300'
              "
            />

            <!-- Modern notification badge -->
            <div
              v-if="item.badge && item.badge > 0"
              class="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1.5 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg shadow-orange-500/20 border border-white/20 animate-pulse-subtle"
            >
              {{ item.badge > 99 ? '99+' : item.badge }}
            </div>
          </div>

          <!-- Menu label with futuristic style -->
          <span
            :class="[
              'text-[10px] font-medium mt-0 transition-all duration-300',
              isExactActive ? 'text-orange-500' : 'text-white group-hover:text-white/80',
            ]"
          >
            {{ item.label }}
          </span>

          <!-- High-tech active indicator -->
          <div v-if="isExactActive" class="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full">
            <div class="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </a>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import AppIcon from '../atoms/AppIcon.vue'
import { useCartStore } from 'src/stores/cart-store'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const cartStore = useCartStore()

const { items } = storeToRefs(cartStore)

// Navigation items with dynamic badges
const navItems = computed(() => [
  {
    label: 'Beranda',
    icon: 'home',
    to: '/',
  },
  {
    label: 'Eksplor',
    icon: 'compass',
    to: '/categories',
  },
  {
    label: 'Keranjang',
    icon: 'shopping-bag',
    to: isLoggedIn.value ? '/cart' : '/no-auth',
    badge: isLoggedIn.value ? items.value?.length || 0 : 0,
  },
  {
    label: 'Favorit',
    icon: 'heart',
    to: isLoggedIn.value ? '/favorites' : '/no-auth',
    badge: isLoggedIn.value ? 0 : 0,
  },
  {
    label: 'Akun',
    icon: 'user',
    to: isLoggedIn.value ? '/profile' : '/no-auth',
  },
])
</script>

<style scoped>
/* Advanced futuristic animations */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.8;
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) translateX(-5px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-15px) translateX(5px);
    opacity: 0.7;
  }
}

@keyframes float-micro {
  0%,
  100% {
    transform: translateY(0) scale(1.1);
  }
  50% {
    transform: translateY(-2px) scale(1.1);
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Apply animations */
.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-float-micro {
  animation: float-micro 2s ease-in-out infinite;
}

.animate-gradient-x {
  animation: gradient-x 3s linear infinite;
  background-size: 200% 200%;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Utility classes */
.min-w-5 {
  min-width: 1.25rem;
}
</style>
