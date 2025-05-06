<template>
  <div>
    <AppNavbar :title="title" :logo="logo" :navItems="navItems" />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl font-bold mb-4">{{ heroTitle }}</h1>
            <p class="text-xl mb-8">{{ heroSubtitle }}</p>
            <div class="flex flex-wrap gap-4">
              <AppButton 
                v-for="(button, index) in heroButtons" 
                :key="index"
                :label="button.label"
                :color="button.color || 'white'"
                :variant="button.variant"
                @click="$emit('hero-button-click', button)"
              />
            </div>
          </div>
          <div class="hidden md:block">
            <img v-if="heroImage" :src="heroImage" alt="Hero" class="w-full h-auto rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <main>
      <slot></slot>
    </main>
    
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
import AppButton from '../atoms/AppButton.vue';

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
  heroTitle: {
    type: String,
    default: 'Keramik Berkualitas untuk Rumah Impian Anda'
  },
  heroSubtitle: {
    type: String,
    default: 'Temukan koleksi keramik premium dengan desain eksklusif dan kualitas terbaik'
  },
  heroImage: {
    type: String,
    default: ''
  },
  heroButtons: {
    type: Array,
    default: () => [
      { label: 'Lihat Produk', color: 'white', variant: '' },
      { label: 'Hubungi Kami', color: 'white', variant: 'outline' }
    ]
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

defineEmits(['hero-button-click']);
</script>

<script>
/**
 * @component HomeTemplate
 * @description Template untuk halaman beranda yang menggabungkan navbar, hero section, dan footer
 * @example
 * <HomeTemplate
 *   title="Jangur Keramik"
 *   heroTitle="Keramik Berkualitas untuk Rumah Impian Anda"
 *   heroSubtitle="Temukan koleksi keramik premium dengan desain eksklusif dan kualitas terbaik"
 *   heroImage="/images/hero.jpg"
 *   :navItems="[...]"
 *   :heroButtons="[...]"
 *   :socialLinks="[...]"
 *   :footerLinkSections="[...]"
 *   @hero-button-click="handleHeroButtonClick"
 * >
 *   <!-- Konten utama halaman beranda -->
 * </HomeTemplate>
 */
</script>