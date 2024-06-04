import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from "@/views/MoviesView.vue"
import LoginView from "@/views/admin-views/LoginView.vue"
import { AuthService } from '@/services/auth.service';
import NewMovie from "@/views/admin-views/movie/NewMovie.vue"
import AdminPanelView from "@/views/admin-views/AdminPanelView.vue"
import AdminMoviesView from "@/views/admin-views/movie/AdminMoviesView.vue"
import AdminHallsView from "@/views/admin-views/hall/AdminHallsView.vue"
import AdminProjectionsView from "@/views/admin-views/projection/AdminProjectionsView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //
    { path: '/', redirect: "/movies/currently-showing" },
    //Unauthenticated paths / Application user paths
    { path: "/movies/currently-showing", name:"current-movies", component: MoviesView },
    { path: "/movies/soon", name:"movies-soon", component: MoviesView },
    // Admin Authenticated Paths and Login 
    { path: "/admin-panel/login", name: "login", component: LoginView},
    { path: "/admin-panel", name: "admin-panel", component: AdminPanelView},
    // Admin Movie CRUD
    { path: "/admin-panel/movie/create", name: "create-movie", component: NewMovie},
    { path: "/admin-panel/movie", name: "admin-movies", component: AdminMoviesView},
    
    // Admin Hall CRUD
    { path: "/admin-panel/hall", name: "admin-halls", component: AdminHallsView},

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
