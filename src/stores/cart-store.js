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
  },

  actions: {
    addToCart(newItem) {
      const existing = this.items.find((item) => item.barang_id === newItem.id)
      if (existing) {
        const qty = Number(newItem?.quantity) || 1
        existing.quantity += qty
      } else {
        this.items.push({
          barang_id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          quantity: 1,
          price: parseFloat(newItem.price),
          synced: false,
        })
      }

      // Segera sync 1 item saja
      this.syncItemToServer(newItem.id)
    },

    updateCartItemQuantity(itemId, newQty) {
      const item = this.items.find((i) => i.barang_id === itemId)
      if (item) {
        item.quantity = newQty
        item.synced = false
        if (item.quantity <= 0) {
          this.removeFromCart(itemId)
        }
      }
    },

    removeFromCart(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },

    clearCart() {
      this.items = []
    },

    increaseQuantity(index) {
      const item = this.items[index]
      item.quantity++
      item.synced = false
      this.syncItemQuantityToServer(item.barang_id)
    },

    decreaseQuantity(index) {
      const item = this.items[index]
      if (item.quantity > 1) {
        item.quantity--
        item.synced = false
        this.syncItemQuantityToServer(item.barang_id)
      }
    },

    async syncItemToServer(product_id) {
      const item = this.items.find((i) => i.barang_id === product_id)
      if (!item || item.synced) return

      // console.log(item);

      const payload = {
        barang_id: item.barang_id,
        quantity: item.quantity,
        price: item.price,
      }

      try {
        await api.post('/api/v2/cart', payload)

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

    syncItemQuantityToServer(barang_id) {
      // Clear timeout sebelumnya jika ada
      if (this._quantitySyncTimeouts[barang_id]) {
        clearTimeout(this._quantitySyncTimeouts[barang_id])
      }

      // Jadwalkan sync baru setelah 800ms
      this._quantitySyncTimeouts[barang_id] = setTimeout(async () => {
        const item = this.items.find((i) => i.barang_id === barang_id)
        if (!item) return

        try {
          await api.post('/api/v2/cart', {
            barang_id: item.barang_id,
            quantity: item.quantity,
            price: item.price,
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
