<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProjectionService } from '@/services/projection.service';
import { HallService } from '@/services/hall.service';
import { MovieService } from '@/services/movie.service';
import { formatDate } from '@/services/format.service';

const router = useRouter();
const route = useRoute();
const id = Number(route.params.id as string);

const projection = ref<any>({
    hallId: 0,
    movieId: 0,
    projectionDate: "",
    startsAt: '',
    endsAt: '',
});
const halls = ref<any[]>([]);
const movies = ref<any[]>([]);
const today = new Date().toISOString().split('T')[0];

ProjectionService.getProjectionById(id).then(rsp => {
    projection.value = rsp.data;
});
HallService.getAllHalls().then(rsp => {
    halls.value = rsp.data;
});
MovieService.getAllMovies().then(rsp => {
    movies.value = rsp.data;
});

async function updateProjection(projection: any) {
    if (projection.startsAt && projection.endsAt && projection.projectionDate) {
        await ProjectionService.updateProjectionById(id, projection).then(rsp => {
            if (rsp.status === 500) {
                alert("Projection is undergoing in Hall at this time");
                return;
            } else {
                router.push({ path: '/admin-panel/projection' });
            }
        }).catch(error => {
            console.error("Error updating projection:", error);
            alert("An error occurred while updating the projection.");
        });
    } else {
        alert('Please select projection date, startsAt and endsAt times');
    }
}

function validationCheck(projection: any) {
    const { hallId, movieId, projectionDate, startsAt, endsAt } = projection;
    return hallId === 0 || movieId === 0 || !projectionDate || !startsAt || !endsAt;
}

watch([() => projection.value.startsAt, () => projection.value.movieId], ([newStartsAt, newMovieId]) => {
    if (newStartsAt && newMovieId) {
        const selectedMovie = movies.value.find(movie => movie.movieId === newMovieId);
        if (selectedMovie) {
            const movieDuration = selectedMovie.duration;
            const startsAtTime = new Date(`01/01/2000 ${newStartsAt}`).getTime();
            const endsAtTime = startsAtTime + movieDuration * 60000 + 40 * 60000;
            const endsAtDate = new Date(endsAtTime);
            const formattedEndsAt = `${endsAtDate.getHours().toString().padStart(2, '0')}:${endsAtDate.getMinutes().toString().padStart(2, '0')}`;
            projection.value.endsAt = formattedEndsAt;
        }
    }
});
</script>

<template>
    <div class="container">
        <h1 class="h3 text-center">Edit Projection</h1>
        <form>
            <div class="mb-3">
                <label for="hall" class="form-label">Hall</label>
                <select class="form-select" id="hall" v-model="projection.hallId">
                    <option :value="0">Select Hall</option>
                    <option v-for="hall in halls" :key="hall.hallId" :value="hall.hallId">{{ hall.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="movie" class="form-label">Movie</label>
                <select class="form-select" id="movie" v-model="projection.movieId">
                    <option :value="0">Select Movie</option>
                    <option v-for="movie in movies" :key="movie.movieId" :value="movie.movieId">{{ movie.title }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">Projection Date</label>
                <input type="date" class="form-control" id="date" v-model="projection.projectionDate" :min="today">
            </div>
            <div class="mb-3">
                <label for="startsAt" class="form-label">Starts At</label>
                <input type="time" class="form-control" id="startsAt" v-model="projection.startsAt">
            </div>
            <div class="mb-3">
                <label for="endsAt" class="form-label">Ends At</label>
                <input type="time" class="form-control" id="endsAt" v-model="projection.endsAt" :disabled="true">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(projection.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/admin-panel/projection">
            <i class="fa-solid fa-rotate-left"></i> Return to Projections List
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateProjection(projection)" :disabled="validationCheck(projection)">
            <i class="fa-solid fa-download"></i> Save
        </button>
    </div>
</template>