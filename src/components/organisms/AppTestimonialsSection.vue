<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <AppSectionHeader 
        :title="title" 
        :subtitle="subtitle"
        customClass="mb-16"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AppTestimonialCard 
          v-for="testimonial in testimonials" 
          :key="testimonial.id" 
          :testimonial="testimonial"
        />
      </div>
      
      <div class="mt-12 text-center">
        <AppButton 
          :to="ctaLink" 
          :label="ctaText"
          color="primary"
          variant="filled"
          rounded="full"
          iconRight="arrow-right"
          customClass="group"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import AppSectionHeader from '../molecules/AppSectionHeader.vue';
import AppButton from '../atoms/AppButton.vue';

const AppTestimonialCard = defineAsyncComponent(() => import('../molecules/AppTestimonialCard.vue'));

defineProps({
  title: {
    type: String,
    default: 'Testimonials'
  },
  subtitle: {
    type: String,
    default: ''
  },
  testimonials: {
    type: Array,
    required: true
  },
  ctaText: {
    type: String,
    default: 'View All'
  },
  ctaLink: {
    type: String,
    default: '/testimonials'
  }
});
</script>

<script>
/**
 * @component AppTestimonialsSection
 * @description Organism component for displaying customer testimonials in a modern, eye-catching layout
 * @example
 * <AppTestimonialsSection 
 *   title="Customer Testimonials"
 *   subtitle="What our customers say about us"
 *   :testimonials="testimonialData"
 *   ctaText="View All Testimonials"
 *   ctaLink="/testimonials"
 * />
 */
</script>