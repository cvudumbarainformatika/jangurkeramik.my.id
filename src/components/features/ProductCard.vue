<template>
  <app-card
    :title="product.name"
    :subtitle="'Kode: ' + product.code"
    :img-src="product.image"
    :img-height="imgHeight"
    hover
    bordered
    custom-class="h-full"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-bold text-primary">
          {{ formatPrice(product.price) }}
        </div>
        <q-badge
          v-if="product.stock <= 5 && product.stock > 0"
          color="warning"
          text-color="white"
          :label="`Stok: ${product.stock}`"
        />
        <q-badge
          v-else-if="product.stock === 0"
          color="negative"
          text-color="white"
          label="Habis"
        />
      </div>
      
      <p class="text-gray-600 text-sm line-clamp-2">
        {{ product.description }}
      </p>
      
      <div class="flex items-center mt-2">
        <div class="flex items-center">
          <q-icon name="star" size="xs" color="amber" />
          <span class="text-sm ml-1">{{ product.rating }}</span>
        </div>
        <span class="text-xs text-gray-500 ml-2">({{ product.reviewCount }} ulasan)</span>
      </div>
    </div>
    
    <template v-slot:actions>
      <q-space />
      <app-button
        variant="flat"
        color="primary"
        label="Detail"
        @click="$emit('view', product.id)"
      />
      <app-button
        color="secondary"
        :label="product.stock > 0 ? 'Beli' : 'Pre-Order'"
        :disabled="product.stock === 0 && !allowPreOrder"
        @click="$emit('buy', product.id)"
      />
    </template>
  </app-card>
</template>

<script setup>
import AppCard from 'components/ui/AppCard.vue';
import AppButton from 'components/ui/AppButton.vue';

defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      code: '',
      price: 0,
      description: '',
      image: '',
      stock: 0,
      rating: 0,
      reviewCount: 0
    })
  },
  imgHeight: {
    type: String,
    default: '200px'
  },
  allowPreOrder: {
    type: Boolean,
    default: false
  }
});

defineEmits(['view', 'buy']);

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
