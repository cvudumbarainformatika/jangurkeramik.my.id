<template>
  <!-- Background gradient elements with transition -->
  <transition name="bg-fade" mode="out-in">
    <div 
      :key="routePath"
      class="fixed top-0 left-0 right-0 h-[30vh] bg-primary z-0"
    ></div>
  </transition>
  
  <!-- Wave overlay with transition -->
  <transition name="wave-slide">
    <div 
      :key="routePath"
      class="fixed top-0 left-0 right-0 h-[33vh] z-[0] opacity-90"
    >
      <svg class="absolute bottom-0 w-full h-[10vh] text-gray-50 fill-current" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
      </svg>
    </div>
  </transition>
  
  <!-- Decorative circles with transition -->
  <transition name="circle-scale">
    <div 
      :key="routePath + '-circle1'"
      class="fixed top-[5%] right-[10%] w-32 h-32 rounded-full bg-white opacity-10 z-[0]"
    ></div>
  </transition>
  
  <transition name="circle-scale" delay="200">
    <div 
      :key="routePath + '-circle2'"
      class="fixed top-[15%] left-[5%] w-20 h-20 rounded-full bg-white opacity-10 z-[0]"
    ></div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routePath = computed(() => route.fullPath);
</script>

<style scoped>
/* Background fade transition */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.bg-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.bg-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Wave slide transition */
.wave-slide-enter-active,
.wave-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.wave-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.wave-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Circle scale transition */
.circle-scale-enter-active,
.circle-scale-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.circle-scale-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.circle-scale-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>