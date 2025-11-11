import { acceptHMRUpdate, defineStore } from 'pinia'
// import { api } from 'src/boot/axios'
// import { useCartStore } from 'src/stores/cart-store'

export const useAbsenStore = defineStore('absen', {
  state: () => ({
    
    loading:false,
    bisaAbsen:false,
    
  }),
  actions: {
    


  },


  

  getters: {
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAbsenStore, import.meta.hot))
}