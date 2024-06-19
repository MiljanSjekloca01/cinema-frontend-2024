<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MovieService } from '@/services/movie.service';
import { useRouter } from 'vue-router';
import type { MovieModel } from '@/models/movie.model';
import { formatMinutesToHours } from '@/services/format.service';


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const movies = ref<MovieModel[]>([]);
const searchQuery = ref<string>('');
const router = useRouter();
const selectedGenre = ref<string>("");

const fetchMovies = async () => {
  movies.value = (await MovieService.unauthenticatedGetAllMovies()).data;
};

const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = selectedGenre.value === "" || movie.genre.includes(selectedGenre.value);

    return matchesSearch && matchesGenre;
  });
});

const navigateToMovie = (movieId: number) => {
  router.push({ path: `/movie/${movieId}` });
};

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horor",
  "Sci-Fi",
  "Animation",
  "History",
  "Adventure",
  "Thriller",
  "Crime",
  "Mystery",
  "Romantic"
];

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
    <div class="my-4 genres-container">
      <button @click="selectedGenre = ''"  class="btn btn-outline-secondary rounded-5 px-4">All</button>
      <button v-for="genre in genres" @click="selectedGenre = genre" type="button" :class="`btn rounded-5 px-4 mx-3 ${selectedGenre === genre ? 'btn-secondary' : 'btn-outline-secondary'}`">{{ genre }}</button>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4" v-for="movie in filteredMovies" :key="movie.movieId" >
        <div class="card my-3 h-100" @click="navigateToMovie(movie.movieId)">
          <img
            :src="`${BASE_URL}/movie/${movie.movieId}/image`"
            class="card-img-top"
            :alt="movie.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-subtitle mb-1">{{ movie.releaseYear }}</p>
            <p class="card-subtitle">{{ formatMinutesToHours(movie.duration) }}</p>
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
  transition: transform 0.3s;
  max-width: 300px;
  margin:auto;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 300px;
}

.genres-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.genres-container::-webkit-scrollbar {
  display: none; 
}

.genres-container button {
  flex: 0 0 auto;
}

@media (max-width: 420px) {
  .genres-container {
    scroll-snap-type: x mandatory;
    flex-wrap: nowrap;
    align-items: normal;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .genres-container button {
    scroll-snap-align: start;
  }
}

</style>