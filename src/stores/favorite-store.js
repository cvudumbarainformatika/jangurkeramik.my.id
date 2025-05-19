import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    items: []
  }),

  getters: {
  },

  actions: {
    async getData() {
      try {
        const response = await api.get('/api/v2/product/whislist')
        const data = response.data
        // console.log('whislist', data);

        if (response.status === 200) {
          this.items = data
        } else {
          console.error('Failed to get favorites data')
        }
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavoriteStore, import.meta.hot))
}
