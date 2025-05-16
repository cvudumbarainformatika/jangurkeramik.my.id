import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    viewMode: 'grid',

    currentPage:1,
    itemsPerPage:20,
    sortBy:'newest',

    product:null,

    filters: {
      categories: [],
      materials: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000000]
    },

    sortOptions:[
      { label: 'Terbaru', value: 'newest' },
      { label: 'Harga: Rendah ke Tinggi', value: 'price_asc' },
      { label: 'Harga: Tinggi ke Rendah', value: 'price_desc' },
      { label: 'Popularitas', value: 'popularity' },
      { label: 'Rating', value: 'rating' }
    ],

    products:
    [
      // {
      //   id: 1,
      //   name: 'Keramik Lantai Marmer Putih',
      //   category: 'Lantai',
      //   price: 185000,
      //   discountPrice: 165000,
      //   discount: 10,
      //   rating: 4.5,
      //   isNew: true,
      //   image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      // },
     
    ],
    meta:null,
    loading:false
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
    filteredProducts: (state) => {
      let result = [...state.products];

      // Filter by category
      if (state.filters.categories.length > 0) {
        result = result.filter(product =>
          state.filters.categories.some(cat =>
            product.category.toLowerCase().includes(cat.toLowerCase())
          )
        );
      }

      // Filter by price range
      result = result.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= state.filters.priceRange[0] &&
               price <= state.filters.priceRange[1];
      });

      // Sort
      switch (state.sortBy) {
        case 'price_asc':
          result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price_desc':
          result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
      }

      return result;
    }
  
  },

  actions: {
    changeViewMode(val) {
      
      this.viewMode = val
    },
    sortProducts(val) {
      this.sortBy = val
    },
    clearFilter(filterType) {
      if (filterType === 'priceRange') {
        this.filters.priceRange = [0, 1000000];
      } else if (Object.prototype.hasOwnProperty.call(this.filters, filterType)) {
        this.filters[filterType] = [];
      }
      this.currentPage = 1;
    },

    setProduct(item) {
      
      this.product = item ?? null;
    },

    resetFilters() {
      this.filters = {
        categories: [],
        materials: [],
        sizes: [],
        colors: [],
        priceRange: [0, 1000000]
      };
      this.currentPage = 1;
    },

   
    async getProducts() {
      this.loading = true
      try {

        const params = {
          params:{
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPer,
            sortBy:this.sortBy,
            filters:this.filters,
            sortOptions:this.sortOptions
          }
        }


        const response = await api.get(`api/v2/product/get-products`, params);

        console.log(response.data);
        this.meta = response.data?.meta || null;

        console.log('meta',this.meta);

        const products = response.data?.data?.data || [];


        console.log('products',products);


        this.products = products;

        this.loading=false

      } catch (error) {
        console.error('Error fetching product:', error);
        this.product = null; // Set to null if there's an error
        this.loading = false
      }
    },

    async getProductId(id){
      this.loading = true
      try {
        const resp = await api.get(`api/v2/product/by/${id}`);
        console.log('resp', resp);
        const {data} = resp
        this.product = data
        
      } catch (error) {
        console.log('error', error);
        
      } finally {
        this.loading = false
      }
    }
    
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
