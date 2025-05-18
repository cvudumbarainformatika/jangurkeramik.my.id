<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Header -->
    <div class="sticky top-0 z-10 px-4 pt-10 pb-4 bg-white shadow-sm">
      <div class="flex items-center">
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="flex-shrink-0 px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AppIcon name="chevron-left" size="lg" />
        </button>

        <div class="text-xl font-bold ml-2">Keranjang Belanja</div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6">
      <!-- Empty Cart State -->
      <div v-if="cartItems.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm">
        <AppIcon name="shopping-cart" size="xl" class="mx-auto mb-4 text-gray-300" />
        <div class="text-xl font-semibold text-gray-700 mb-2">Keranjang Anda Kosong</div>
        <p class="text-gray-500 mb-6">Tambahkan produk ke keranjang untuk mulai berbelanja</p>
        <button
          @click="$router.push('/')"
          class="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-md transition-all"
        >
          Mulai Belanja
        </button>
      </div>

      <!-- Cart Items -->
      <div v-else>
        <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div class="p-4 border-b border-gray-100">
            <div class="font-semibold">Produk dalam Keranjang ({{ cartItems?.length }})</div>
            <div class="font-semibold">Jumlah Item dalam Keranjang ({{ cartCount }})</div>
          </div>

          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="p-4 border-b border-gray-100 last:border-b-0"
          >
            <div class="flex gap-3">
              <!-- Product Image -->
              <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  :src="item?.image || '/images/No-Image.svg'"
                  :alt="item?.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-1">
                <div class="font-medium line-clamp-2">{{ item?.name }}</div>
                <div class="text-orange-500 font-bold mt-1">Rp {{ formatPrice(item?.price) }}</div>

                <!-- Quantity Controls -->
                <div class="flex items-center mt-2">
                  <button
                    @click="decreaseQuantity(index)"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                    :disabled="item.quantity <= 1"
                  >
                    <AppIcon name="minus" size="sm" />
                  </button>
                  <div
                    class="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-gray-50"
                  >
                    {{ item.quantity }}
                  </div>
                  <button
                    @click="increaseQuantity(index)"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                  >
                    <AppIcon name="plus" size="sm" />
                  </button>

                  <!-- Remove Button -->
                  <button
                    @click="removeFromCart(item)"
                    class="ml-auto text-gray-400 hover:text-red-500"
                  >
                    <AppIcon name="trash" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div class="p-4 border-b border-gray-100">
            <div class="font-semibold">Ringkasan Pesanan</div>
          </div>

          <div class="p-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span>Rp {{ formatPrice(subtotal) }}</span>
            </div>
            <!-- <div class="flex justify-between mb-2">
              <span class="text-gray-600">Pengiriman</span>
              <span>Rp {{ formatPrice(shipping) }}</span>
            </div> -->
            <div class="flex justify-between font-bold mt-3 pt-3 border-t border-gray-100">
              <span>Total</span>
              <span class="text-orange-500">Rp {{ formatPrice(total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pb-[300px]"></div>

    <!-- Fixed Bottom Checkout Button -->
    <div
      v-if="cartItems.length > 0"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
    >
      <div class="flex justify-between items-center mb-3">
        <div>
          <div class="text-gray-600">Total</div>
          <div class="text-xl font-bold text-orange-500">Rp {{ formatPrice(total) }}</div>
        </div>

        <button
          @click="checkout"
          class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
        >
          Lanjut ke Pemesanan
        </button>
      </div>
    </div>

    <!-- Dialog Supplier -->
    <!-- <SupplierOrderDialog
      v-model="showDialog"
      @close="showDialog = false"
      @checkout="handleCheckout"
    /> -->

    <NewSupplierOrderDialog v-model="showDialog" @close="showDialog=false" @checkout="handleCheckout" />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from 'components/atoms/AppIcon.vue'
import { useCartStore } from 'src/stores/cart-store'
import { storeToRefs } from 'pinia'
import { useOrderStore } from 'src/stores/order-store'
import { useAuthStore } from 'src/stores/auth-store'

// const SupplierOrderDialog = defineAsyncComponent(
//   () => import('components/organisms/supplier/SupplierOrderDialog.vue'),
// )

const NewSupplierOrderDialog = defineAsyncComponent(()=> import('components/organisms/supplier/NewSupplierOrderDialog.vue'))

// eslint-disable-next-line no-unused-vars
const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const showDialog = ref(false)

const { items: cartItems, cartCount, cartTotal } = storeToRefs(cartStore)
const { increaseQuantity, decreaseQuantity, removeFromCart } = cartStore

// Biaya pengiriman
// const shipping = ref(25000)

// Computed properties
const subtotal = computed(() => {
  return cartTotal.value || 0
})

const total = computed(() => {
  return subtotal.value 
})

// Methods
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price || 0)
}

// function increaseQuantity(index) {
//   cartItems.value[index].quantity++;
// }

// function decreaseQuantity(index) {
//   if (cartItems.value[index].quantity > 1) {
//     cartItems.value[index].quantity--;
//   }
// }

// function removeItem(index) {
//   cartItems.value.splice(index, 1)
// }

function checkout() {
  // Implementasi checkout
  console.log('Proceeding to checkout with items:', cartItems.value)
  showDialog.value = true
}

 
const handleCheckout = () => {

  const pelanggan = authStore.user?.id

  orderStore.postOrder(pelanggan)
  showDialog.value = false


  // showDialog.value = true
}
</script>
