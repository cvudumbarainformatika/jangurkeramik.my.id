<template>
  <AppDialog
    v-model="isOpen"
    @close="close"
    title="Pilih Supplier"
    height="60vh"
  >
    <template #body>
      <div class="flex flex-col p-4 bg-gray-200">
        <div class="bg-white shadow-sm rounded-lg">
          <div class="flex flex-row items-start bg-blue-50 p-4 rounded-lg shadow-sm">
            <div class="flex-shrink-0">
              <AppIcon name="info" size="lg" color="primary" />
            </div>
            <div class="flex-1 ml-4">
              <div class="text-primary font-medium text-lg">Informasi Pembelian</div>
              <p class="text-blue-700 text-sm mt-1">
                Saat ini Jangur Keramik belum menerima pembelian langsung. Anda perlu melakukan
                pemesanan melalui supplier resmi kami. Silahkan pilih supplier yang tersedia
                untuk melanjutkan pesanan Anda.
              </p>
            </div>
          </div>

        <div class="bg-white shadow-sm rounded-lg p-4">
          <AutocompleteInput
            v-model="searchQuery"
            :options="sales"
            option-label="nama"
            option-value="id"
            :return-value-only="false"
            placeholder="Cari supplier berdasarkan nama"
            @update:model-value="(value) => {
              // console.log('Selected supplier:', value);
              selectedSupplier = value;
            }"
          />


           
        </div>

          <div class="mt-2">
            <!-- Supplier List or Detail -->
            <SupplierDetail
              v-if="selectedSupplier"
              :supplier="selectedSupplier"
              @close="selectedSupplier = null"
            />
            <div v-if="!selectedSupplier" class="mt-2 grid gap-3">
              <div
                v-for="supplier in sales"
                :key="supplier.id"
                @click="selectSupplier(supplier)"
                class="flex items-center bg-white rounded-lg shadow border border-gray-100 hover:border-orange-400 cursor-pointer transition-all p-4 gap-4"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="supplier.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(supplier.nama)"
                    alt="Logo"
                    class="w-12 h-12 rounded-full object-cover border"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-800 truncate">{{ supplier?.nama }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ supplier?.alamat }}</div>
                  <div class="text-xs text-gray-400 mt-1">Kontak: {{ supplier?.nohp }}</div>
                </div>
                <div>
                  <button
                    class="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition"
                  >
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          </div>

          
        </div>

      <div class="mb-[300px]"></div>
      </div>
      
      
      <div
      v-if="selectedSupplier"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
    >
      <div class="flex justify-between items-center ">

        <button
          class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
        >
          Checkout Order
        </button>
      </div>
    </div>
    
    
    </template>

    
  </AppDialog>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';
import AppIcon from 'components/atoms/AppIcon.vue';
import AutocompleteInput from 'components/atoms/AutocompleteInput.vue';
import { useMasterStore } from 'src/stores/master-store';
import { storeToRefs } from 'pinia';
const AppDialog = defineAsyncComponent(()=> import('components/atoms/AppDialog.vue'));
const SupplierDetail = defineAsyncComponent(()=> import('components/organisms/supplier/SupplierDetail.vue'));

const props = defineProps({
  modelValue:{
    Type:Boolean,
    default:false
  }
})

const emit = defineEmits(['update:modelValue','close'])


const masterStore = useMasterStore()

const { sales } = storeToRefs(masterStore)

const searchQuery = ref('')
const selectedSupplier = ref(null)


const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const close = ()=> {
  isOpen.value=false
  emit('close')
}

const selectSupplier = (supplier) => {
  selectedSupplier.value = supplier;
};

</script>