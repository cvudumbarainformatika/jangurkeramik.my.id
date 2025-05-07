<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group relative">
    <!-- Rating Stars -->
    <div class="flex text-orange-400 mb-6 gap-1">
      <AppRatingStars 
        :rating="testimonial.rating" 
        :max="5"
        size="md"
        activeColor="orange"
      />
    </div>
    
    <!-- Quote Icon -->
    <div class="absolute -top-4 -left-4 bg-primary text-white p-3 rounded-full opacity-90 shadow-lg">
      <AppIcon name="quote" size="md" />
    </div>
    
    <!-- Testimonial Text -->
    <p class="text-gray-700 mb-8 relative z-10 text-lg leading-relaxed">
      "{{ testimonial.text }}"
    </p>
    
    <!-- Customer Info -->
    <AppCustomerInfo 
      :name="testimonial.name"
      :location="testimonial.location"
      :avatar="testimonial.avatar"
      :verified="true"
    />
  </div>
</template>

<script setup>
import AppIcon from '../atoms/AppIcon.vue';
import AppRatingStars from '../atoms/AppRatingStars.vue';
import AppCustomerInfo from '../molecules/AppCustomerInfo.vue';

defineProps({
  testimonial: {
    type: Object,
    required: true
  }
});
</script>

<script>
/**
 * @component AppTestimonialCard
 * @description Molecule component for displaying a single testimonial with rating, quote, and customer info
 * @example
 * <AppTestimonialCard :testimonial="testimonialItem" />
 */
</script>