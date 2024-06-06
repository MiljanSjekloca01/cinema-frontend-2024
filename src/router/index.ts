import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from "@/views/MoviesView.vue"
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


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //
    { path: '/', redirect: "/movies/currently-showing" },
    //Unauthenticated paths / Application users available paths
    { path: "/movies/currently-showing", name:"current-movies", component: MoviesView },
    { path: "/movies/soon", name:"movies-soon", component: MoviesView },
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
