<template>
  <div></div>
</template>

<script setup>
import {onMounted} from 'vue'
import { socket } from 'src/modules/sockets'

import { useOrderStore } from 'src/stores/order-store'
import { storeToRefs } from 'pinia';


const orderStore = useOrderStore()
// const { historyOrder } = orderStore
const { orders, selectedOrder } = storeToRefs(orderStore)


onMounted(() => {
  // console.log('dari ngurusi socket ...');
  
  joinkeOrderPenjualan()

});

function joinkeOrderPenjualan(){
  socket.on('connect', () => {
    console.log('[SOCKET] Connected:', socket.id)
    socket.emit('join-room', 'order-penjualan') // ⬅️ ini harus lihat socket.on di server, jika namanya mboh, maka emit nya mboh ('order-penjualan') ini nama roomnya
    console.log('[SOCKET] join emitted ke order-penjualan');
  })

  // ini harus lihat event yang dikirim dari laravel
  socket.on('order-status', (data) => {
    console.log('[EVENT] order-status:', data);
    // baru lanjut mau ngapain saja setelah ngelihat console data 

    const order = orders.value?.find(x=>x.id === data?.order?.id)
    if (order) {
      order['status_order'] = data?.order?.status_order || null
    }

    const orderId = selectedOrder?.value?.id === data?.order?.id

    if (orderId) {
      selectedOrder.value['status_order'] = data?.order['status_order'] ?? null
    }
    

    
    
  });

  socket.on('connect_error', (err) => {
    console.error('[SOCKET] Connection Error:', err)
  })

  socket.on('disconnect', (reason) => {
    console.warn('[SOCKET] Disconnected:', reason)
  })

  // socket.on('reconnect_attempt', () => {
  //   console.log('[SOCKET] Trying to reconnect...')
  // })

}

</script>