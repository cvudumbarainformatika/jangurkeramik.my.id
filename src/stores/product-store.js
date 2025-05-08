import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    viewMode: 'grid',

    currentPage:1,
    itemsPerPage:12,
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
      {
        id: 1,
        name: 'Keramik Lantai Marmer Putih',
        category: 'Lantai',
        price: 185000,
        discountPrice: 165000,
        discount: 10,
        rating: 4.5,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Keramik Dinding Motif Geometris',
        category: 'Dinding',
        price: 210000,
        discountPrice: null,
        discount: 0,
        rating: 4.2,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 3,
        name: 'Keramik Kamar Mandi Anti Slip',
        category: 'Kamar Mandi',
        price: 175000,
        discountPrice: 140000,
        discount: 20,
        rating: 4.8,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 4,
        name: 'Keramik Dapur Modern',
        category: 'Dapur',
        price: 195000,
        discountPrice: null,
        discount: 0,
        rating: 4.0,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 5,
        name: 'Keramik Outdoor Tahan Cuaca',
        category: 'Outdoor',
        price: 230000,
        discountPrice: 207000,
        discount: 10,
        rating: 4.6,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 6,
        name: 'Keramik Dekorasi Dinding 3D',
        category: 'Dekorasi',
        price: 250000,
        discountPrice: null,
        discount: 0,
        rating: 4.9,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 7,
        name: 'Keramik Lantai Kayu',
        category: 'Lantai',
        price: 220000,
        discountPrice: 198000,
        discount: 10,
        rating: 4.3,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 8,
        name: 'Keramik Dinding Tekstur Batu',
        category: 'Dinding',
        price: 190000,
        discountPrice: 152000,
        discount: 20,
        rating: 4.1,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 9,
        name: 'Keramik Mozaik Premium',
        category: 'Dekorasi',
        price: 280000,
        discountPrice: 224000,
        discount: 20,
        rating: 4.7,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 10,
        name: 'Keramik Lantai Granit Hitam',
        category: 'Lantai',
        price: 320000,
        discountPrice: null,
        discount: 0,
        rating: 4.4,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 11,
        name: 'Keramik Dinding Minimalis',
        category: 'Dinding',
        price: 175000,
        discountPrice: 148750,
        discount: 15,
        rating: 4.2,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 12,
        name: 'Keramik Kamar Mandi Pola Geometris',
        category: 'Kamar Mandi',
        price: 195000,
        discountPrice: null,
        discount: 0,
        rating: 4.5,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      }
    ]
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
    
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
