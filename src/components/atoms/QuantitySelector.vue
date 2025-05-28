<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-4">
      <!-- Dus control -->
      <div class="flex flex-row items-center gap-4">
        <div class="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button @click="decrease('dus')" class="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50" :disabled="dus < 0">
            <AppIcon name="minus" size="sm" />
          </button>
          <input
            type="number"
            class="w-16 text-center py-1 border-x border-gray-200 focus:outline-none"
            v-model.number="dus"
            @input="syncTotal"
            min="0"
          />
          <button @click="increase('dus')" class="px-2 py-1 text-gray-700 hover:bg-gray-100" :disabled="isMax">
            <AppIcon name="plus" size="sm" />
          </button>
        </div>

          <div class="text-sm text-gray-600 mb-1">{{ satuanBesar }}</div>
      </div>

      <!-- Pcs control -->
      <div class="flex flex-row items-center gap-4">
        <div class="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button @click="decrease('pcs')" class="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50" :disabled="pcs <= 0 && dus <= 0">
            <AppIcon name="minus" size="sm" />
          </button>
          <input
            type="number"
            class="w-16 text-center py-1 border-x border-gray-200 focus:outline-none"
            v-model.number="pcs"
            @input="syncTotal"
            min="0"
            :max="isiPerDus - 1"
          />
          <button @click="increase('pcs')" class="px-2 py-1 text-gray-700 hover:bg-gray-100" :disabled="isMax">
            <AppIcon name="plus" size="sm" />
          </button>
        </div>
        <label class="text-sm text-gray-600 mb-1">{{ satuanKecil }}</label>
      </div>
    </div>

    <!-- Info -->
    <div class="text-sm text-gray-500 text-center">
      Total: <strong>{{ totalPcs || 0 }}</strong> {{ satuanKecil }} / Maksimum: {{ maxPcs }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AppIcon from 'src/components/atoms/AppIcon.vue'

const props = defineProps({
  modelValue: Number,
  maxPcs: Number,
  isiPerDus: Number,
  satuanBesar: { type: String, default: 'dus' },
  satuanKecil: { type: String, default: 'pcs' },
});

console.log('modelValue',props.modelValue);
console.log('maxPcs',props.maxPcs);


const emit = defineEmits(['update:modelValue']);

const dus = ref(0);
const pcs = ref(0);

const totalPcs = computed(() => dus.value * props.isiPerDus + pcs.value);
const isMax = computed(() => totalPcs.value >= props.maxPcs);

const syncTotal = () => {
  let total = dus.value * props.isiPerDus + pcs.value;
  if (total > props.maxPcs) total = props.maxPcs;

  dus.value = Math.floor(total / props.isiPerDus);
  pcs.value = total % props.isiPerDus;

  emit('update:modelValue', total);
};

const increase = (type) => {
  let total = totalPcs.value;
  if (total >= props.maxPcs) return;

  if (type === 'dus') dus.value++;
  else if (type === 'pcs') pcs.value++;

  syncTotal();
};

const decrease = (type) => {
  if (type === 'dus' && dus.value > 0) dus.value--;
  else if (type === 'pcs' && pcs.value > 0) pcs.value--;

  syncTotal();
};

watch(
  () => props.modelValue,
  (val) => {
    dus.value = Math.floor(val / props.isiPerDus);
    pcs.value = val % props.isiPerDus;
  },
  { immediate: true }
);
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
