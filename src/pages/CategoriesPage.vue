<template>
  <div class="categories-page">
    <AppNavbar :navItems="navItems" />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Kategori Produk</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.name" 
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <router-link :to="category.link">
            <div class="relative h-48">
              <img 
                :src="category.image" 
                :alt="category.name" 
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 class="text-white text-2xl font-bold">{{ category.name }}</h3>
              </div>
            </div>
            <div class="p-4">
              <p class="text-gray-600">{{ category.count }} produk</p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-primary font-medium">Lihat Produk</span>
                <i class="material-icons text-primary">arrow_forward</i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    
    <AppFooter :socialLinks="socialLinks" :footerLinkSections="footerLinkSections" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppNavbar from '../components/organisms/AppNavbar.vue';
import AppFooter from '../components/organisms/AppFooter.vue';

// Navigation items
const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Produk', to: '/products' },
  { label: 'Kategori', to: '/categories' },
  { label: 'Promo', to: '/promotions' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Kontak', to: '/contact' }
];

// Categories
const categories = ref([
  { name: 'Keramik Lantai', count: 124, image: '/images/categories/floor.jpg', link: '/products?category=floor' },
  { name: 'Keramik Dinding', count: 98, image: '/images/categories/wall.jpg', link: '/products?category=wall' },
  { name: 'Keramik Kamar Mandi', count: 56, image: '/images/categories/bathroom.jpg', link: '/products?category=bathroom' },
  { name: 'Keramik Dapur', count: 42, image: '/images/categories/kitchen.jpg', link: '/products?category=kitchen' },
  { name: 'Keramik Outdoor', count: 38, image: '/images/categories/outdoor.jpg', link: '/products?category=outdoor' },
  { name: 'Peralatan', count: 65, image: '/images/categories/tools.jpg', link: '/products?category=tools' }
]);

// Footer data
const socialLinks = [
  { icon: 'facebook', url: 'https://facebook.com/jangurkeramik' },
  { icon: 'instagram', url: 'https://instagram.com/jangurkeramik' },
  { icon: 'twitter', url: 'https://twitter.com/jangurkeramik' },
  { icon: 'youtube', url: 'https://youtube.com/jangurkeramik' }
];

const footerLinkSections = [
  {
    title: 'Produk',
    links: [
      { label: 'Keramik Lantai', to: '/products?category=floor' },
      { label: 'Keramik Dinding', to: '/products?category=wall' },
      { label: 'Keramik Kamar Mandi', to: '/products?category=bathroom' },
      { label: 'Keramik Dapur', to: '/products?category=kitchen' },
      { label: 'Peralatan Bangunan', to: '/products?category=tools' }
    ]
  },
  {
    title: 'Informasi',
    links: [
      { label: 'Tentang Kami', to: '/about' },
      { label: 'Cara Pemesanan', to: '/how-to-order' },
      { label: 'Pengiriman', to: '/shipping' },
      { label: 'Pembayaran', to: '/payment' },
      { label: 'FAQ', to: '/faq' }
    ]
  },
  {
    title: 'Layanan Pelanggan',
    links: [
      { label: 'Kontak Kami', to: '/contact' },
      { label: 'Pengembalian', to: '/returns' },
      { label: 'Garansi', to: '/warranty' },
      { label: 'Bantuan', to: '/help' }
    ]
  }
];
</script>