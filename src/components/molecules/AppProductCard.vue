<template>
  <div :class="[
    'group bg-white rounded-sm border border-gray-300 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300',
    viewMode === 'grid' ? 'transform hover:-translate-y-1' : 'flex flex-row'
  ]" @click="emit('view-product', product)">
    <!-- Product Image -->
    <div :class="[
      'relative overflow-hidden cursor-pointer',
      viewMode === 'grid' ? 'h-auto' : 'w-1/3'
    ]">
      <AppProductImage
        :src="product?.images?.length 
          ? product?.images.find(x=>x?.flag_thumbnail === '1')?.gambar || product?.images[0]?.gambar
          : null"
        :alt="product?.name"
        :aspect="viewMode === 'grid' ? (product.images.length ? '1/1' : '1/1') : ''"
        :hoverZoom="true"
      />

      <!-- Badges -->
      <div class="absolute bottom-1 right-1 flex flex-col gap-1">
        <span v-if="auth?.user" 
          :class="`${setStok(product)==='No Stok'? 'bg-orange-800':'bg-orange-500'} text-white px-2 py-1 rounded-full`" style="font-size: 0.60rem;">

          {{ setStok(product) }}
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <AppIconButton
          icon="heart"
          color="white"
          customClass="bg-white/20 backdrop-blur-md rounded-full hover:bg-orange-500 hover:text-white"
        />
        <AppIconButton
          icon="eye"
          color="white"
          customClass="bg-white/20 backdrop-blur-md rounded-full hover:bg-orange-500 hover:text-white"
        />
      </div>
    </div>

    <!-- Product Info -->
    <div :class="[
      'p-2 md:p-4 flex flex-col',
      viewMode === 'grid' ? '' : 'w-2/3'
    ]">
      <div class="mb-1 flex items-center">
        <div class="text-xs text-gray-700 truncate overflow-hidden whitespace-nowrap">{{ product?.category }}</div>
        <div class="ml-auto flex">
          <!-- <AppIcon
            v-for="i in 5"
            :key="i"
            :name="i <= Math.floor(product?.rating) ? 'star-filled' : 'star'"
            size="md"
            class="text-orange-400"
          /> -->
        </div>
      </div>

      <!-- Title with fixed height container -->
      <div :class="[
        viewMode === 'grid' ? 'h-14' : 'h-auto'
      ]">
        <div :class="[
          'text-xs sm:text-sm font-semibold group-hover:text-orange-500 transition-colors',
          viewMode === 'grid' ? 'line-clamp-2' : ''
        ]">
          {{ product?.name }}
        </div>
      </div>

      <p v-if="viewMode === 'list'" class="text-gray-600 mb-4 line-clamp-2">
        {{ product?.namagabung || 'Product berkualitas tinggi dengan desain modern yang cocok untuk berbagai ruangan.' }}
      </p>

      <!-- Spacer to push price and button to bottom -->
      <div class="flex-grow"></div>

      <div class="flex items-center justify-between mt-2">
        <div class="flex flex-col">
          <!-- <span v-if="product.discountPrice" class="text-gray-500 text-sm line-through">
            Rp {{ formatPrice(product.price) }}
          </span> -->
          <span class="text-sm text-orange-500 font-bold text-base">
            Rp {{ formatPrice(product?.discountPrice || product?.price) }}
          </span>
        </div>

        <!-- <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors">
          Beli
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
// import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';
// import AppProductImage from 'src/components/organisms/product/AppProductImage.vue';

import { useAuthStore } from 'src/stores/auth-store'
import { formatStok } from 'src/modules/konversi'

const AppProductImage = defineAsyncComponent(() => import('src/components/organisms/product/AppProductImage.vue'));

const auth = useAuthStore()


defineProps({
  product: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
});

const emit = defineEmits(['view-product']);

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

function setStok(product){
  const data = product?.stoks || []
  const totalJumlahK = data?.reduce((total, item) => {
    return total + parseInt(item.jumlah_k || 0);
  }, 0);

  return formatStok(totalJumlahK, product?.isi, product?.satuan_b, product?.satuan_k, 'No Stok')
}
</script>
