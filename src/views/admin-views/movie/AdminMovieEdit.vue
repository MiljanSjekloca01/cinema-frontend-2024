<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pureDateString } from '@/services/format.service';
import { MovieService } from '@/services/movie.service';
import type { MovieModel } from '@/models/movie.model';


const BASE_URL = import.meta.env.VITE_API_BASE_URL
const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const movie = ref<any>();
var oldMovieData: MovieModel;

MovieService.getMovieById(id).then(rsp => {
    movie.value = rsp.data;
    oldMovieData = { ...rsp.data };
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



async function updateEditedMovie(movie: any) {
  
  var isImageSame = (movie.image == oldMovieData.image)

  // Je li izmjenjo podatke
  if (
    movie.title === oldMovieData.title &&
    movie.genre.toString() === oldMovieData.genre.toString() &&
    movie.releaseYear === oldMovieData.releaseYear &&
    movie.description === oldMovieData.description &&
    movie.mainActors.toString() === oldMovieData.mainActors.toString() &&
    movie.duration === oldMovieData.duration &&
    movie.startsShowing === oldMovieData.startsShowing &&
    movie.image === oldMovieData.image
){ 
  alert("No Changes are made");
    return;
  }

  if (movie.image !== undefined && movie.image !== null) {

    if (!isImageSame) {
        await MovieService.deleteImageByMovieId(id);
    }

    if(isImageSame){
      movie.genre = movie.genre.toString();
      movie.mainActors = movie.mainActors.toString()
      await MovieService.updateMovieById(id, movie);

    }else{
      const formData = new FormData();
      formData.append('title', movie.title);
      formData.append('genre', movie.genre.toString());
      formData.append('releaseYear', movie.releaseYear.toString());
      formData.append('description', movie.description);
      formData.append('image', movie.image);
      formData.append('mainActors', movie.mainActors.toString());
      formData.append('duration', movie.duration);
      formData.append('startsShowing', pureDateString(new Date(movie.startsShowing)));

      await MovieService.updateMovieByIdWithNewImage(id, formData);
    }
    router.push({ path: "/admin-panel/movie" });
  } else {
      alert('No image selected');
  }
}


function validationCheck(movie: any) {

  const { title, genre, releaseYear, description, mainActors, duration, startsShowing } = movie;

  const isInvalidTitle = title === '';
  const isInvalidGenre = genre.toString() === '';
  const isInvalidReleaseYear = releaseYear <= 1895 || releaseYear > new Date().getFullYear();
  const isInvalidDescription = description === '' || description.length < 10;
  const isInvalidMainActors = mainActors.toString() === '' || mainActors.toString().length < 10;
  const isInvalidDuration = duration <= 0;
  const isInvalidStartsShowing = !startsShowing;

  return isInvalidTitle || isInvalidGenre || isInvalidReleaseYear || isInvalidDescription ||
        isInvalidMainActors || isInvalidDuration || isInvalidStartsShowing;
}
</script>

<template>
    <div v-if="movie" class="container">
        <h1 class="h3 text-center">Edit Movie</h1>
        <form>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="movie.title">
            </div>
            <div class="mb-3">
                <label for="genre" class="form-label">Genre</label>
                <input type="text" class="form-control" id="genre" v-model="movie.genre" placeholder="Adventure, Comedy..">
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
                <input type="text" class="form-control" id="mainActors" v-model="movie.mainActors" placeholder="Tom Hanks, Tom Cruise..">
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
            @click="updateEditedMovie(movie)" :disabled="validationCheck(movie)">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
        <div v-if="oldMovieData.image" class="mt-3 mb-3 d-flex flex-column mt-3">
              <label for="image" class="form-label fs-4">Currently Used Movie image</label>
              <img :src="`${BASE_URL}/movie/${+route.params.id}/image`" alt="movie image" id="image">
        </div>
    </div>
</template>

<style scoped>
.image-preview {
    min-width: 250px;
    min-height: 250px;
    max-width: 300px;
    max-height: 300px;
}

img{
  border-radius: 1rem;
  max-width: 250px;
  max-height: 250px;
}
</style>