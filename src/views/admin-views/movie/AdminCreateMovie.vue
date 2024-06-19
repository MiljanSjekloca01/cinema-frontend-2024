<script setup lang="ts">

import { pureDateString } from '@/services/format.service';
import { MovieService } from '@/services/movie.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const movie = ref<any>({
  title: "",
  genre: "",
  releaseYear: new Date().getFullYear(),
  description: "",
  image: null,
  mainActors: "",
  duration: 0,
  startsShowing: pureDateString(new Date())
});

const imagePreview = ref<string | null>(null);
const previewImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] ?? null;
  if (file) {
    movie.value.image = file;  
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};



async function createMovie(movie: any) {
  if (movie.image) {
    
    const formData = new FormData();
    formData.append('image', movie.image);
    formData.append('title', movie.title);
    formData.append('genre', movie.genre);
    formData.append('releaseYear', movie.releaseYear.toString());
    formData.append('description', movie.description);
    formData.append('mainActors', movie.mainActors);
    formData.append('duration', movie.duration);
    formData.append('startsShowing',movie.startsShowing);

    await MovieService.createMovie(formData);
    router.push({ path: "/admin-panel/movie" });
  }else {
    alert('No image selected');
  }
}

function validationCheck(movie: any) {

  const { title, genre, releaseYear, description, mainActors, duration, startsShowing } = movie;
  
  const isInvalidTitle = title === '';
  const isInvalidGenre = genre === '';
  const isInvalidReleaseYear = releaseYear <= 1895 || releaseYear > new Date().getFullYear();
  const isInvalidDescription = description === '' || description.length < 10;
  const isInvalidMainActors = mainActors === '' || mainActors.length < 10;
  const isInvalidDuration = duration <= 0;
  const isInvalidStartsShowing = !startsShowing;
  
  return isInvalidTitle || isInvalidGenre || isInvalidReleaseYear || isInvalidDescription ||
         isInvalidMainActors || isInvalidDuration || isInvalidStartsShowing;
}
</script>



<template>
  <div class="container">
      <h1 class="h3 text-center">Create Movie</h1>
      <form>
          <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="movie.title">
          </div>
          <div class="mb-3">
              <label for="genre" class="form-label">Genre</label>
              <input type="text" class="form-control" id="genre" v-model="movie.genre" placeholder="Adventure,Comedy..">
          </div>
          <div class="mb-3">
              <label for="releaseYear" class="form-label">Release Year</label>
              <input type="number" class="form-control" id="releaseYear" v-model="movie.releaseYear">
          </div>
          <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="movie.description"></textarea>
          </div>
          <div class="mb-3">
              <label for="mainActors" class="form-label">Main Actors</label>
              <input type="text" class="form-control" id="mainActors" v-model="movie.mainActors" placeholder="Tom Hanks,Tom Cruise..">
          </div>
          <div class="mb-3">
              <label for="duration" class="form-label">Duration (in minutes)</label>
              <input type="number" class="form-control" id="duration" v-model="movie.duration">
          </div>
          <div class="mb-3">
              <label for="startsShowing" class="form-label">Starts Showing</label>
              <input type="date" class="form-control" id="startsShowing" v-model="movie.startsShowing">
          </div>
          <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input type="file" name="image" class="form-control" id="image" @change="previewImage">
          </div>
          <div v-if="imagePreview">
              <img :src="imagePreview" alt="Image Preview" class="image-preview mb-3"/>
          </div>
      </form>
      <RouterLink class="btn btn-md btn-secondary" to="/admin-panel/movie">
          <i class="fa-solid fa-rotate-left"></i> 
          Return to Movies List
      </RouterLink>&nbsp;
      <button type="button" class="btn btn-md btn-success"
          @click="createMovie(movie)" :disabled="validationCheck(movie)">
          <i class="fa-solid fa-download"></i>
          Create
      </button>
  </div>
</template>

<style scoped>

.image-preview{
    min-width: 250px;
    min-height: 250px;
    max-width:300px;
    max-height: 300px;
}

</style>

