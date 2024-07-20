<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Информация о фильме</p>
          <p>Здесь вы можете посмотреть полное информацие о фильме</p>
        </div>
      </div>
    </div>

    <!-- Spinner -->
    <div v-if="loading">
      <div class="container">
        <div class="row">
          <div class="col">
            <spinner />
          </div>
        </div>
      </div>
    </div>
    <!-- Spinner -->

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
      <div class="container mt-5">
        <div class="row">
          <div class="col">
            <p class="h3 text-danger fw-bold">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Error Message -->

    <div
      class="container"
      v-if="!loading && isDone"
    >
      <div class="row align-items-center">
        <div class="col-md-4">
          <img
            :src="movie.photo"
            alt="User Icon"
            class="movie-img-big"
          />
        </div>
        <div class="col-md-6">
          <ul class="list-group">
            <li class="list-group-item">
              Название: <span class="fw-bold">{{ movie.name }}</span>
            </li>
            <li class="list-group-item">
              Год выпуска: <span class="fw-bold">{{ movie.year }}</span>
            </li>
            <li class="list-group-item">
              Жанр: <span class="fw-bold">{{ movie.genre }}</span>
            </li>
            <li class="list-group-item">
              Рейтинг: <span class="fw-bold">{{ movie.rating }}</span>
            </li>
            <li class="list-group-item">
              Описание: <span class="fw-bold">{{ movie.description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <router-link
            to="/"
            class="btn btn-info text-white"
            ><i class="fa fa-arrow-alt-circle-left"></i>&nbsp;Назад</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { MovieService } from '../services/MovieService';
import Spinner from '../components/Spinner.vue';

interface Movie {
  id: string;
  name: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  photo: string;
}

export default defineComponent({
  components: {
    Spinner,
  },
  setup() {
    const route = useRoute();
    const movieId = String(route.params.movieId);
    const movie = ref<Movie | null>(null);
    const loading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);

    const isDone = computed(() => {
      return movie.value !== null;
    });

    const fetchData = async () => {
      try {
        loading.value = true;
        const movieResponse = await MovieService.getMovie(movieId);
        movie.value = movieResponse;
      } catch (error) {
        errorMessage.value = (error as Error).message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return {
      movie,
      loading,
      errorMessage,
      isDone,
      movieId,
    };
  },
});
</script>

<style scoped>
.movie-img-big {
  max-width: 100%;
  height: auto;
}
</style>
