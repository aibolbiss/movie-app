import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import MovieManager from '../views/MovieManager.vue';
import AddMovie from '../views/AddMovie.vue';
import EditMovie from '../views/EditMovie.vue';
import ViewMovie from '../views/ViewMovie.vue';
import PageNotFound from '../views/PageNotFound.vue';

// Определение маршрутов с корректными типами
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/movies',
  },
  {
    path: '/movies',
    name: 'MovieManager',
    component: MovieManager,
  },
  {
    path: '/movies/add',
    name: 'AddMovie',
    component: AddMovie,
  },
  {
    path: '/movies/edit/:movieId',
    name: 'EditMovie',
    component: EditMovie,
    props: true, // Передача параметров маршрута как props
  },
  {
    path: '/movies/view/:movieId',
    name: 'ViewMovie',
    component: ViewMovie,
    props: true, // Передача параметров маршрута как props
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
