<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from "./views/partials/Header.vue";
import Footer from "./views/partials/Footer.vue";

const route = useRoute();
</script>

<template> 
  <Header />
  <RouterView />
  <div v-if="!route.path.startsWith('/admin-panel')">
    <Footer />
  </div>
</template>
