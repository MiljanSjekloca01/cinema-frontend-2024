<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { MovieService } from '@/services/movie.service';
import { ProjectionService } from '@/services/projection.service';
import type { ProjectionModel } from '@/models/projection.model';
import { formatDate, pureDateString } from '@/services/main.service';
import { useRoute } from 'vue-router';
import type { MovieModel } from '@/models/movie.model';

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const movieId = Number(useRoute().params.id);
const movie = ref<MovieModel>();
const projectionDate = ref<string>(pureDateString(new Date()));
const projections = ref<ProjectionModel[]>([]);


MovieService.unathenticatedGetMovieById(movieId).then(rsp => {
    movie.value = rsp.data
})

async function fetchProjections() {
  projections.value = (await ProjectionService.unathenticatedGetAllProjectionsForMovieOnDate(movieId, new Date(projectionDate.value))).data;
}

function formatMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}


onMounted(fetchProjections);

watch(projectionDate, () => {
  fetchProjections();
  console.log(projections.value);
});
</script>



<template>
    <div class="container mt-4" v-if="movie">
        <h1 class="text-center mb-5">{{ movie.title }}</h1>
        <div class="row">
            <div class="col-md-6 d-flex mb-4">
                <img :src="`${BASE_URL}/movie/${movieId}/image`" class="img-fluid mb-3" :alt="movie.title">
                <div class="d-flex flex-column align-items-center justify-content-center w-100 ms-3 gap-5 pb-2">
                    <p class="fs-5">{{ movie!.genre.join(' | ') }}</p>
                    <p class="fs-5">{{ formatMinutes(movie.duration) }} <i class="fa-regular fa-clock me-2"></i> </p>
                    <p class="fs-5">Release Year: {{ movie.releaseYear }}</p>
                </div>
            </div>
            <div class="col-md-6 my-3">
                <h3>Projections for</h3>
                <input type="date" class="form-control mb-2" v-model="projectionDate" :min="pureDateString(new Date())">
                <div v-for="projection in projections" class="my-3 me-2 badge">
                    <p class="fs-3 text-warning">{{ projection.startsAt.slice(0,5) }}</p>
                    <p class="fs-5 text-warning">{{ projection.hall.name }}</p>
                    <p class="fs-6 text-warning">{{ projection.hall.projectionType }}</p>
                </div>
            </div>
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Description
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong class="me-2">{{ movie.title }} - </strong>{{ movie.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div v-else>Movie is being loaded... please wait ! </div>
  </template>

<style scoped>


img{
    border-radius: 3rem;
    width:250px;
    height:400px;
}

p{
    margin:0.3rem;
}



.badge > p {
    font-size:0.9rem;
    margin:0.5rem;
}

.badge {
    padding:0.5rem 2rem;
    background-color: #53535642;
    border-radius: 2rem;
   
}

.accordion-button{
    background-color: transparent;
    color:white;
}


</style>
  