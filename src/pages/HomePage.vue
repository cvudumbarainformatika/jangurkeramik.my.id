<template>
  <div class="home-page">
    <AppNavbar :navItems="navItems" />
    
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Keramik Berkualitas untuk Rumah Impian Anda</h1>
            <p class="text-xl mb-8">Temukan koleksi keramik terlengkap dengan kualitas terbaik dan harga terjangkau.</p>
            <div class="flex flex-wrap gap-4">
              <router-link 
                to="/products" 
                class="bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors"
              >
                Lihat Produk
              </router-link>
              <router-link 
                to="/promotions" 
                class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Promo Spesial
              </router-link>
            </div>
          </div>
          <div class="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
              alt="Jangur Keramik" 
              class="rounded-lg shadow-xl"
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Categories Section -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Kategori Produk</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Temukan berbagai jenis keramik untuk setiap ruangan di rumah Anda.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div 
            v-for="category in categories" 
            :key="category.name" 
            class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <router-link :to="category.link">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="material-icons text-primary text-2xl">{{ category.icon }}</i>
              </div>
              <h3 class="font-bold">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.count }} produk</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Featured Products Section -->
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Produk Unggulan</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Produk terbaik dan terpopuler dari koleksi kami.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id" 
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-48 object-cover"
            >
            <div class="p-4">
              <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ product.category }}</p>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                  <i v-for="i in 5" :key="i" class="material-icons text-sm">
                    {{ i <= product.rating ? 'star' : 'star_border' }}
                  </i>
                </div>
                <span class="text-gray-600 text-sm ml-1">({{ product.reviewCount }})</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="product.discountPrice" class="text-gray-500 line-through text-sm">Rp {{ product.price.toLocaleString() }}</span>
                  <p class="text-lg font-bold text-primary">
                    Rp {{ (product.discountPrice || product.price).toLocaleString() }}
                  </p>
                </div>
                <button class="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors">
                  <i class="material-icons">shopping_cart</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <router-link 
            to="/products" 
            class="inline-block bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary-dark transition-colors"
          >
            Lihat Semua Produk
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Promotions Section -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Promo Spesial</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Dapatkan penawaran terbaik untuk produk keramik berkualitas.</p>
        </div>
        
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
    </div>
    
    <!-- Testimonials Section -->
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Testimoni Pelanggan</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Apa kata pelanggan kami tentang produk dan layanan Jangur Keramik.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id" 
            class="bg-white rounded-lg shadow-md p-6"
          >
            <div class="flex text-yellow-400 mb-4">
              <i v-for="i in 5" :key="i" class="material-icons">
                {{ i <= testimonial.rating ? 'star' : 'star_border' }}
              </i>
            </div>
            <p class="text-gray-700 mb-4">{{ testimonial.text }}</p>
            <div class="flex items-center">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="w-12 h-12 rounded-full mr-4"
              >
              <div>
                <h4 class="font-bold">{{ testimonial.name }}</h4>
                <p class="text-gray-600 text-sm">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Siap Mempercantik Rumah Anda?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Konsultasikan kebutuhan keramik Anda dengan tim ahli kami dan dapatkan penawaran terbaik.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link 
            to="/contact" 
            class="bg-white text-primary px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami
          </router-link>
          <router-link 
            to="/products" 
            class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-primary transition-colors"
          >
            Lihat Katalog
          </router-link>
        </div>
      </div>
    </div>
    
    <AppFooter :socialLinks="socialLinks" :footerLinkSections="footerLinkSections" />
  </div>
</template>

<script setup>
// import { ref } from 'vue';
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
const categories = [
  { name: 'Lantai', count: 124, icon: 'grid_view', link: '/products?category=floor' },
  { name: 'Dinding', count: 98, icon: 'view_quilt', link: '/products?category=wall' },
  { name: 'Kamar Mandi', count: 56, icon: 'bathtub', link: '/products?category=bathroom' },
  { name: 'Dapur', count: 42, icon: 'kitchen', link: '/products?category=kitchen' },
  { name: 'Outdoor', count: 38, icon: 'deck', link: '/products?category=outdoor' },
  { name: 'Peralatan', count: 65, icon: 'handyman', link: '/products?category=tools' }
];

// Featured Products
const featuredProducts = [
  {
    id: 1,
    name: 'Granit Valentino 60x60',
    category: 'Keramik Lantai',
    price: 185000,
    discountPrice: 165000,
    rating: 4,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    name: 'Keramik Dinding Putih Glossy',
    category: 'Keramik Dinding',
    price: 135000,
    discountPrice: null,
    rating: 5,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    name: 'Keramik Kamar Mandi Anti Slip',
    category: 'Keramik Kamar Mandi',
    price: 145000,
    discountPrice: 125000,
    rating: 4,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    name: 'Keramik Motif Kayu',
    category: 'Keramik Lantai',
    price: 155000,
    discountPrice: null,
    rating: 5,
    reviewCount: 72,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  }
];

// Promotions
const promotions = [
  {
    id: 1,
    title: 'Diskon Akhir Tahun',
    description: 'Dapatkan diskon hingga 30% untuk semua produk keramik lantai dan dinding',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    validUntil: '31 Desember 2023',
    link: '/products?promo=year-end'
  },
  {
    id: 2,
    title: 'Paket Renovasi Kamar Mandi',
    description: 'Hemat hingga 25% dengan membeli paket keramik kamar mandi lengkap',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    validUntil: '15 November 2023',
    link: '/products?promo=bathroom'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    location: 'Jakarta',
    rating: 5,
    text: 'Saya sangat puas dengan kualitas keramik dari Jangur. Pemasangannya mudah dan hasilnya sangat bagus. Pelayanan dari tim juga sangat profesional.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    location: 'Bandung',
    rating: 4,
    text: 'Keramik lantai yang saya beli memiliki kualitas yang sangat baik. Warnanya sesuai dengan yang ditampilkan di website dan tahan lama.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Agus Wijaya',
    location: 'Surabaya',
    rating: 5,
    text: 'Pengiriman cepat dan produk dalam kondisi baik. Harga juga sangat kompetitif dibandingkan toko lain. Pasti akan belanja lagi di sini.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

// Footer
// const footerDescription = 'Solusi keramik berkualitas untuk rumah dan bangunan Anda.';

const socialLinks = [
  { icon: 'facebook', href: 'https://facebook.com/jangurkeramik' },
  { icon: 'instagram', href: 'https://instagram.com/jangurkeramik' },
  { icon: 'twitter', href: 'https://twitter.com/jangurkeramik' },
  { icon: 'youtube', href: 'https://youtube.com/jangurkeramik' }
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
