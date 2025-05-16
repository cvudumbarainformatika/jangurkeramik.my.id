<template>
  <div>
    <h1 v-if="!errorMessage">Authenticating...</h1>
    <div v-else>
      <h1>Authentication Failed</h1>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const errorMessage = ref(null);

onMounted(() => {
  const token = route.query.token;
  const user = route.query.user ? JSON.parse(decodeURIComponent(route.query.user)) : null;
  const error = route.query.error;

  if (error) {
    errorMessage.value = error;
  } else if (token && user) {
    auth.setAuth(token, user);
    router.push('/'); // Redirect to home page
  } else {
    console.error('Token or user information missing from callback URL');
    router.push('/login'); // Redirect to login page if there's an error
  }
});
</script>
