import { acceptHMRUpdate, defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useCartStore } from 'src/stores/cart-store'

export const useOrderStore = defineStore('order', {
  state: () => ({
    selectedSupplier: null,
    selectedPelanggan: null,
    total_harga: 0,
    status_order: '1',
    status_pembayaran: '1',
    loadingOrder: false,


    // history order
    orders:[],
    loading:false,
    selectedOrder:null,
    showDetail:false,

    loadingUpdateStatus:false
  }),
  actions: {
    clearOrder() {
      this.selectedSupplier = null
      this.items = []
      this.tglorder = null
      this.total_harga = 0
      this.status_order = '1'
      this.status_pembayaran = '1'
    },

    // Action untuk POST order ke backend
    async postOrder(user, jenis) {
      const cartStore = useCartStore()
      const items = cartStore.items

      // Pastikan selectedSupplier dan items sudah terisi
      if (jenis === 'pelanggan') {
        if (!this.selectedSupplier || !user || items.length === 0) {
          throw new Error('Data order belum lengkap')
        }

        if (!this.selectedSupplier || !user || items.length === 0) {
          throw new Error('Data order belum lengkap')
        }
      } else {
        if (!this.selectedPelanggan || !user || items.length === 0) {
          throw new Error('Data order belum lengkap')
        }
        if (!this.selectedPelanggan || !user || items.length === 0) {
          throw new Error('Data order belum lengkap')
        }
      }
      
      // Hitung total harga
      const total_harga = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
      // Bentuk payload sesuai backend

      const pelanggan_id = jenis === 'pelanggan' ? user : this.selectedPelanggan.id
      const sales_id = jenis === 'pelanggan' ? this.selectedSupplier.id : user

      const payload = {
        // pelanggan_id: user,
        // sales_id: this.selectedSupplier.id,
        pelanggan_id,
        sales_id,
        total_harga,
        status_order: this.status_order,
        status_pembayaran: this.status_pembayaran,
        rincians: items.map(item => ({
          barang_id: item.barang_id,
          jumlah: item.quantity,
          harga: parseFloat(item.price),
          subtotal: parseFloat(item.price) * item.quantity,
          satuan: item.satuan,
          satuans: items.satuans
        }))
      }
      // POST ke backend (ganti URL sesuai API Anda)
      this.loadingOrder = true
      try {
        const { data } = await api.post('/api/v2/order/penjualan', payload)
        // Kosongkan cart setelah order sukses
        cartStore.clearCart()
        return data
      } catch (error) {
        console.error('Error posting order:', error)
        throw error
      } finally {
        this.loadingOrder = false
      }
    },

    async historyOrder(){
      this.loading = true
      try {
        const { data } = await api.get('/api/v2/order/penjualan/by-pelanggan')
        console.log('Data orders:', data);
        
        this.orders = data?.data || []

      }catch (error){
        console.log('error history-order',error);
        
      } finally {
        this.loading = false
      }
    },


    async getOrderByNoOrder(value){
        this.loadingOrder=true
        try {
          const resp = await api.get(`api/v2/order/by-noorder?order=${value}`)
          this.selectedOrder = resp?.data?.data
          console.log('getOrderByNoOrder', this.selectedOrder);
          
        } catch (error) {
          console.log('getOrderByNoOrder', error);
          
        } finally {
          // console.log('getOrderByNoOrder');
          this.loadingOrder=false
        }

    },

    async updatePembayaran(item){
      console.log('updatePembayaran', item);
      this.loadingUpdateStatus=true
      const payload = {
        noorder: this.selectedOrder?.noorder,
        metode_bayar: item?.metode || 'Kredit',
        tempo: item?.tempo || 0,
        bayar: item.dp || item?.total || 0,
        catatan: item?.catatan || null,
        status_order: '4'
      }

      console.log('payload', payload);
      

      try {
        const resp = await api.post('api/v2/order/update-pembayaran', payload)
        console.log('updatePembayaran', resp);
        
      } catch (error) {
        console.log('updatePembayaran', error);
        
      } finally{
        this.loadingUpdateStatus=false
      }
      
    },
    
    async selesaikanOrder(item){
      // console.log('updatePembayaran', item);
      this.loadingUpdateStatus=true
      const payload = {
        id: item?.id,
        status_order: '6'
      }

      console.log('payload', payload);
      

      try {
        const resp = await api.post('api/v2/order/update-selesai', payload)
        console.log('updateSelesai', resp);
        
      } catch (error) {
        console.log('updatePembayaran', error);
        
      } finally{
        this.loadingUpdateStatus=false
      }
      
    }

  },


  

  getters: {
    totalItems: (state) => state.items.length,
    isReady: (state) => !!state.selectedSupplier  && useCartStore().items.length > 0,
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}