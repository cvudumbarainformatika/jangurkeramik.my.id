<template>
  <div class="flex flex-col">
    <!-- Header dengan Tailwind + Quasar -->
    <div class="bg-gradient-to-r from-primary to-secondary p-4">
      <h1 class="text-2xl font-bold text-white">Jangur Keramik</h1>
      <p class="text-white opacity-80">Solusi Keramik Terbaik</p>
    </div>
    
    <!-- Grid produk dengan Tailwind -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <!-- Kartu produk dengan Quasar + Tailwind -->
      <q-card v-for="i in 6" :key="i" class="hover:shadow-lg transition-shadow">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" class="h-48 object-cover" />
        <q-card-section>
          <div class="text-lg font-medium">Keramik Premium {{ i }}</div>
          <div class="text-gray-500">Kode: KRM-{{ 100 + i }}</div>
        </q-card-section>
        <q-card-actions class="justify-between">
          <q-btn flat color="primary" label="Detail" class="hover:bg-blue-50" />
          <q-btn color="secondary" label="Beli" class="hover:bg-teal-600" />
        </q-card-actions>
      </q-card>
    </div>
    
    <!-- Footer dengan Tailwind -->
    <div class="mt-auto bg-gray-100 p-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-2">Tentang Kami</h3>
          <p class="text-gray-600">Jangur Keramik menyediakan berbagai pilihan keramik berkualitas untuk rumah dan bangunan Anda.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Kontak</h3>
          <p class="text-gray-600">Email: info@jangurkeramik.my.id</p>
          <p class="text-gray-600">Telepon: (021) 1234-5678</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Ikuti Kami</h3>
          <div class="flex space-x-4">
            <q-btn round flat color="primary" icon="fab fa-facebook" />
            <q-btn round flat color="primary" icon="fab fa-instagram" />
            <q-btn round flat color="primary" icon="fab fa-twitter" />
          </div>
        </div>
      </div>
      <div class="text-center mt-8 text-gray-500">
        &copy; 2024 Jangur Keramik. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup>
// Script kosong karena halaman ini tidak memerlukan logika
</script>
