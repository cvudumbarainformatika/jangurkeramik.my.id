<template>
  <div class="flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-2">
      <div class="text-sm font-medium ml-2">Detail Pelanggan</div>
      <button 
        @click="$emit('close')" 
        class="ml-auto px-2 rounded-full hover:bg-gray-200 transition"
      >
        <AppIcon name="x" size="md" class="text-gray-600" />
      </button>
    </div>

    <!-- Pelanngan Header -->
    <div class="border border-gray-200 rounded-lg p-4">
      <div class="flex flex-row items-start gap-4">
        <div class="relative">
          <AppAvatar
            :user="user"
            size="14"
          />
        </div>
        <div class="flex-1 relative">
          <div class="flex flex-col items-start">
            <div class="text-lg font-medium text-gray-900">{{ user?.nama }}</div>
            <div class="flex items-center text-sm font-medium text-gray-900">
              <AppIcon name="land-plot" size="sm" class="text-gray-500" /> 
              <span class="ml-2"> {{ user?.alamat || 'Belum Ada' }}</span>
            </div>
            
          </div>
          
          <div class="mt-2 text-gray-700">
           
            <div class="flex items-center ">
              <AppIcon name="phone" size="sm" class="text-gray-500" />
              <span class="ml-2">{{ user?.nohp || '000 0000 0000' }}</span>
            </div>
            
            
          </div>
          
        </div>
      </div>
    </div>



    <!-- <div class="p-4">
      <PaymentMethodSelector @payment="handlePayment"/>
    </div> -->




    
  </div>
</template>

<script setup>
import AppIcon from 'src/components/atoms/AppIcon.vue';
import { defineAsyncComponent } from 'vue';

const AppAvatar = defineAsyncComponent(() => 
  import('src/components/atoms/AppAvatar.vue')
);
// const PaymentMethodSelector = defineAsyncComponent(() => 
//   import('src/components/organisms/order/PaymentMethodSelector.vue')
// );

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);


</script>