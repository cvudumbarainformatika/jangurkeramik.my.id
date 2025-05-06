<template>
  <div class="about-page">
    <AppNavbar :navItems="navItems" />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Tentang Kami</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 class="text-2xl font-bold mb-4">Sejarah Jangur Keramik</h2>
          <p class="text-gray-700 mb-4">
            Jangur Keramik didirikan pada tahun 2005 sebagai toko keramik kecil di Jalan Sudirman, Jakarta. 
            Dengan komitmen untuk menyediakan produk berkualitas dan layanan terbaik, kami telah berkembang 
            menjadi salah satu distributor keramik terkemuka di Indonesia.
          </p>
          <p class="text-gray-700 mb-4">
            Selama lebih dari 18 tahun, kami telah melayani ribuan pelanggan dan berpartisipasi dalam 
            berbagai proyek konstruksi dan renovasi di seluruh Indonesia. Kami bangga dengan reputasi 
            kami sebagai penyedia keramik berkualitas tinggi dengan harga yang kompetitif.
          </p>
          <p class="text-gray-700">
            Saat ini, Jangur Keramik memiliki 5 cabang di Jakarta, Bandung, dan Surabaya, dengan 
            rencana ekspansi ke kota-kota besar lainnya di Indonesia.
          </p>
        </div>
        <div>
          <img 
            src="/images/about/store-front.jpg" 
            alt="Toko Jangur Keramik" 
            class="w-full h-auto rounded-lg shadow-md"
          >
        </div>
      </div>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Visi & Misi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3 text-primary">Visi</h3>
            <p class="text-gray-700">
              Menjadi distributor keramik terdepan di Indonesia yang dikenal karena kualitas produk, 
              layanan pelanggan yang luar biasa, dan kontribusi positif terhadap industri konstruksi 
              dan desain interior.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3 text-primary">Misi</h3>
            <ul class="text-gray-700 space-y-2">
              <li>• Menyediakan produk keramik berkualitas tinggi dengan harga yang kompetitif</li>
              <li>• Memberikan layanan pelanggan yang luar biasa dan solusi yang disesuaikan</li>
              <li>• Mendukung industri konstruksi dan desain interior dengan produk inovatif</li>
              <li>• Berkontribusi pada pembangunan berkelanjutan melalui praktik bisnis yang bertanggung jawab</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Tim Kami</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="member in teamMembers" 
            :key="member.name" 
            class="bg-white rounded-lg shadow-md overflow-hidden text-center"
          >
            <img 
              :src="member.photo" 
              :alt="member.name" 
              class="w-full h-64 object-cover"
            >
            <div class="p-4">
              <h3 class="text-lg font-bold">{{ member.name }}</h3>
              <p class="text-primary">{{ member.position }}</p>
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

// Team members
const teamMembers = ref([
  {
    name: 'Budi Santoso',
    position: 'Direktur Utama',
    photo: '/images/team/ceo.jpg'
  },
  {
    name: 'Dewi Lestari',
    position: 'Manajer Pemasaran',
    photo: '/images/team/marketing.jpg'
  },
  {
    name: 'Agus Wijaya',
    position: 'Kepala Operasional',
    photo: '/images/team/operations.jpg'
  },
  {
    name: 'Siti Rahayu',
    position: 'Manajer Layanan Pelanggan',
    photo: '/images/team/customer-service.jpg'
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