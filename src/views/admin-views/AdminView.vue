<script setup lang="ts">
import { isAuthenticated, AuthService } from '@/services/auth.service';
import { useAxios } from '@/services/main.service';
import { ref,onMounted, computed } from 'vue';

isAuthenticated.value = AuthService.hasAuth();

const statistics = ref<{title: string,value: number}[]>();
const projectionsByHallToday = ref<{[key: number]: { name: string; count: number; }}>({})
const projectionsByHallTodayValue = computed(() => projectionsByHallToday.value);
const projectionsByHallMonth = ref<{[key: number]: { name: string; count: number; }}>({})

const STATISTIC_TITLES = {
  totalMoviesCurrShowing: 'Total Movies Currently Showing',
  totalMoviesComingSoon: 'Number of Movies Coming Soon',
  totalProjectionsToday: "Total of Projections Today",
  totalProjectionsThisMonth: "Total of Projections This Month"
};

async function getProjectionsByHallForToday(){
  try{
    const response = await useAxios("/projection/today/by-hall/number")
    projectionsByHallToday.value = response.data
  }catch(e){
    console.error("Error loading Projection By Hall / Today ",e)
  }
}


async function getProjectionsByHallForThisMonth(){
  try{
    const response = await useAxios("/projection/month/by-hall/number")
    projectionsByHallMonth.value = response.data
  }catch(e){
    console.error("Error loading Projection By Hall / Month ",e)
  }
}

async function getStatistics() {
  try {
    const responses = await Promise.all([
       useAxios("/movie/currently-showing/number"),
       useAxios("/movie/coming-soon/number"),
       useAxios("/projection/today/number"),
       useAxios("/projection/this-month/number")
      
    ]);
    const statisticsData = responses.map((response, index) => {
      const title = Object.values(STATISTIC_TITLES)[index]; 
      const value = response.data;
      return { title, value };
    });

    statistics.value = statisticsData;
  } catch (error) {
    console.error('Error loading statistics', error);
  }
}

onMounted(() => {
  getStatistics();
  getProjectionsByHallForToday();
  getProjectionsByHallForThisMonth();
});

</script>

<template>

<div class="container-fluid">
    <div class="row">
      <div class="col-auto col-sm-4 col-md-3 col-xl-2 px-sm-2 px-0 mt-3">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-1">
              <RouterLink to="/admin-panel" class="nav-link mt-3 mb-4 fs-4 d-none d-sm-inline ms-3">
                  Admin Panel
              </RouterLink>
              <ul class="navbar-nav mb-0 align-items-center align-items-sm-start" id="menu">
                  <li class="nav-item mb-2">
                      <a href="#hall-dropdown" data-bs-toggle="collapse" class="nav-link px-0 ">
                          <span class="ms-1 d-none d-sm-inline fs-5">Hall
                              <i class="fa-solid fa-caret-down fs-6"></i>
                          </span>
                      </a>
                      <ul class="collapse navbar-collapse" id="hall-dropdown" data-bs-parent="#menu">
                          <li class="mb-3"> <RouterLink to="/admin-panel/hall/new" class="nav-link d-none d-sm-inline">Create Hall</RouterLink> </li>
                          <li class="mb-3"> <RouterLink to="/admin-panel/hall" class="nav-link d-none d-sm-inline">Edit Hall</RouterLink> </li>
                          <li> <RouterLink to="/admin-panel/hall" class="nav-link d-none d-sm-inline">All Halls</RouterLink> </li>
                      </ul>
                      <RouterLink to="/admin-panel/hall" class="d-sm-none flex-column nav-link text-center">
                              <p class="mb-0">Hall</p>
                              <i class="fa-solid fa-chalkboard fs-2"></i>
                      </RouterLink>
                  </li>
                  <li class="nav-item mb-2">
                      <a href="#movie-dropdown" data-bs-toggle="collapse" class="nav-link px-0">
                          <span class="ms-1 d-none d-sm-inline fs-5">Movie
                              <i class="fa-solid fa-caret-down fs-6"></i>
                          </span>
                      </a>
                      <ul class="collapse navbar-collapse" id="movie-dropdown" data-bs-parent="#menu">
                          <li class="mb-3"> <RouterLink to="/admin-panel/movie/new" class="nav-link d-none d-sm-inline">Create Movie</RouterLink> </li>
                          <li class="mb-3"> <RouterLink to="/admin-panel/movie" class="nav-link d-none d-sm-inline">Edit Movie</RouterLink> </li>
                          <li> <RouterLink to="/admin-panel/movie" href="#" class="nav-link d-none d-sm-inline">All Movies</RouterLink> </li>
                      </ul>
                      <RouterLink to="/admin-panel/movie" class="d-sm-none flex-column nav-link text-center">
                              <p class="text-center mb-0">Movie</p>
                              <i class="fa-solid fa-film fs-2"></i>
                      </RouterLink>
                  </li>
                  <li class="nav-item mb-2">
                      <a href="#projection-dropdown" data-bs-toggle="collapse" class="nav-link px-0">
                          <span class="ms-1 d-none d-sm-inline fs-5">Projection
                              <i class="fa-solid fa-caret-down fs-6"></i>
                          </span>
                      </a>
                      <ul class="collapse navbar-collapse" id="projection-dropdown" data-bs-parent="#menu">
                          <li class="mb-3"> <RouterLink to="/admin-panel/projection/new" class="nav-link d-none d-sm-inline">Create Projection</RouterLink> </li>
                          <li class="mb-3"> <RouterLink to="/admin-panel/projection" class="nav-link d-none d-sm-inline">Edit Projection</RouterLink> </li>
                          <li> <RouterLink to="/admin-panel/projection" href="#" class="nav-link d-none d-sm-inline">All Projection</RouterLink> </li>
                      </ul>
                      <RouterLink to="/admin-panel/projection" class="d-sm-none flex-column nav-link text-center">
                              <p class="text-center mb-0">Projection</p>
                              <i class="fa-solid fa-video fs-2"></i>
                      </RouterLink>
                  </li>
              </ul>
              <hr>
          </div>
      </div>
      <div class="col py-3 content">
          <h2>Dashboard</h2>
          <div class="row row-cols-1 row-cols-md-2 mb-3 m-1">
            <div v-for="statistic in statistics" class="col mb-3">
              <div class="card p-3">
                  <h5 class="card-title">{{ statistic.title }}</h5>
                  <p class="card-text">{{ statistic.value }}</p>
              </div>
            </div>
          </div>
          <div class="row p-2 card-2 m-3" v-if="Object.keys(projectionsByHallTodayValue).length !== 0">
            <h5 class="text-center text-success">Projections for Today</h5>
            <div v-for="data in projectionsByHallToday" class="col text-center">
              <h5 class="card-title">{{ data.name }}</h5>
              <p class="card-text">{{ data.count }}</p>
            </div>
          </div>
          <div class="row p-3 card-2 m-3 text-center" v-else>
            <h5 class="card-title">
              All Halls are Available for Projections - 
              {{  new Date().toLocaleDateString("sr-RS") }}
            </h5>
          </div>
          <div class="row p-2 card-2 m-3">
            <h5 class="text-center text-success">Projections For This Month</h5>
            <div v-for="data in projectionsByHallMonth" class="col text-center">
              <h5 class="card-title">{{ data.name }}</h5>
              <p class="card-text">{{ data.count }}</p>
            </div>
          </div>
          
        
      </div>
  </div>
</div>
   
</template>


<style scoped>

ul{
  list-style:none;
}

.nav-link {
    color: white;
}

.nav-link:hover {
    color: lightgray;
}

.content{
  max-height: 88vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.164);
}

.navbar-collapse > li {
    font-size: 1rem;
}

.card {
  border-left: 0.5rem solid rgb(25, 185, 199);
  border-radius: 8px;
  color: rgb(25, 185, 199);
  background-color: rgb(48, 47, 47);
  border-bottom: 1px solid rgb(25, 185, 199);
}

.card-2{
  border-left: 0.5rem solid #198754;
  border-right: 0.5rem solid #198754;
  border-radius: 1.5rem;
  color:#198754;
  background-color: rgb(48, 47, 47);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.card-text {
  font-size: 2rem;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 
}

h2{
    text-align: center;
    margin: 1rem 0;
    color: rgb(25, 185, 199);
}


</style>