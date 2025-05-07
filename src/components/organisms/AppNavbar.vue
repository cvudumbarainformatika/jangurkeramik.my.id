<template>
  <header :class="customClass">
    <!-- Top Bar -->
    <div class="bg-gradient-to-r from-gray-900 to-blue-900 text-white text-sm" v-if="showTopBar">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
          <div class="flex items-center mr-6">
            <AppIcon name="phone" size="sm" class="mr-1" />
            <span>{{ contactPhone }}</span>
          </div>
          <div class="flex items-center">
            <AppIcon name="mail" size="sm" class="mr-1" />
            <span>{{ contactEmail }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <AppNavLink v-for="(link, index) in topLinks" :key="index" v-bind="link" customClass="text-white text-xs hover:text-blue-200 transition-colors" />
        </div>
      </div>
    </div>
    
    <!-- Main Navbar - Elegan & Futuristik -->
    <div 
      :class="[
        'backdrop-blur-xl transition-all duration-500 border-b', 
        isScrolled ? 'bg-white/80 shadow-lg border-transparent' : 'bg-white/50 border-gray-100/20',
        mainNavClass
      ]"
    >
      <div class="container mx-auto">
        <div class="flex items-center justify-between py-2 px-4">
          <!-- Logo -->
          <router-link to="/" class="flex items-center group">
            <div class="relative w-12 h-12 mr-3 overflow-hidden">
              <!-- Efek latar belakang futuristik -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50"></div>
              
              <!-- Efek garis futuristik -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 left-1/2 w-px h-full bg-white/50 transform -translate-x-1/2"></div>
                <div class="absolute top-1/2 left-0 w-full h-px bg-white/50 transform -translate-y-1/2"></div>
                <div class="absolute top-0 left-0 w-full h-full border border-white/20 rounded-xl"></div>
              </div>
              
              <!-- Logo text atau icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-white font-bold text-xl">JK</span>
              </div>
              
              <!-- Efek glow -->
              <div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            
            <!-- Brand name -->
            <div class="flex flex-col">
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500">Jangur Keramik</span>
              <span class="text-xs text-gray-500 tracking-wider">PREMIUM QUALITY</span>
            </div>
          </router-link>
          
          <!-- Spacer untuk layout -->
          <div class="flex-grow"></div>
          
          <!-- Search and Actions -->
          <div class="flex items-center space-x-2">
            <!-- Search -->
            <div v-if="showSearch">
              <slot name="search">
                <div class="relative">
                  <!-- Search Icon Button -->
                  <AppIconButton 
                    icon="search"
                    size="lg"
                    @click="toggleSearch"
                    aria-label="Search"
                  />
                  
                  <!-- Search Overlay -->
                  <div 
                    v-if="isSearchOpen" 
                    class="fixed inset-0 bg-black/5 backdrop-blur-sm z-50"
                    @click="isSearchOpen = false"
                  ></div>
                  
                  <!-- Search Panel -->
                  <div 
                    v-if="isSearchOpen"
                    class="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50"
                  >
                    <div class="bg-white rounded-xl shadow-xl overflow-hidden p-4 mx-4">
                      <div class="relative">
                        <AppIcon name="search" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Cari produk..." 
                          class="w-full bg-gray-50 border border-gray-200 rounded-full py-3 px-4 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          v-model="searchQuery"
                          @keyup.enter="performSearch"
                          @keyup.esc="isSearchOpen = false"
                          ref="searchInput"
                        >
                        <AppIconButton 
                          icon="x"
                          color="gray"
                          class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-red-500"
                          @click="isSearchOpen = false"
                        />
                      </div>
                      
                      <!-- Quick Links (optional) -->
                      <div class="mt-4 pt-4 border-t border-gray-100">
                        <p class="text-sm text-gray-500 mb-2">Pencarian Populer:</p>
                        <div class="flex flex-wrap gap-2">
                          <button 
                            v-for="(tag, i) in ['Keramik Lantai', 'Keramik Dinding', 'Granit', 'Marmer']" 
                            :key="i"
                            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            @click="quickSearch(tag)"
                          >
                            {{ tag }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </slot>
            </div>
            
            <!-- User Icon Only -->
            <AppIconButton 
              icon="user"
              size="lg"
              class="relative"
            >
              <span class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-sm shadow-blue-500/30"></span>
            </AppIconButton>
            
         
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="py-2 mt-2 border-t border-gray-100/30 bg-gradient-to-b from-white/0 to-white/20 backdrop-blur-sm rounded-b-lg" v-if="showMainNav">
          <div class="flex justify-between items-center">
            <!-- Main Navigation (center) - Dihapus untuk mengubah konsep menjadi List Product -->
            <div class="desktop-hidden">
              <AppIconButton 
                icon="filter"
                size="lg"
                @click="toggleFilterPanel"
              />
            </div>
            <div class="desktop-only">.</div>
            <!-- Action Buttons (right) -->
            <AppActionButtons 
              :productCount="128"
              @view-mode-change="handleViewModeChange"
              @sort-change="handleSortChange"
              @filter-click="toggleFilterPanel"
              custom-class="px-4"
            />
          </div>
        </nav>
      </div>
    </div>
    
    <!-- Mobile Menu - Elegan & Futuristik -->
    <div 
      v-if="mobileMenuOpen" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      @click="mobileMenuOpen = false"
    >
      <div 
        class="absolute top-0 right-0 w-72 h-full bg-white/95 backdrop-blur-md shadow-xl transform transition-transform"
        @click.stop
      >
        <div class="p-4 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Menu</h3>
            <AppIconButton 
              icon="x"
              @click="mobileMenuOpen = false"
              customClass="rounded-full hover:bg-gray-100"
            />
          </div>
        </div>
        
        <div class="p-4">
          <div class="mb-6" v-if="showSearch">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Cari produk..." 
                class="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <AppIcon name="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <ul class="space-y-4">
            <li v-for="(item, index) in navItems" :key="index">
              <AppNavLink 
                :label="item.label" 
                :to="item.to" 
                :href="item.href" 
                :external="item.external"
                customClass="block py-2 font-medium"
                activeClass="text-blue-600"
                inactiveClass="text-gray-700 hover:text-blue-600 transition-colors"
                @click="mobileMenuOpen = false"
              />
            </li>
          </ul>
          
          <div class="mt-6 pt-6 border-t border-gray-100">
            <div class="grid grid-cols-2 gap-4">
              <button class="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <AppIcon name="user" class="mr-2 text-blue-600" />
                <span class="font-medium">Akun</span>
              </button>
              <button class="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <AppIcon name="heart" class="mr-2 text-blue-600" />
                <span class="font-medium">Wishlist</span>
              </button>
              <button class="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <AppIcon name="shopping-cart" class="mr-2 text-blue-600" />
                <span class="font-medium">Keranjang</span>
              </button>
              <button class="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <AppIcon name="headphones" class="mr-2 text-blue-600" />
                <span class="font-medium">Bantuan</span>
              </button>
            </div>
            
            <div class="mt-6">
              <ul class="space-y-3">
                <li v-for="(link, index) in topLinks" :key="index">
                  <AppNavLink 
                    v-bind="link" 
                    customClass="block py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    @click="mobileMenuOpen = false"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import AppIcon from '../atoms/AppIcon.vue';
import AppNavLink from '../molecules/AppNavLink.vue';
import AppActionButtons from '../molecules/AppActionButtons.vue';
import AppIconButton from '../atoms/AppIconButton.vue';

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
  contactPhone: {
    type: String,
    default: '+62 812 3456 7890'
  },
  contactEmail: {
    type: String,
    default: 'info@jangurkeramik.com'
  },
  topLinks: {
    type: Array,
    default: () => [
      { label: 'Tentang Kami', to: '/about' },
      { label: 'Kontak', to: '/contact' },
      { label: 'FAQ', to: '/faq' }
    ]
  },
  showTopBar: {
    type: Boolean,
    default: false
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showMainNav: {
    type: Boolean,
    default: true
  },
  useGradientLogo: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  mainNavClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['search', 'view-mode-change', 'sort-change', 'filter-toggle']);

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

// Fungsi untuk menangani perubahan mode tampilan
const handleViewModeChange = (mode) => {
  console.log('View mode changed to:', mode);
  emit('view-mode-change', mode);
};

// Fungsi untuk menangani perubahan pengurutan
const handleSortChange = (sortValue) => {
  console.log('Sort changed to:', sortValue);
  emit('sort-change', sortValue);
};

// Fungsi untuk toggle panel filter
const toggleFilterPanel = () => {
  console.log('Toggle filter panel');
  emit('filter-toggle');
};

// Menambahkan efek scroll untuk navbar
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Fungsi untuk toggle search
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  
  // Update body class berdasarkan status search
  if (isSearchOpen.value) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
};

// Fungsi untuk pencarian cepat
const quickSearch = (term) => {
  searchQuery.value = term;
  performSearch();
};

// Fungsi untuk melakukan pencarian
const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
    isSearchOpen.value = false;
    document.body.classList.remove('overflow-hidden'); // Pastikan class dihapus
  }
};

// Focus input ketika search dibuka
watch(isSearchOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    searchInput.value?.focus();
  } else {
    searchQuery.value = '';
  }
});

// Tutup search ketika klik di luar
const handleClickOutside = (event) => {
  if (isSearchOpen.value && searchInput.value && !searchInput.value.contains(event.target) && !event.target.closest('button')) {
    isSearchOpen.value = false;
    document.body.classList.remove('overflow-hidden'); // Pastikan class dihapus
  }
};

// Tambahkan event listener untuk ESC key
const handleEscKey = (event) => {
  if (event.key === 'Escape' && isSearchOpen.value) {
    isSearchOpen.value = false;
    document.body.classList.remove('overflow-hidden'); // Pastikan class dihapus
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscKey);
  document.body.classList.remove('overflow-hidden');
});

// Watch isSearchOpen untuk memastikan class body selalu diperbarui
watch(isSearchOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});
</script>

<script>
/**
 * @component AppNavbar
 * @description Komponen organisme navbar elegan & futuristik yang dapat dikustomisasi dengan berbagai opsi
 * @example
 * <AppNavbar 
 *   title="Jangur Keramik"
 *   logo="/images/logo.png"
 *   :navItems="[
 *     { label: 'Beranda', to: '/' },
 *     { label: 'Produk', to: '/products' }
 *   ]"
 *   contactPhone="+62 812 3456 7890"
 *   contactEmail="info@jangurkeramik.com"
 *   :showTopBar="true"
 *   :showSearch="true"
 *   :useGradientLogo="true"
 *   customClass="bg-white/90 backdrop-blur-md"
 * >
 *   <template #actions>
 *     <!-- Custom actions content -->
 *   </template>
 * </AppNavbar>
 */
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
