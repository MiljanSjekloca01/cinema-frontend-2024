<script setup lang="ts">
    import { ref, onMounted, watch, setBlockTracking } from 'vue';
    import { MovieService } from '@/services/movie.service';
    import router from '@/router';
    import type { MovieModel } from '@/models/movie.model';

    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const currentTab = ref('currentlyShowing');
    const movies = ref<MovieModel[]>([]);
    

    async function fetchMovies() {
    if (currentTab.value === 'currentlyShowing') {
        movies.value = (await MovieService.getCurrentlyShowingMovies()).data;
        console.log(movies);
    } else {
        movies.value = (await MovieService.getComingSoonMovies()).data;
    }
    }

    onMounted(fetchMovies);
    watch(currentTab, fetchMovies);

    const navigateToMovie = (movieId: number) => {
        router.push({ path: `/movie/${movieId}` });
    };

    const formatWithoutYear = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', weekday: 'short'});
    return formattedDate;
};
    
</script>



<template>
<div class="container">
    <!-- Navigation -->
    <ul class="nav nav-tabs">
    <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'currentlyShowing' }" @click="currentTab = 'currentlyShowing'">
        Currently Showing
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'comingSoon' }" @click="currentTab = 'comingSoon'">
        Coming Soon
        </a>
    </li>
    </ul>
    
    <!-- Colossal Images -->
    <div id="carouselExampleIndicators" class="carousel slide my-4" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner mb-3">
        <div class="carousel-item active">
            
        <img src="https://icantunseethatmovie.com/wp-content/uploads/2023/06/5dfc2-dune_banneritbegins.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="https://cinecentre.co.za/img/blog/Furiosa.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="https://s3-us-west-2.amazonaws.com/thm.cnmhstng.com/cinema/yescinema/docs/banner.jpg" class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

    <!-- Movie List -->
    <div class="row text-center">
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4" v-for="movie in movies" @click="navigateToMovie(movie.movieId)">
        <div class="card h-100 m-3">
            <img :src="`${BASE_URL}/movie/${movie.movieId}/image`" class="card-img-top" :alt="movie.title">
            <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">Starts Showing: {{ formatWithoutYear(movie.startsShowing) }}</p>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>
.nav-link{
    color:white;
}

.nav-link.active{
    color: orange;
}

.nav-link:hover{
    cursor: pointer;
}
.card-img-top {
    height: 300px;
}

.card-img-top:hover{
    box-shadow: 0px 0px 1rem black;
    transform: scale(1.025);
}

.card{
    border: none;
}

.row:hover{
    cursor: pointer;
}

.card:hover > .card-body{
    color:gray;
}


</style>
