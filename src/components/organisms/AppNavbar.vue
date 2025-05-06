<template>
  <header>
    <!-- Top Bar -->
    <div class="bg-gray-800 text-white py-2 text-sm">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
          <div class="flex items-center mr-6">
            <AppIcon name="phone" size="sm" class="mr-1" />
            <span>{{ contactPhone }}</span>
          </div>
          <div class="flex items-center">
            <AppIcon name="mail" size="sm" class="mr-1" />
            <span>{{ contactEmail }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <AppNavLink v-for="(link, index) in topLinks" :key="index" v-bind="link" customClass="text-white text-xs" />
        </div>
      </div>
    </div>
    
    <!-- Main Navbar -->
    <div class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <router-link to="/" class="flex items-center">
            <img v-if="logo" :src="logo" :alt="title" class="h-10 mr-3">
            <span v-else class="text-xl font-bold text-primary">{{ title }}</span>
          </router-link>
          
          <!-- Search -->
          <div class="hidden md:block w-1/3">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Cari produk..." 
                class="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
              <AppIcon name="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <button class="relative p-2 text-gray-700 hover:text-primary md:hidden">
              <AppIcon name="search" />
            </button>
            
            <button class="relative p-2 text-gray-700 hover:text-primary">
              <AppIcon name="user" />
            </button>
            
            <button class="relative p-2 text-gray-700 hover:text-primary">
              <AppIcon name="heart" />
              <span class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
            
            <button class="relative p-2 text-gray-700 hover:text-primary">
              <AppIcon name="cart" />
              <span class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button class="md:hidden p-2 text-gray-700" @click="mobileMenuOpen = !mobileMenuOpen">
              <AppIcon name="menu" />
            </button>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="hidden md:block py-4 border-t">
          <ul class="flex justify-center space-x-8">
            <li v-for="(item, index) in navItems" :key="index">
              <AppNavLink 
                :label="item.label" 
                :to="item.to" 
                :href="item.href" 
                :external="item.external"
                customClass="font-medium py-2"
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      @click="mobileMenuOpen = false"
    >
      <div 
        class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform"
        @click.stop
      >
        <div class="p-4 border-b">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Menu</h3>
            <button @click="mobileMenuOpen = false">
              <AppIcon name="close" />
            </button>
          </div>
        </div>
        
        <div class="p-4">
          <ul class="space-y-4">
            <li v-for="(item, index) in navItems" :key="index">
              <AppNavLink 
                :label="item.label" 
                :to="item.to" 
                :href="item.href" 
                :external="item.external"
                customClass="block py-2"
                @click="mobileMenuOpen = false"
              />
            </li>
          </ul>
          
          <div class="mt-6 pt-6 border-t">
            <ul class="space-y-4">
              <li v-for="(link, index) in topLinks" :key="index">
                <AppNavLink 
                  v-bind="link" 
                  customClass="block py-2"
                  @click="mobileMenuOpen = false"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppNavLink from '../molecules/AppNavLink.vue';

defineProps({
  title: {
    type: String,
    default: 'Jangur Keramik'
  },
  logo: {
    type: String,
    default: ''
  },
  navItems: {
    type: Array,
    default: () => []
  },
  contactPhone: {
    type: String,
    default: '+62 812 3456 7890'
  },
  contactEmail: {
    type: String,
    default: 'info@jangurkeramik.com'
  },
  topLinks: {
    type: Array,
    default: () => [
      { label: 'Tentang Kami', to: '/about' },
      { label: 'Kontak', to: '/contact' },
      { label: 'FAQ', to: '/faq' }
    ]
  }
});

const mobileMenuOpen = ref(false);
</script>

<script>
/**
 * @component AppNavbar
 * @description Komponen organisme untuk navigasi utama website dengan fitur responsive
 * @example
 * <AppNavbar 
 *   title="Jangur Keramik"
 *   logo="/images/logo.png"
 *   :navItems="[
 *     { label: 'Beranda', to: '/' },
 *     { label: 'Produk', to: '/products' },
 *     { label: 'Kategori', to: '/categories' },
 *     { label: 'Promo', to: '/promotions' },
 *     { label: 'Blog', to: '/blog' }
 *   ]"
 * />
 */
</script>
