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
          subtotal: parseFloat(item.price) * item.quantity
        }))
      }
      // POST ke backend (ganti URL sesuai API Anda)
      const { data } = await api.post('/api/v2/order/penjualan', payload)
      // Kosongkan cart setelah order sukses
      cartStore.clearCart()
      return data
    },
  },
  getters: {
    totalItems: (state) => state.items.length,
    isReady: (state) => !!state.selectedSupplier  && useCartStore().items.length > 0,
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}