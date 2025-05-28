<template>
  <div class="flex items-center gap-1">
    <!-- Decrease Button -->
    <button
      @click="decrease"
      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
      :disabled="modelValue <= 0"
    >
      <AppIcon name="minus" size="sm" />
    </button>

    <!-- Input Field -->
    <input
      type="number"
      class="w-16 h-8 text-center border-t border-b border-gray-300 bg-white focus:outline-none focus:ring"
      :value="displayValue"
      @input="onInput($event.target.value)"
      :max="inputMode === 'pcs' ? maxPcs : Math.floor(maxPcs / isi)"
      min="0"
    />

    <!-- Increase Button -->
    <button
      @click="increase"
      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50"
      :disabled="jumlahTotal >= maxPcs"
    >
      <AppIcon name="plus" size="sm" />
    </button>

    <!-- Satuan Toggle Buttons -->
    <div class="flex border border-gray-300 rounded-md overflow-hidden">
      <button
        class="px-3 h-8 text-sm focus:outline-none"
        :class="inputMode === 'pcs' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
        @click="handleSatuanKecil"
      >
        {{ satuanKecil }}
      </button>
      <button
        class="px-3 h-8 text-sm focus:outline-none disabled:opacity-50 relative"
        :class="inputMode === 'dus' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
        @click="handleSatuanBesar"
        :disabled="maxPcs < isi"
      >
        {{ satuanBesar }}
        <span
          v-if="showTooltip"
          class="absolute top-full mt-1 text-xs bg-black text-white px-2 py-1 rounded shadow z-10"
        >
          Stok belum cukup untuk {{ satuanBesar }}
        </span>
      </button>
    </div>

    <!-- Label
    <span class="text-sm text-gray-600 whitespace-nowrap">
      {{ jumlahTotal }}
    </span> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AppIcon from 'src/components/atoms/AppIcon.vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  maxPcs: { type: Number, default: 1000 },
  isiPerDus: { type: [Number, String], default: 1 },
  satuanBesar: { type: String, default: 'Dus' },
  satuanKecil: { type: String, default: 'Pcs' },
});

const emit = defineEmits(['update:modelValue', 'update:inputMode']);

const isi = computed(() => parseInt(props.isiPerDus) || 1);
const inputMode = ref('pcs');
const showTooltip = ref(false);

const jumlahTotal = computed({
  get: () => props.modelValue,
  set: (val) => {
    const nilai = Math.max(0, Math.min(props.maxPcs, parseInt(val) || 0));
    emit('update:modelValue', nilai);
  },
});

const displayValue = computed(() => {
  return inputMode.value === 'dus'
    ? Math.floor(jumlahTotal.value / isi.value)
    : jumlahTotal.value;
});

function onInput(val) {
  const parsed = parseInt(val) || 0;
  jumlahTotal.value = inputMode.value === 'dus'
    ? parsed * isi.value
    : parsed;
}

function increase() {
  const step = inputMode.value === 'dus' ? isi.value : 1;
  if (jumlahTotal.value + step <= props.maxPcs) {
    jumlahTotal.value += step;
  }
}

function decrease() {
  const step = inputMode.value === 'dus' ? isi.value : 1;
  if (jumlahTotal.value - step >= 0) {
    jumlahTotal.value -= step;
  }
}

function handleSatuanBesar(){
  if (props.maxPcs < isi.value) {
    alert('Stok belum cukup untuk ' + props.satuanBesar)
    return
  }
  inputMode.value = 'dus'
  emit('update:inputMode', props.satuanBesar)
}
function handleSatuanKecil(){
  inputMode.value = 'pcs'
  emit('update:inputMode', props.satuanKecil)
}

// const labelOutput = computed(() => {
//   const total = jumlahTotal.value;
//   const besar = Math.floor(total / isi.value);
//   const kecil = total % isi.value;

//   if (total === 0) return 'Stok habis';

//   const result = [];
//   if (besar > 0) result.push(`${besar} ${props.satuanBesar}`);
//   if (kecil > 0) result.push(`${kecil} ${props.satuanKecil}`);

//   return result.join(' + ');
// });

watch(inputMode, () => {
  jumlahTotal.value = 0;
});
</script>

<style scoped>
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
