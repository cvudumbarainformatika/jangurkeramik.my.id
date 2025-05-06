<template>
  <div>
    <AppNavbar :title="title" :logo="logo" :navItems="navItems" />
    
    <!-- Breadcrumbs -->
    <div v-if="showBreadcrumbs" class="bg-gray-100 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center text-sm text-gray-500">
          <router-link to="/" class="hover:text-primary">Beranda</router-link>
          <span class="mx-2">/</span>
          <router-link :to="categoryLink" class="hover:text-primary">{{ categoryName }}</router-link>
          <span class="mx-2">/</span>
          <span class="font-medium text-gray-900">{{ productName }}</span>
        </div>
      </div>
    </div>
    
    <!-- Product Detail -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
          <slot name="images"></slot>
        </div>
        
        <!-- Product Info -->
        <div>
          <slot name="info"></slot>
        </div>
      </div>
      
      <!-- Product Description and Details -->
      <div class="mt-16">
        <slot name="details"></slot>
      </div>
      
      <!-- Related Products -->
      <div v-if="showRelatedProducts" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
        <slot name="related-products"></slot>
      </div>
    </div>
    
    <!-- Footer -->
    <AppFooter 
      :title="title"
      :logo="logo"
      :description="footerDescription"
      :socialLinks="socialLinks"
      :linkSections="footerLinkSections"
    />
  </div>
</template>

<script setup>
import AppNavbar from '../organisms/AppNavbar.vue';
import AppFooter from '../organisms/AppFooter.vue';

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
  productName: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    default: 'Produk'
  },
  categoryLink: {
    type: String,
    default: '/products'
  },
  showBreadcrumbs: {
    type: Boolean,
    default: true
  },
  showRelatedProducts: {
    type: Boolean,
    default: true
  },
  footerDescription: {
    type: String,
    default: 'Solusi keramik berkualitas untuk rumah dan bangunan Anda.'
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  footerLinkSections: {
    type: Array,
    default: () => []
  }
});
</script>

<script>
/**
 * @component ProductDetailTemplate
 * @description Template untuk halaman detail produk yang menampilkan informasi lengkap tentang produk
 * @example
 * <ProductDetailTemplate
 *   title="Jangur Keramik"
 *   productName="Keramik Granit Putih 60x60"
 *   categoryName="Keramik Lantai"
 *   categoryLink="/products/floor"
 *   :navItems="[...]"
 * >
 *   <template v-slot:images>
 *     <!-- Product image gallery -->
 *   </template>
 *   
 *   <template v-slot:info>
 *     <!-- Product information, price, and add to cart -->
 *   </template>
 *   
 *   <template v-slot:details>
 *     <!-- Product description, specifications, and reviews -->
 *   </template>
 *   
 *   <template v-slot:related-products>
 *     <!-- Related products carousel -->
 *   </template>
 * </ProductDetailTemplate>
 */
</script>