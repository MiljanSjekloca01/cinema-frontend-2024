<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MovieService } from '@/services/movie.service';
import { useRouter } from 'vue-router';
import type { MovieModel } from '@/models/movie.model';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const movies = ref<MovieModel[]>([]);
const searchQuery = ref<string>('');
const router = useRouter();

const fetchMovies = async () => {
  movies.value = (await MovieService.unauthenticatedGetAllMovies()).data;
};

const filteredMovies = computed(() => {
  return movies.value.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const navigateToMovie = (movieId: number) => {
  router.push({ path: `/movie/${movieId}` });
};

onMounted(fetchMovies);
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Search Movies</h1>
    <div class="input-search mb-3">
      <input
        v-model="searchQuery"
        class="form-control"
        type="search"
        placeholder="Enter movie name"
        aria-label="Search"
      />
    </div>
    <div class="row">
      <div
        class="col-lg-3 col-md-4 col-sm-6 mb-4"
        v-for="movie in filteredMovies"
        :key="movie.movieId"
      >
        <div class="card h-100" @click="navigateToMovie(movie.movieId)">
          <img
            :src="`${BASE_URL}/movie/${movie.movieId}/image`"
            class="card-img-top"
            :alt="movie.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">Release Year: {{ movie.releaseYear }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-search {
  max-width: 600px;
  margin: auto;
}

.card {
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>