<template>
  <div class="home-page" ref="containerRef">
    <!-- Navbar - Menggunakan komponen AppNavbar -->
    <AppNavbar 
      title="Jangur Keramik"
      logo="/images/logo.png"
      :navItems="navItems"
      customClass="sticky top-0 z-50 transition-all duration-300 width-full"
      :show-main-nav="scrollOnTop"
      :view-mode="viewMode"
      @view-mode-change="changeViewMode"
    >
      
     
    </AppNavbar>

    <!-- product list session -->
    <section class="py-16  px-4 product-list-session" ref="productListRef">
      <div class="container mx-auto">
        <ProductListTemplate 
          pageTitle="Produk Unggulan"
          pageSubtitle="Koleksi keramik terbaik dengan desain eksklusif dan kualitas premium"
        />
      </div>
    </section>


    
   
    
   
    
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
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
// import AppIcon from '../components/atoms/AppIcon.vue';
import { useProductStore } from 'src/stores/product-store';
import { storeToRefs } from 'pinia';

const AppNavbar = defineAsyncComponent(()=> import('components/organisms/AppNavbar.vue'))
const AppFooter = defineAsyncComponent(()=> import('components/organisms/AppFooter.vue'))
// const AppButton = defineAsyncComponent(()=> import('components/atoms/AppButton.vue'))
const ProductListTemplate = defineAsyncComponent(()=> import('components/templates/ProductListTemplate.vue'))

const containerRef = ref(null)
const productListRef = ref(null)
const scrollOnTop = ref(false)

const productStore = useProductStore()
const { viewMode } = storeToRefs(productStore)
const { changeViewMode } = productStore

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




// Action



let scrollHandler = null
// Status internal untuk deteksi perubahan
let wasAbove = false

function checkPosition() {
  if (!productListRef.value) return

  const top = productListRef.value.getBoundingClientRect().top

  if (top <= -50 && !wasAbove) {
    wasAbove = true
    // console.log('⬆️ Menyentuh atau lewat atas viewport (scroll pelan pun terdeteksi)')
    scrollOnTop.value = true
  }

  if (top > -50 && wasAbove) {
    wasAbove = false
    // console.log('⬇️ Kembali ke posisi asal di bawah')
    scrollOnTop.value = false
  }
}

// Fungsi throttle
function throttle(fn, delay) {
  let lastCall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      lastCall = now
      return fn(...args)
    }
  }
}

onMounted(() => {
  scrollHandler = throttle(() => {
    checkPosition()
  }, 50) // << throttle interval di sini (ms)

  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

</script>
