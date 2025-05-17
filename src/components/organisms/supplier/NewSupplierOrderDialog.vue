<template>
  <AppDialog
    v-model="isOpen"
    @close="close"
    title="Pilih Supplier"
    height="60vh"
  >
    <template #body>
      <div class="flex flex-col p-4 bg-gray-200 h-full">
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
            :options="supplierOptions"
            placeholder="Cari supplier berdasarkan nama"
            @update:model-value="(value) => {
              console.log('Selected supplier:', value);
              
            }"
          />


           <!-- Supplier List or Detail -->
            <SupplierDetail
              v-if="selectedSupplier"
              :supplier="selectedSupplier"
              @back="selectedSupplier = null"
            />
        </div>




        </div>
      </div>
    </template>

    <template #footer>
      <button @click="close" class="btn btn-primary">Tutup</button>
    </template>
  </AppDialog>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';
import AppIcon from 'components/atoms/AppIcon.vue';
import AutocompleteInput from 'components/atoms/AutocompleteInput.vue';
const AppDialog = defineAsyncComponent(()=> import('components/atoms/AppDialog.vue'));
const SupplierDetail = defineAsyncComponent(()=> import('components/organisms/supplier/SupplierDetail.vue'));

const props = defineProps({
  modelValue:{
    Type:Boolean,
    default:false
  }
})

const emit = defineEmits(['update:modelValue','close'])

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

const supplierOptions = [
  { id: 1, label: 'Supplier A' },
  { id: 2, label: 'Supplier B' },
  { id: 3, label: 'Supplier C' }
]

</script>