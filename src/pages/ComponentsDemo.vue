<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold mb-6">Komponen UI Jangur Keramik</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Buttons</h2>
      <div class="flex flex-wrap gap-2">
        <app-button label="Primary" />
        <app-button label="Secondary" color="secondary" />
        <app-button label="Outline" variant="outline" />
        <app-button label="Flat" variant="flat" />
        <app-button label="Custom" variant="custom" />
        <app-button label="With Icon" icon="shopping_cart" />
        <app-button label="Rounded" rounded />
        <app-button label="Disabled" disabled />
      </div>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Inputs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-input
          v-model="inputText"
          label="Text Input"
          placeholder="Enter some text"
          helper-text="This is a helper text"
        />
        
        <app-input
          v-model="inputPassword"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        
        <app-input
          v-model="inputError"
          label="Input with Error"
          error-message="This field is required"
        />
        
        <app-input
          v-model="inputDisabled"
          label="Disabled Input"
          placeholder="You can't edit this"
          disabled
        />
      </div>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <app-card
          title="Basic Card"
          subtitle="A simple card example"
        >
          <p>This is the content of the card. You can put any content here.</p>
          
          <template v-slot:actions>
            <q-space />
            <app-button label="Action" flat />
            <app-button label="Submit" />
          </template>
        </app-card>
        
        <app-card
          title="Card with Image"
          subtitle="Shows an image"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        >
          <p>Cards can display images at the top.</p>
          
          <template v-slot:actions>
            <q-space />
            <app-button label="View" flat />
          </template>
        </app-card>
        
        <app-card
          bordered
          hover
        >
          <div class="text-center p-4">
            <q-icon name="info" size="3rem" color="primary" />
            <h3 class="text-lg font-medium mt-2">Custom Content</h3>
            <p class="mt-2">You can customize the entire content of the card.</p>
          </div>
        </app-card>
      </div>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Product Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <product-card
          v-for="product in sampleProducts"
          :key="product.id"
          :product="product"
          @view="onViewProduct"
          @buy="onBuyProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppButton from 'components/ui/AppButton.vue';
import AppInput from 'components/ui/AppInput.vue';
import AppCard from 'components/ui/AppCard.vue';
import ProductCard from 'components/features/ProductCard.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// Input demo values
const inputText = ref('');
const inputPassword = ref('');
const inputError = ref('');
const inputDisabled = ref('This is disabled');

// Sample products for demo
const sampleProducts = ref([
  {
    id: '1',
    name: 'Keramik Granit Premium',
    code: 'KRM-101',
    price: 185000,
    description: 'Keramik granit premium dengan motif marmer, tahan gores dan noda.',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg',
    stock: 15,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    name: 'Keramik Dinding Motif',
    code: 'KRM-202',
    price: 95000,
    description: 'Keramik dinding dengan motif geometris modern untuk interior rumah.',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
    stock: 3,
    rating: 4.5,
    reviewCount: 87
  },
  {
    id: '3',
    name: 'Keramik Lantai Outdoor',
    code: 'KRM-303',
    price: 125000,
    description: 'Keramik lantai khusus outdoor, anti slip dan tahan cuaca.',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    stock: 0,
    rating: 4.2,
    reviewCount: 56
  }
]);

// Event handlers
const onViewProduct = (productId) => {
  $q.notify({
    message: `Melihat detail produk ID: ${productId}`,
    color: 'info'
  });
};

const onBuyProduct = (productId) => {
  $q.notify({
    message: `Menambahkan produk ID: ${productId} ke keranjang`,
    color: 'positive'
  });
};
</script>
