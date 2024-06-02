import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from "@/views/MoviesView.vue"
import LoginView from "@/views/admin-views/LoginView.vue"
import { AuthService } from '@/services/auth.service';
import NewMovie from "@/views/admin-views/movie/NewMovie.vue"
import AdminView from "@/views/admin-views/AdminView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //
    { path: '/', redirect: "/movies/currently-showing" },
    //Movies
    { path: "/movies/currently-showing", name:"current-movies", component: MoviesView },
    { path: "/movies/soon", name:"movies-soon", component: MoviesView },
    // Admin main paths
    { path: "/admin-panel/login", name: "login", component: LoginView ,
    beforeEnter: (to, from, next) => { 
      if (AuthService.hasAuth()) next('/'); else next()
    }},
    { path: "/admin-panel/", name: "admin-panel", component: AdminView,
    beforeEnter: (to, from, next) => { 
      if (!AuthService.hasAuth()) next('/'); else next()
    }},
    //Admin CRUD 
    { path: "/admin-panel/movie/create", name: "new-movie", component: NewMovie,
    beforeEnter: (to, from, next) => { if (!AuthService.hasAuth()) next('/'); else next() }},


  ]
})

export default router
