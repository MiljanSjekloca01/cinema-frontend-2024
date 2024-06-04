<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../../services/main.service";
import type { MovieModel } from "../../../models/movie.model";
import { MovieService } from "@/services/movie.service";


const movies = ref<MovieModel[]>()
MovieService.getAllMovies().then(rsp => {
    movies.value = rsp.data
})

async function removeThisMovie(id: number){
    await MovieService.deleteMovieById(id).then(rsp => {
        movies.value = movies.value?.filter(m => m.movieId !== id )
    }) 

}


</script>

<template>

<div v-if="movies && movies.length > 0">   
    <h1 class="h3 text-center m-4 text-danger">Cinema Movies</h1>
    <table class="table table-hover text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col" id="genre">Genre</th>
        <th scope="col">Release Year</th>
        <th scope="col">Short Description</th>
        <th scope="col">Image Name</th>
        <th scope="col">Main Actors</th>
        <th scope="col">Duration</th>
        <th scope="col">Starts Showing</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="m in movies">
        <th scope="row">{{ m.movieId }}</th>
        <td>{{ m.title }}</td>
        <td>{{ m.genre.toString()}}</td>
        <td>{{ m.releaseYear }}</td>
        <td>{{ m.description.slice(0,10)}} ...</td>
        <td>{{ m.image }}</td>
        <td>{{ m.mainActors[0]}} ...</td>
        <td>{{ m.duration}}min</td>
        <td class="text-info">{{ new Date(m.startsShowing).toLocaleDateString("sr-RS") }}</td>
        <td>{{ formatDate(m.createdAt) }}</td>
        <td>{{ formatDate(m.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1"
                    :to="`/movie/${m.movieId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
                
                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisMovie(m.movieId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    </tbody>
    </table>
    <RouterLink class="btn btn-md btn-danger" to="/movie/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Movie
    </RouterLink>
</div> 

<div v-else-if="movies?.length == 0">
    <div class="mb-3">Add New Movie To Cinema</div>    
    <RouterLink class="btn btn-md btn-danger" to="/movie/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Movie
    </RouterLink>
</div>

<div v-else>Movies are being loaded... Please wait</div>

<RouterLink class="btn btn-md btn-secondary mt-3" to="/admin-panel">
    <i class="fa-solid fa-rotate-left"></i>
    Return to Admin Panel
</RouterLink>

</template>

<style>

.table{
    overflow: auto;

}

.table > thead > tr > th#genre{
    min-width: 200px;
}

</style>