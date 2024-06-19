<script setup lang="ts">
import type { MovieModel } from '@/models/movie.model';
import router from '@/router';
import { MovieService } from '@/services/movie.service';
import { onMounted, ref } from 'vue';


const movies = ref<MovieModel[]>([]);
const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function fetchMovies() {
    movies.value = (await MovieService.getCurrentlyShowingMovies()).data;
}

onMounted(fetchMovies)

const navigateToMovie = (movieId: number) => {
    router.push({ path: `/movie/${movieId}` });
};

</script>


<template>
    <div class="container pt-2">
        <div class="banner w-100">
            <img class="w-100" src="https://filmfreeway-production-storage-01-storage.filmfreeway.com/festivals/cover_photos/000/079/561/original/cover_photo.jpg?1707366575" alt="Theater Image">
            <div class="title"> Locations </div>
        </div>
        <div class="location w-100 py-5 my-3 text-center">
            <h2>CinePrime Galerija Belgrade</h2>
            <p>Bulevar Vudro Vilson 12</p>
            <p></p>
            <div class="theater-movies d-flex mt-5 justify-content-center flex-wrap">
                <div v-for="movie in movies.slice(0,6)" class="movie-container" @click="navigateToMovie(movie.movieId)">
                    <img :src="`${BASE_URL}/movie/${movie.movieId}/image`" class="movie-image m-3 img-fluid" :alt="movie.title">
                </div>
            </div>
            <div>
                <h4 class="mt-4 mb-2">FIND US HERE</h4>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.9235387758845!2d20.44299897610457!3d44.80274687107085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7b3644dcb6ff%3A0x8f2c75f6ef890a41!2sCineplexx%20Galerija!5e0!3m2!1ssr!2srs!4v1718706610676!5m2!1ssr!2srs" width="80%" height="350" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="mt-3"></iframe>
            </div>
        </div>
    </div>
</template>



<style scoped>

.banner {
    position: relative;
}

.banner > img {
    width: 100%;
    display: block;
    opacity: 0.9;
    max-height: 350px;
}

.location{
    box-shadow: inset 0px 0px 100px black;
}

.title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 3px 5px 5px black;
    letter-spacing: 1rem;
}

.movie-image{
    height: 400px;
    width:150px;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s;
    filter: grayscale(100%);
    cursor: pointer;
}

.movie-image:hover{
    transform: scaleY(1.1);
    filter: none;
}

.place-card,
.place-card-large{
    display:none !important;
}


</style>