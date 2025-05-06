<template>
  <ProductCatalogTemplate
    :categoryTitle="categoryTitle"
    :categoryDescription="categoryDescription"
    :categoryBanner="categoryBanner"
    :navItems="navItems"
    :socialLinks="socialLinks"
    :footerLinkSections="footerLinkSections"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCatalogTemplate from '../components/templates/ProductCatalogTemplate.vue';

const route = useRoute();
const categoryTitle = ref('Semua Produk');
const categoryDescription = ref('Koleksi lengkap produk keramik berkualitas untuk rumah Anda');
const categoryBanner = ref('/images/banners/default-category.jpg');

// Navigation items
const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Produk', to: '/products' },
  { label: 'Kategori', to: '/categories' },
  { label: 'Promo', to: '/promotions' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Kontak', to: '/contact' }
];

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

// Category mapping
const categoryMap = {
  'floor': {
    title: 'Keramik Lantai',
    description: 'Koleksi keramik lantai premium untuk rumah Anda',
    banner: '/images/banners/floor-tiles.jpg'
  },
  'wall': {
    title: 'Keramik Dinding',
    description: 'Keramik dinding dengan berbagai motif dan tekstur',
    banner: '/images/banners/wall-tiles.jpg'
  },
  'bathroom': {
    title: 'Keramik Kamar Mandi',
    description: 'Keramik anti slip dan tahan air untuk kamar mandi',
    banner: '/images/banners/bathroom-tiles.jpg'
  },
  'kitchen': {
    title: 'Keramik Dapur',
    description: 'Keramik tahan noda dan mudah dibersihkan untuk dapur',
    banner: '/images/banners/kitchen-tiles.jpg'
  },
  'outdoor': {
    title: 'Keramik Outdoor',
    description: 'Keramik tahan cuaca untuk area luar ruangan',
    banner: '/images/banners/outdoor-tiles.jpg'
  },
  'tools': {
    title: 'Peralatan',
    description: 'Peralatan dan bahan pendukung untuk pemasangan keramik',
    banner: '/images/banners/tools.jpg'
  }
};

onMounted(() => {
  // Get category from URL query parameter
  const category = route.query.category;
  
  if (category && categoryMap[category]) {
    categoryTitle.value = categoryMap[category].title;
    categoryDescription.value = categoryMap[category].description;
    categoryBanner.value = categoryMap[category].banner;
  }
});
</script>
