<template>
  <div class="home-page">
    <!-- Navbar - Menggunakan komponen AppNavbar -->
    <AppNavbar 
      title="Jangur Keramik"
      logo="/images/logo.png"
      :navItems="navItems"
      customClass="sticky top-0 z-50 transition-all duration-300 width-full"
      :show-main-nav="true"
    >
      
     
    </AppNavbar>

    <!-- product list session -->
    <section class="py-16 bg-gray-100 px-4">
      <div class="container mx-auto">
        <ProductListTemplate 
          pageTitle="Produk Unggulan"
          pageSubtitle="Koleksi keramik terbaik dengan desain eksklusif dan kualitas premium"
        />
      </div>
    </section>

    <!-- Hero Section - Elegan & Futuristik -->
    <div class="relative overflow-hidden">
      <!-- Background with overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10"></div>
      
      <!-- Background pattern/mesh -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')] bg-cover bg-center opacity-30 z-0"></div>
      
      <!-- Floating geometric shapes -->
      <div class="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl z-0"></div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 py-20 md:py-32 relative z-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Keramik Premium untuk <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Rumah Impian</span> Anda
            </h1>
            <p class="text-xl mb-8 text-blue-100/90 max-w-lg">
              Temukan koleksi keramik terlengkap dengan desain eksklusif, kualitas terbaik, dan harga terjangkau.
            </p>
            <div class="flex flex-wrap gap-4">
              <AppButton 
                label="Lihat Koleksi"
                color="primary"
                variant="custom"
                customClass="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                @click="$router.push('/products')"
              />
              <AppButton 
                label="Promo Spesial"
                variant="outline"
                customClass="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all duration-300 text-white"
                @click="$router.push('/promotions')"
              />
            </div>
            
            <!-- Trust badges -->
            <div class="mt-12 flex items-center space-x-6">
              <div class="flex items-center">
                <AppIcon name="verified" class="text-blue-300 mr-2" />
                <span class="text-sm">Kualitas Terjamin</span>
              </div>
              <div class="flex items-center">
                <AppIcon name="local_shipping" class="text-blue-300 mr-2" />
                <span class="text-sm">Pengiriman Cepat</span>
              </div>
              <div class="flex items-center">
                <AppIcon name="payments" class="text-blue-300 mr-2" />
                <span class="text-sm">Pembayaran Aman</span>
              </div>
            </div>
          </div>
          
          <div class="hidden md:block">
            <div class="relative">
              <!-- Main image with shadow and border -->
              <img 
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
                alt="Jangur Keramik Premium" 
                class="rounded-2xl shadow-2xl shadow-blue-500/20 border border-white/10 w-full h-auto object-cover transform transition-transform duration-500 hover:scale-[1.02]"
              >
              
              <!-- Floating elements -->
              <div class="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-lg">
                <div class="flex items-center space-x-2">
                  <div class="bg-white rounded-full p-2">
                    <AppIcon name="star" class="text-blue-600" />
                  </div>
                  <div>
                    <p class="text-white font-bold">4.9/5.0</p>
                    <p class="text-blue-200 text-sm">1200+ Reviews</p>
                  </div>
                </div>
              </div>
              
              <div class="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <div class="flex items-center space-x-2">
                  <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2">
                    <AppIcon name="local_offer" class="text-white" />
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">Diskon 30%</p>
                    <p class="text-gray-600 text-sm">Hingga 31 Des</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-auto">
          <path fill="#f9fafb" fill-opacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
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
import AppButton from '../components/atoms/AppButton.vue';
import AppIcon from '../components/atoms/AppIcon.vue';
import ProductListTemplate from '../components/templates/ProductListTemplate.vue';
// import AppSearchBar from '../components/molecules/AppSearchBar.vue';

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
