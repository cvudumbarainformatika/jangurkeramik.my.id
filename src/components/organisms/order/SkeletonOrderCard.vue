<template>
  <div class="gap-4 bg-white rounded-xl shadow-sm p-2 animate-pulse">
    <!-- Header -->
    <div class="p-2 border-b border-gray-100 flex justify-between items-center">
      <div>
        <div class="h-4 bg-gray-200 rounded w-28 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-44"></div>
      </div>
      <div class="w-20 h-6 bg-gray-200 rounded-full"></div>
    </div>

    <!-- Produk & Info -->
    <div class="p-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="flex -space-x-2">
          <div v-for="n in 3" :key="n" class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 border-2 border-white" />
          <div class="w-8 h-8 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
            ...
          </div>
        </div>

        <div class="flex-1">
          <div class="h-3 bg-gray-200 rounded w-32 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex gap-4 mt-4">
        <div class="flex-1 h-9 bg-gray-200 rounded-lg"></div>
        <div class="flex-1 h-9 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>