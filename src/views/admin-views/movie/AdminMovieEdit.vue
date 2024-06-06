<script setup lang="ts">
import { useRoute } from 'vue-router';
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const route = useRoute()
</script>

<template>
  <div>
    <img :src="`${BASE_URL}/movie/${+route.params.id}/image`" alt="Movie Poster" />
  </div>
</template>