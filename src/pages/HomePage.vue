<template>
  <div class="home-page" ref="containerRef">
    <!-- Navbar - Menggunakan komponen AppNavbar -->
    <AppNavbar 
      title="Jangur Keramik"
      logo="/images/logo.png"
      :navItems="navItems"
      customClass="sticky top-0 z-50 transition-all duration-300 w-full"
      :show-main-nav="scrollOnTop"
      :view-mode="viewMode"
      @view-mode-change="changeViewMode"
    >
      
     
    </AppNavbar>

    <!-- product list session -->
    <section class="md:py-14 xs:py-8  px-4 product-list-session" ref="productListRef">
      <div class="container mx-auto">
        <ProductListTemplate 
          pageTitle="Produk Unggulan"
          pageSubtitle="Koleksi keramik terbaik dengan desain eksklusif dan kualitas premium"
        />
      </div>
    </section>


    
   
    
   
    
    <!-- Promotions Section -->
    <AppPromotionsSection :promotions="promotions" />
    
    <!-- Testimonials Section -->
    <AppTestimonialsSection 
      title="Testimoni Pelanggan"
      subtitle="Pengalaman nyata dari pelanggan yang telah menggunakan produk Jangur Keramik."
      :testimonials="testimonials"
      ctaText="Lihat Semua Testimoni"
      ctaLink="/testimonials"
    />
    
    <!-- CTA Section -->
    <div class="py-16 bg-gradient-to-r from-orange-500 to-blue-950 text-white">
      <div class="container mx-auto px-4 text-center">
        <div class="text-3xl font-bold mb-4">Siap Mempercantik Rumah Anda?</div>
        <div class="text-lg mb-8 max-w-2xl mx-auto">Konsultasikan kebutuhan keramik Anda dengan tim ahli kami dan dapatkan penawaran terbaik.</div>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link 
            to="/contact" 
            class="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Hubungi Kami
          </router-link>
          <router-link 
            to="/products" 
            class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span class="relative z-10 flex items-center">
              Lihat Katalog
              <span class="ml-2 text-orange-300 group-hover:translate-x-1 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- <AppFooter :socialLinks="socialLinks" :footerLinkSections="footerLinkSections" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
// import AppIcon from '../components/atoms/AppIcon.vue';
import { useProductStore } from 'src/stores/product-store';
import { storeToRefs } from 'pinia';

const AppNavbar = defineAsyncComponent(()=> import('components/organisms/AppNavbar.vue'))
// const AppFooter = defineAsyncComponent(()=> import('components/organisms/AppFooter.vue'))
// const AppButton = defineAsyncComponent(()=> import('components/atoms/AppButton.vue'))
const ProductListTemplate = defineAsyncComponent(()=> import('components/templates/ProductListTemplate.vue'))
const AppPromotionsSection = defineAsyncComponent(()=> import('components/organisms/AppPromotionsSection.vue'))
const AppTestimonialsSection = defineAsyncComponent(()=> import('components/organisms/AppTestimonialsSection.vue'))

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
  },
  {
    id: 3,
    title: 'Beli 10 Gratis 1',
    description: 'Beli 10 dus keramik dapatkan 1 dus gratis untuk tipe yang sama',
    discount: 'Beli 10 Gratis 1',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    validUntil: '30 November 2023',
    link: '/products?promo=buy10get1'
  },
  {
    id: 4,
    title: 'Flash Sale Mingguan',
    description: 'Diskon spesial setiap hari Jumat untuk produk pilihan',
    discount: 'Hingga 40% OFF',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    validUntil: 'Setiap Jumat',
    link: '/products?promo=flash-sale'
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

// eslint-disable-next-line no-unused-vars
const socialLinks = [
  { icon: 'facebook', href: 'https://facebook.com/jangurkeramik' },
  { icon: 'instagram', href: 'https://instagram.com/jangurkeramik' },
  { icon: 'twitter', href: 'https://twitter.com/jangurkeramik' },
  { icon: 'youtube', href: 'https://youtube.com/jangurkeramik' }
];

// eslint-disable-next-line no-unused-vars
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
