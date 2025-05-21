import { ref } from 'vue'

const defaultDuration = 3000

const toast = ref({
  show: false,
  showBrandIcon: true,
  title: 'Jangur Keramik',
  message: 'Product Berhasil ditambahkan ke keranjang',
  type: 'success',
  position: 'top'
})

export function useToast() {
  function showToast(message, options) {
    const { 
      type, 
      position, 
      duration = defaultDuration,
      showBrandIcon,
      title = 'Jangur Keramik'
    } = options
    
    // Clear any existing timeout
    if (toast.value.show) {
      toast.value.show = false
    }

    // Show new toast with slight delay
    setTimeout(() => {
      toast.value = {
        show: true,
        showBrandIcon,
        title,
        message,
        type,
        position
      }

      // Auto hide
      setTimeout(() => {
        toast.value.show = false
      }, duration)
    }, 100)
  }

  return {
    toast,
    showToast
  }
}