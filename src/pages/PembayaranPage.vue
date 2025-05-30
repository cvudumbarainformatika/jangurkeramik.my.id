<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Header -->
    <div class="sticky top-0 z-10 px-2 pt-10 bg-white shadow-sm">
      <div class="flex items-center">
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="flex-shrink-0 px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AppIcon name="chevron-left" size="lg" />
        </button>

        <div class="text-md font-bold ml-2">Pembayaran # {{ order?.noorder || '000' }}</div>
      </div>
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div class="flex items-center gap-2 text-xs text-white bg-orange-500 py-0.5 px-2 rounded-full">
          <AppIcon name="users" size="xs" color="white" />
          <div> {{ order?.pelanggan?.nama }} </div>
        </div>
        
        <div class="flex flex-col justify-end gap-1">
          <OrderStatusBadge :status="order?.status_order" />
          
        </div>
      </div>
    </div>


    <div class="p-2">
      <PaymentMethodSelector 
        :order="order"
        @pembayaran="updateBayar"
        :loading="loadingUpdateStatus || loadingOrder"
      />
    </div>

  </div>

</template>

<script setup>
import {defineAsyncComponent, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import {useOrderStore} from 'src/stores/order-store'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from 'src/components/atoms/AppIcon.vue'

const PaymentMethodSelector = defineAsyncComponent(()=>import('src/components/organisms/order/PaymentMethodSelector.vue'))
const OrderStatusBadge = defineAsyncComponent(()=> import('src/components/organisms/order/OrderStatusBadge.vue'))

const store = useOrderStore()


const route = useRoute()
const router = useRouter()
onMounted(()=>{
  getOrderByNoOrder(route?.params?.id)
})

const { selectedOrder:order, loadingUpdateStatus, loadingOrder } = storeToRefs(store)
const { updatePembayaran, getOrderByNoOrder } = store

function updateBayar(item){
  updatePembayaran(item)
  .then(()=> {
    router.push('/orders')
  })
}

</script>