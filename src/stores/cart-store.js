import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // [{ id, name, price, quantity }]
    _quantitySyncTimeouts: {}, // <- untuk menyimpan timer per item
  }),
  persist: {
    key: 'cart',
    storage: localStorage,
    paths: ['items'], // Hanya simpan items
  },

  getters: {
    // Total jumlah item (misal: 2 apel + 3 jeruk = 5)
    cartCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartItems: (state) => state.items?.length || 0,
  },

  actions: {
    addToCart(newItem) {
      // console.log('store', newItem);
      // this.items = []
      
      // const existing = this.items.find((item) => item.barang_id === newItem.id)
      // if (existing) {
      //   const qty = Number(newItem?.quantity) || 1
      //   existing.quantity += qty
      // } else {
        this.items.push({
          barang_id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          quantity: newItem.quantity,
          satuan: newItem.satuan,
          satuans: newItem.satuans,
          price: parseFloat(newItem.price),
          subtotal: parseFloat(newItem.subtotal),
          product:newItem.product,

          synced: false,
        })
      // }
      const lastIndex = this.items?.length - 1;
      this.syncItemToServer(lastIndex)
    },

    updateCartItemQuantity(index, newQty) {
      const item = this.items[index]
      console.log('updateCartItemQuantity :', item, newQty);
      const sub = parseFloat(item?.price || 0) * parseFloat(newQty || 0);
      
      if (item) {
        item.quantity = newQty
        item.subtotal = sub
        item.synced = false
        if (item.quantity < 0) {
          this.removeFromCart(index)
        }
      }

      const itemId = item.id || null

      if (itemId) {
        this.syncItemQuantityToServer(itemId)
      }
    },

    async removeFromCart(index) {
      const itemId = this.items[index]?.id || null
      const newItems = this.items?.filter((it) => it?.id !== itemId)
      this.items = newItems

      // console.log('remove item', item);
      

      // Hapus item dari server
      try {
        await api.delete(`/api/v2/cart/${itemId}`)
        console.log('Item berhasil dihapus dari server:', itemId);
        
      } catch (error) {
        console.error('Gagal hapus item dari server:', error)
        // opsional: beri notifikasi
        // this.$toast?.error('Gagal hapus item dari server.')
      }
    },

    async clearCart() {
      this.items = []
      // Hapus semua item dari server
      try {
        await api.delete('/api/v2/cart/destroy-all')
        console.log('Semua item berhasil dihapus dari server');
        
      } catch (error) {
        console.error('Gagal hapus semua item dari server:', error)
        // opsional: beri notifikasi
        // this.$toast?.error('Gagal hapus semua item dari server.')
      }
    },

    increaseQuantity(index) {
      const item = this.items[index]
      item.quantity++
      item.synced = false
    },

    decreaseQuantity(index) {
      const item = this.items[index]
      if (item.quantity > 1) {
        item.quantity--
        item.synced = false
      }
    },

    async syncItemToServer(index) {
      const item = this.items[index]
      if (!item || item.synced) return

      console.log('syncItemToServer',item);

      const payload = item

      try {
        await api.post('api/v2/cart', payload)

        item.synced = true
      } catch (error) {
        console.error('Gagal sync item:', item.product_id, error)
        // item tetap tidak diubah -> akan di-retry nanti
      }
    },

    async syncAllToServer() {
      const unsyncedItems = this.items.filter((i) => !i.synced)
      if (unsyncedItems.length === 0) return

      const snapshot = JSON.parse(JSON.stringify(this.items))

      try {
        await api.post('/api/v2/cart', {
          items: unsyncedItems.map((i) => ({
            barang_id: i.barang_id,
            quantity: i.quantity,
            price: i.price,
          })),
        })

        // Tandai semuanya sukses
        unsyncedItems.forEach((i) => {
          i.synced = true
        })
      } catch (error) {
        console.error('Gagal sync batch:', error)
        this.items = snapshot // rollback
      }
    },

    // async syncCartToServer() {
    //   const snapshot = JSON.parse(JSON.stringify(this.items)) // simpan state lama

    //   try {
    //     await api.post('/api/v2/cart', { items: this.items })
    //     // Jika berhasil, bisa set flag `lastSynced` (opsional)
    //   } catch (err) {
    //     console.error('Sync gagal:', err)
    //     this.items = snapshot // rollback
    //     // opsional: beri notifikasi
    //     // this.$toast?.error('Gagal sync cart ke server.')
    //   }
    // },

    syncItemQuantityToServer(itemId) {
      // Clear timeout sebelumnya jika ada
      if (this._quantitySyncTimeouts[itemId]) {
        clearTimeout(this._quantitySyncTimeouts[itemId])
      }

      // Jadwalkan sync baru setelah 800ms
      this._quantitySyncTimeouts[itemId] = setTimeout(async () => {
        const item = this.items.find((i) => i.id === itemId)
        if (!item) return

        try {
          await api.put(`/api/v2/cart/${itemId}`, {
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })
          item.synced = true
          console.log('debaounce sukses')
        } catch (err) {
          console.error('Gagal sync quantity:', err)
          item.synced = false
        }
      }, 800)
    },

    async restoreCartFromServer() {
      try {
        const response = await api.get('/api/v2/cart')

        console.log('from server', response)

        const serverCart = response.data.items

        // 🧠 Strategi: Overwrite local cart
        this.items = serverCart

        // Atau: merge jika ingin digabung, contoh logika bisa ditambahkan nanti
      } catch (err) {
        console.error('Gagal mengambil cart dari server', err)
        // this.$toast?.error('Gagal restore cart.')
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
