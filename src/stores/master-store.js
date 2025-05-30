import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useMasterStore = defineStore('master', {
  state: () => ({
    sales: [], 
    pelanggans: [],
  }),
  persist: {
    key: 'master',
    storage: localStorage,
    paths: ['sales'], // Hanya simpan items
  },

  getters: {
  },

  actions: {

    async fetchSales() {
      try {
        const response = await api.get('api/v2/master/sales')
        // console.log('sales', response);
        
        this.sales = response?.data || []
      } catch (error) {
        console.error('Error fetching sales:', error)
      }
    },

    async fetchPelanggan(query) {
      try {
        const response = await api.get('api/v2/master/pelanggan', {
          params: {
            q: query,
          },
        })
        // console.log('pelanggan', response);
        this.pelanggans = response?.data || []
      } catch (error) {
        console.error('Error adding sales:', error)
      }
    },

    

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMasterStore, import.meta.hot))
}
