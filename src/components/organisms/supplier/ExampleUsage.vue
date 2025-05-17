<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Demo SupplierOrderDialog</h1>
    <p class="mb-4">
      Komponen ini digunakan untuk menampilkan dialog pemesanan ke supplier.
      Ini memungkinkan pengguna untuk mencari supplier, melihat detailnya, dan melanjutkan pesanan.
    </p>

    <button
      @click="showDialog = true"
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
    >
      Buka Dialog Supplier
    </button>

    <!-- Dialog Supplier -->
    <SupplierOrderDialog
      v-model="showDialog"
      @close="handleDialogClose"
      @checkout="handleCheckout"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SupplierOrderDialog from './SupplierOrderDialog.vue';

const showDialog = ref(false);

const handleDialogClose = () => {
  console.log('Dialog ditutup');
};

const handleCheckout = (orderData) => {
  console.log('Checkout dengan data:', orderData);
  // Di sini bisa melakukan API call untuk checkout atau mengirim data ke komponen parent
  alert('Pesanan berhasil dibuat! Lihat console untuk detail pesanan.');
};
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>