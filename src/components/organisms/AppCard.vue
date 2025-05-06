<template>
  <q-card
    :class="[
      'transition-shadow duration-300',
      hover && 'hover:shadow-lg',
      bordered && 'border border-gray-200',
      customClass
    ]"
    :flat="flat"
  >
    <q-img
      v-if="imgSrc"
      :src="imgSrc"
      :ratio="imgRatio"
      :height="imgHeight"
      :class="imgClass"
    />
    
    <q-card-section v-if="title || subtitle" :class="headerClass">
      <div v-if="title" class="text-lg font-medium">{{ title }}</div>
      <div v-if="subtitle" class="text-gray-500">{{ subtitle }}</div>
    </q-card-section>
    
    <q-card-section v-if="$slots.default" :class="contentClass">
      <slot></slot>
    </q-card-section>
    
    <q-card-actions v-if="$slots.actions" :class="actionsClass">
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  imgSrc: {
    type: String,
    default: ''
  },
  imgRatio: {
    type: [String, Number],
    default: 16/9
  },
  imgHeight: {
    type: String,
    default: ''
  },
  flat: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: true
  },
  headerClass: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  },
  actionsClass: {
    type: String,
    default: 'justify-end'
  },
  imgClass: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>

<script>
/**
 * @component AppCard
 * @description Komponen organisme card yang menggabungkan beberapa molekul dan atom untuk menampilkan informasi dalam format kartu
 * @example
 * <AppCard title="Judul Kartu" subtitle="Subtitle kartu">
 *   <p>Konten kartu di sini</p>
 *   <template v-slot:actions>
 *     <AppButton label="Lihat" />
 *     <AppButton label="Batal" variant="flat" />
 *   </template>
 * </AppCard>
 */
</script>