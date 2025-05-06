<template>
  <footer class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company info -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div v-if="!logo" class="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">{{ title.charAt(0) }}</span>
            </div>
            <img v-else :src="logo" :alt="title" class="h-10 w-auto">
            <span class="text-xl font-bold">{{ title }}</span>
          </div>
          <p class="text-gray-400 mb-4">{{ description }}</p>
          <div class="flex space-x-4">
            <a v-for="(social, index) in socialLinks" :key="index" 
               :href="social.href" 
               :aria-label="social.label"
               target="_blank" 
               rel="noopener noreferrer"
               class="text-gray-400 hover:text-white transition-colors">
              <AppIcon :name="social.icon" />
            </a>
          </div>
        </div>
        
        <!-- Quick links -->
        <div v-for="(section, sectionIndex) in linkSections" :key="sectionIndex">
          <h3 class="text-lg font-medium mb-4">{{ section.title }}</h3>
          <ul class="space-y-2">
            <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
              <router-link 
                v-if="link.to" 
                :to="link.to" 
                class="text-gray-400 hover:text-white transition-colors">
                {{ link.label }}
              </router-link>
              <a 
                v-else 
                :href="link.href" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
        <p>{{ copyright || `© ${new Date().getFullYear()} ${title}. Hak Cipta Dilindungi.` }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';

defineProps({
  title: {
    type: String,
    default: 'Jangur Keramik'
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'Solusi keramik berkualitas untuk rumah dan bangunan Anda.'
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  linkSections: {
    type: Array,
    default: () => []
  },
  copyright: {
    type: String,
    default: ''
  }
});
</script>

<script>
/**
 * @component AppFooter
 * @description Komponen organisme footer yang menampilkan informasi perusahaan, link navigasi, dan copyright
 * @example
 * <AppFooter 
 *   title="Jangur Keramik"
 *   description="Solusi keramik berkualitas untuk rumah dan bangunan Anda."
 *   :socialLinks="[
 *     { icon: 'facebook', href: 'https://facebook.com/jangurkeramik', label: 'Facebook' },
 *     { icon: 'instagram', href: 'https://instagram.com/jangurkeramik', label: 'Instagram' }
 *   ]"
 *   :linkSections="[
 *     {
 *       title: 'Produk',
 *       links: [
 *         { label: 'Keramik Lantai', to: '/products/floor' },
 *         { label: 'Keramik Dinding', to: '/products/wall' }
 *       ]
 *     },
 *     {
 *       title: 'Perusahaan',
 *       links: [
 *         { label: 'Tentang Kami', to: '/about' },
 *         { label: 'Kontak', to: '/contact' }
 *       ]
 *     }
 *   ]"
 * />
 */
</script>