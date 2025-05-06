<template>
  <div class="promotions-page">
    <AppNavbar :navItems="navItems" />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Promo Spesial</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="promo in promotions" 
          :key="promo.id" 
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="relative">
            <img 
              :src="promo.image" 
              :alt="promo.title" 
              class="w-full h-64 object-cover"
            >
            <div class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
              {{ promo.discount }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ promo.title }}</h3>
            <p class="text-gray-600 mb-4">{{ promo.description }}</p>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-gray-500">Berlaku hingga:</p>
                <p class="font-medium">{{ promo.validUntil }}</p>
              </div>
              <router-link 
                :to="promo.link" 
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Lihat Detail
              </router-link>
            </div>
          </div>
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

// Promotions
const promotions = ref([
  {
    id: 1,
    title: 'Diskon Akhir Tahun',
    description: 'Dapatkan diskon hingga 30% untuk semua produk keramik lantai dan dinding',
    discount: '30% OFF',
    image: '/images/promotions/year-end-sale.jpg',
    validUntil: '31 Desember 2023',
    link: '/products?promo=year-end'
  },
  {
    id: 2,
    title: 'Paket Renovasi Kamar Mandi',
    description: 'Hemat hingga 25% dengan membeli paket keramik kamar mandi lengkap',
    discount: '25% OFF',
    image: '/images/promotions/bathroom-package.jpg',
    validUntil: '15 November 2023',
    link: '/products?promo=bathroom'
  },
  {
    id: 3,
    title: 'Beli 10 Gratis 1',
    description: 'Beli 10 dus keramik dapatkan 1 dus gratis untuk tipe yang sama',
    discount: 'Beli 10 Gratis 1',
    image: '/images/promotions/buy-10-get-1.jpg',
    validUntil: '30 November 2023',
    link: '/products?promo=buy10get1'
  },
  {
    id: 4,
    title: 'Flash Sale Mingguan',
    description: 'Diskon spesial setiap hari Jumat untuk produk pilihan',
    discount: 'Hingga 40% OFF',
    image: '/images/promotions/flash-sale.jpg',
    validUntil: 'Setiap Jumat',
    link: '/products?promo=flash-sale'
  }
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