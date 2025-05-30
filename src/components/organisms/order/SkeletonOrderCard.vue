<template>
  <div class="flex items-center gap-3 bg-white rounded-lg shadow p-3 animate-pulse">
    <!-- Gambar produk -->
    <div class="w-16 h-16 rounded-lg bg-gray-200"></div>

    <!-- Konten -->
    <div class="flex-1 min-w-0 space-y-2">
      <!-- Baris 1: No order & status -->
      <div class="flex items-center justify-between">
        <div class="w-24 h-3 bg-gray-200 rounded"></div>
      </div>

      <!-- Baris 2: Jumlah produk dan harga -->
      <div class="w-32 h-3 bg-gray-200 rounded"></div>

      <!-- Baris 3: Tanggal order -->
      <div class="w-28 h-3 bg-gray-200 rounded"></div>

      <!-- Baris 4: Nama pelanggan -->
      <div class="flex items-center justify-between">
        <div class="w-24 h-5 bg-gray-300 rounded-full"></div>
        <div class="w-20 h-5 bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    <!-- Ikon panah -->
    <!-- <div class="w-4 h-4 bg-gray-300 rounded"></div> -->
  </div>
</template>
