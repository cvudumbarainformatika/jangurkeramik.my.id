<template>
  <div :class="[
    'group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300',
    viewMode === 'grid' ? 'transform hover:-translate-y-1' : 'flex flex-row'
  ]" @click="emit('view-product', product)">
    <!-- Product Image -->
    <div :class="[
      'relative overflow-hidden cursor-pointer',
      viewMode === 'grid' ? 'h-auto' : 'w-1/3'
    ]">
      <img
        :src="product?.image || '/images/No-Image.svg'"
        :alt="product?.name"
        :class="[
          'w-full object-cover transition-transform duration-500 group-hover:scale-110',
          viewMode === 'grid' ? product.image? ' aspect-[4/3]': 'aspect-[1/1]' : 'h-56'
        ]"
      />

      
      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <!-- <span v-if="product.isNew" class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Baru</span> -->
        <span v-if="product.discount" class="bg-primary text-white text-xs px-2 py-1 rounded-full">-{{ product?.discount }}%</span>
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
        <span class="text-xs text-gray-500 truncate overflow-hidden whitespace-nowrap">{{ product?.category }}</span>
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
        viewMode === 'grid' ? 'h-16' : 'h-auto'
      ]">
        <div :class="[
          'font-semibold group-hover:text-orange-500 transition-colors',
          viewMode === 'grid' ? 'text-md xs:text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl line-clamp-2' : 'text-lg'
        ]">
          {{ product?.name }}
        </div>
      </div>
      
      <p v-if="viewMode === 'list'" class="text-gray-600 mb-4 line-clamp-3">
        {{ product?.namagabung || 'Product berkualitas tinggi dengan desain modern yang cocok untuk berbagai ruangan.' }}
      </p>
      
      <!-- Spacer to push price and button to bottom -->
      <div class="flex-grow"></div>
      
      <div class="flex items-center justify-between mt-2">
        <div class="flex flex-col">
          <!-- <span v-if="product.discountPrice" class="text-gray-500 text-sm line-through">
            Rp {{ formatPrice(product.price) }}
          </span> -->
          <span class="text-orange-500 font-bold text-base">
            Rp {{ formatPrice(product?.discountPrice || product?.price) }}
          </span>
        </div>
        
        <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors">
          Beli
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
// import AppIcon from '../atoms/AppIcon.vue';
import AppIconButton from '../atoms/AppIconButton.vue';

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
</script>
