<template>
  <AppDialog
    v-model="isOpen"
    @close="close"
    title="Pilih Pelanggan"
    height="60vh"
  >
    <template #body>
      <div class="flex flex-col p-4 bg-gray-200">
        <div class="bg-white shadow-sm rounded-lg">
         
        <div class="bg-white shadow-sm rounded-lg p-4">
          <!-- <AutocompleteInput
            v-model="searchQuery"
            :options="pelanggans"
            option-label="nama"
            option-value="id"
            :return-value-only="false"
            placeholder="Cari Pelanggan berdasarkan nama"
            @update:model-value="(value) => {
              selectedPelanggan = value;
            }"
          /> -->

          <AppInput
            v-model="searchQuery"
            placeholder="Cari Pelanggan Berdasarkan nama"
            @debounce="(value) => {
              if (value.length >= 2) {
                // console.log('text-input:', value);
                fetchPelanggan(value)
              }
              
            }"
          >
            <template #prepend>
              <AppIcon name="search" size="sm" />
            </template>
            <template #append>
              <AppIcon v-if="searchQuery" name="x" size="sm" @click="()=> {
                searchQuery = ''
                fetchPelanggan('')
              }" />
            </template>
          </AppInput>


           
        </div>

          <div class="mt-2">
            <!-- Supplier List or Detail -->
            <PelangganDetail
              v-if="selectedPelanggan"
              :user="selectedPelanggan"
              @close="selectedPelanggan = null"
            />
            <div v-if="!selectedPelanggan" class="mt-2 grid gap-3">
              <div
                v-for="pelanggan in pelanggans"
                :key="pelanggan.id"
                @click="selectSupplier(pelanggan)"
                class="flex items-center bg-white rounded-lg shadow border border-gray-100 hover:border-orange-400 cursor-pointer transition-all p-4 gap-4"
              >
                <div class="flex-shrink-0">
                  <AppAvatar :user="pelanggan" size="12" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-800 truncate">{{ pelanggan?.nama }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ pelanggan?.alamat }}</div>
                  <div class="text-xs text-gray-400 mt-1">Kontak: {{ pelanggan?.nohp }}</div>
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
      v-if="selectedPelanggan"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
    >
      <div class="flex justify-between items-center ">

        <button
          @click="checkoutOrder"
          class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          :disabled="loading"
        >
          <template v-if="loading">
            <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Simpan Order...
          </template>
          <template v-else>
            Simpan Order
          </template>
        </button>
      </div>
    </div>
    
    
    </template>

    
  </AppDialog>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, onMounted } from 'vue';
import AppIcon from 'components/atoms/AppIcon.vue';
// import AutocompleteInput from 'components/atoms/AutocompleteInput.vue';
import AppInput from 'components/atoms/AppInput.vue';
import { useMasterStore } from 'src/stores/master-store';
import { useOrderStore } from 'src/stores/order-store';
import { storeToRefs } from 'pinia';
const AppDialog = defineAsyncComponent(()=> import('components/atoms/AppDialog.vue'));
// const SupplierDetail = defineAsyncComponent(()=> import('components/organisms/supplier/SupplierDetail.vue'));
const PelangganDetail = defineAsyncComponent(()=> import('components/organisms/pelanggan/PelangganDetail.vue'));
const AppAvatar = defineAsyncComponent(()=> import('components/atoms/AppAvatar.vue'));

const props = defineProps({
  modelValue:{
    Type:Boolean,
    default:false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue','close', 'checkout'])


const masterStore = useMasterStore()
const orderStore = useOrderStore()

const { pelanggans } = storeToRefs(masterStore)
const { fetchPelanggan } = masterStore
const { selectedPelanggan } = storeToRefs(orderStore)

const searchQuery = ref('')


const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const close = ()=> {
  isOpen.value=false
  emit('close')
}

const selectSupplier = (user) => {
  selectedPelanggan.value = user;
};
const checkoutOrder = () => {
  if (selectedPelanggan.value) {
    // Emit the selected supplier to the parent component
    emit('checkout', selectedPelanggan.value);
  } else {
    // Handle case when no supplier is selected
    console.error('No pelanggan selected');
  }
};

onMounted(() => {
  // Fetch the sales data when the component is mounted
 Promise.all([
   fetchPelanggan(searchQuery.value)
  ])
});

</script>