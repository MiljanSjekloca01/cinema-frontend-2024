<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { isAuthenticated } from './services/auth.service';
import { AuthService } from './services/auth.service';

isAuthenticated.value = AuthService.hasAuth();

const router = useRouter()

// v-if="$route.name !== 'login'"
function logout(){
  AuthService.clearAuth()
  router.push("/admin-panel/login")
}

</script>

<template> 
  <nav class="navbar navbar-expand-lg">
        <div class="container d-flex align-items-end">
            <RouterLink class="navbar-brand" to="/">
                <img src="./assets/images/cinemaLogo.png" alt="cinePrimeLogo">
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Movies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Locations</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Rent cinema hall</a>
                    </li>         
                </ul>
                <RouterLink class="nav-link d-flex align-items-center me-3" to="/search">
                  <i class="fa-solid fa-search me-2"></i>
                  Find Movie
                
                </RouterLink>
               
                <button @click="logout()" type="button" class="btn btn-outline-danger" v-if="isAuthenticated">
                  Logout
                </button>
            </div>
        </div>
    </nav>

    <!-- Offcanvas / Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <span class="offcanvas-title" id="offcanvasNavbarLabel">
              <img src="./assets/images/cinemaLogo.png" alt="cinePrimeLogo">
            </span>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body text-center">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Movies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Locations</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Rent cinema hall</a>
                </li>
                <button class="btn btn-outline-secondary mt-1" type="button">Find Movie By Name</button>
                <button @click="logout()" type="button" class="btn btn-warning mt-3" v-if="isAuthenticated"> Logout </button>
            </ul>
            
        </div>
    </div>
  <RouterView />
</template>


<style scoped>

.container{
  padding: 0.5rem;
}

.navbar-brand:hover{
  opacity: 0.8;
}

.offcanvas-title > img,
.navbar-brand > img{
  height:40px;
  width:200px;
}

.nav-link{
  font-family: "Libre Franklin", sans-serif;
}

.fa-search{
  font-size: 1.5rem;
}

.nav-link:hover{
  font-family: "Libre Franklin", sans-serif;
  font-style: normal;
  color:red;
}

.collapse > .navbar-nav > .nav-item > .nav-link:hover {
  text-decoration: underline;
  text-underline-offset: 10px;
}

</style>