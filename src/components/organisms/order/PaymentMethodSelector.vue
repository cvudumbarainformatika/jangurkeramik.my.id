<template>
  <div class="space-y-4 p-6 bg-white rounded-xl shadow-md">
    <div class="text-md font-semibold text-primary">Total Pesanan : {{ formatRupiahx(order?.total_harga) }}</div>
    <div class="text-base font-semibold">Pilih Metode Pembayaran</div>

    <!-- total seharusnya dibayar -->
    

    <!-- Tombol Pilih Metode -->
    <div class="flex gap-4">
      <button
        v-for="metode in daftarMetode"
        :key="metode"
        @click="pilihMetode(metode)"
        class="flex-1 py-2 rounded-lg border text-center transition"
        :class="metodeDipilih === metode
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'"
      >
        {{ metode }}
      </button>
    </div>

    <!-- Input Cash -->
    <div v-if="metodeDipilih === 'Cash'" class="space-y-2">
      <div class="text-sm text-gray-600">Jumlah Bayar</div>
      <input
        v-model="jumlahBayar"
        @input="jumlahBayar = formatRupiah(jumlahBayar)"
        type="text"
        class="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
        placeholder="Contoh: 150.000"
      />
    </div>

    <!-- Input Kredit -->
    <div v-if="metodeDipilih === 'Kredit'" class="space-y-2">
      <div>
        <div class="text-sm text-gray-600">Uang Muka (DP)</div>
        <input
          v-model="uangMuka"
          @input="uangMuka = formatRupiah(uangMuka)"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
          placeholder="Contoh: 50.000"
        />
      </div>

      <div>
        <div class="text-sm text-gray-600">Tempo (hari)</div>
        <input
          v-model.number="tempoHari"
          type="number"
          min="1"
          class="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
          placeholder="Contoh: 30"
        />
      </div>

      <div>
        <div class="text-sm text-gray-600">Catatan</div>
        <textarea
          v-model="catatan"
          rows="2"
          class="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
          placeholder="Contoh: Dicicil mingguan"
        />
      </div>
    </div>


    <!-- Tombol Submit -->
    <div class="fixed bottom-0 left-0 right-0 mx-auto full-width bg-white p-4 flex-1">
      <div class="flex flex-row justify-between">
        <button
          @click="$router.back()"
          class="py-2 px-4 bg-gray-200 text-gray rounded-lg font-medium hover:bg-green-700"
        >
          <div class="flex gap-2">
            <AppIcon name="undo-2" size="sm"  color="gray"/> Kembali
          </div>
        </button>
        <button
          @click="kirimPembayaran"
          class="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-green-700"
          :disabled="loading"
        >
          <template v-if="loading">
            Menyimpan Data ...
          </template>
          <template v-else>
            <div class="flex items-center gap-2 text-gray-100">
              <AppIcon name="badge-dollar-sign" color="white"/>
            Simpan Pembayaran
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppIcon from 'src/components/atoms/AppIcon.vue'

const props = defineProps({
  order:{
    type:Object,
    default:null
  },
  loading:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits(['pembayaran'])
onMounted(()=> {
  pilihMetode(metodeDipilih.value)
})

const daftarMetode = ['Cash', 'Kredit']
const metodeDipilih = ref('Cash')

const jumlahBayar = ref('')
const uangMuka = ref('')
const tempoHari = ref(30)
const catatan = ref('')


function formatRupiahx(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}

// Fungsi format ke Rupiah
function formatRupiah(angka) {
  const number = parseInt(angka.toString().replace(/\D/g, '')) || 0
  return number.toLocaleString('id-ID')
}

// Menghilangkan format untuk diolah sebagai angka
function unformatRupiah(str) {
  return parseInt(str.toString().replace(/\D/g, '')) || 0
}

// Reset saat ganti metode
function pilihMetode(metode) {
  metodeDipilih.value = metode
  if (metode==='Kredit') {
    jumlahBayar.value = ''
    uangMuka.value = ''
    tempoHari.value = 30
    catatan.value = ''
  } else {
    jumlahBayar.value = formatRupiah(parseInt(props.order?.total_harga))
  }
}



// Validasi sebelum kirim
function kirimPembayaran() {
  if (metodeDipilih.value === 'Cash') {
    const total = unformatRupiah(jumlahBayar.value)
    const harusBayar = unformatRupiah(parseInt(props.order?.total_harga))
    console.log(harusBayar);
    
    if (total <= 0) {
      alert('Jumlah bayar cash tidak boleh kosong')
      return
    }
    if(total < harusBayar){
      alert('Jumlah bayar cash tidak boleh kurang')
      return
    }
    emit('pembayaran', { metode: 'Cash', total })
  } else {
    const dp = unformatRupiah(uangMuka.value)
    const tempo = parseInt(tempoHari.value)
    if (dp < 0 || tempo <= 0) {
      alert('Isi DP dan tempo dengan benar')
      return
    }
    emit('pembayaran', {
      metode: 'Kredit',
      dp,
      tempo,
      catatan: catatan.value,
    })
  }
}
</script>

