import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from "@/views/MoviesView.vue"
import MovieInfoView from "@/views/MovieInfoView.vue"
import FindMovieView from "@/views/FindMovieView.vue"
import LoginView from "@/views/admin-views/LoginView.vue"
import { AuthService } from '@/services/auth.service';
import AdminCreateMovie from "@/views/admin-views/movie/AdminCreateMovie.vue"
import AdminPanelView from "@/views/admin-views/AdminPanelView.vue"
import AdminMoviesView from "@/views/admin-views/movie/AdminMoviesView.vue"
import AdminMovieEdit from "@/views/admin-views/movie/AdminMovieEdit.vue"
import AdminHallsView from "@/views/admin-views/hall/AdminHallsView.vue"
import AdminHallEdit from "@/views/admin-views/hall/AdminHallEdit.vue"
import AdminCreateHall from "@/views/admin-views/hall/AdminCreateHall.vue"
import AdminProjectionsView from "@/views/admin-views/projection/AdminProjectionsView.vue"
import AdminCreateProjection from "@/views/admin-views/projection/AdminCreateProjection.vue"
import AdminEditProjection from "@/views/admin-views/projection/AdminEditProjection.vue"
import LocationsView from "@/views/LocationsView.vue"
import AboutView from "@/views/AboutView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //
    { path: '/', redirect: "/movies" },
    //Unauthenticated paths / Application users available paths
    { path: "/movies", name:"movies", component: MoviesView },
    { path: "/movie/:id", name:"movie-info", component: MovieInfoView },
    { path: "/movie/find", name:"find-movie", component: FindMovieView },
    { path: "/locations", name:"locations", component: LocationsView },
    { path: "/about", name:"about", component: AboutView },

    // Admin Authenticated Paths and Login 
    { path: "/admin-panel/login", name: "login", component: LoginView},
    { path: "/admin-panel", name: "admin-panel", component: AdminPanelView},
    // Admin Movie CRUD
    { path: "/admin-panel/create/movie", name: "admin-create-movie", component: AdminCreateMovie},
    { path: "/admin-panel/movie", name: "admin-movies", component: AdminMoviesView},
    { path: "/admin-panel/movie/edit/:id", name: "admin-movie-edit", component: AdminMovieEdit},
    // Admin Hall CRUD
    { path: "/admin-panel/hall", name: "admin-halls", component: AdminHallsView},
    { path: "/admin-panel/hall/edit/:id", name: "admin-hall-edit", component: AdminHallEdit},
    { path: "/admin-panel/create/hall", name: "admin-create-hall", component: AdminCreateHall},
    //Admin Projection CRUD
    { path: "/admin-panel/projection", name: "admin-projections", component: AdminProjectionsView},
    { path: "/admin-panel/projection/create", name: "admin-create-projection", component: AdminCreateProjection},
    { path: "/admin-panel/projection/edit/:id", name: "admin-edit-projection", component: AdminEditProjection},
    // Catch Not Found Paths
    { path: '/:catchAll(.*)', redirect: '/movies' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin-panel') && !AuthService.hasAuth()) {
    if (to.path === '/admin-panel/login') {
      next();
    } else {
      next('/admin-panel/login');
    }
  } else {
    next();
  }
});



export default router
