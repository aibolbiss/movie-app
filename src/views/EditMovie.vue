<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Изменить</p>
          <p>Здесь вы можете поменять информацию о данном фильме</p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-6 col-md-8 col-sm-12">
          <form @submit.prevent="updateSubmit">
            <div class="mb-2">
              <input
                v-model="movie.name"
                type="text"
                class="form-control"
                placeholder="Название"
                required
              />
            </div>
            <div class="mb-2">
              <input
                v-model.number="movie.year"
                type="number"
                min="1"
                max="2024"
                class="form-control"
                placeholder="Год выпуска"
                required
                @input="validateYear"
              />
            </div>
            <div class="mb-2">
              <input
                v-model="movie.genre"
                type="text"
                class="form-control"
                placeholder="Жанр"
                required
              />
            </div>
            <div class="mb-2">
              <input
                v-model.number="movie.rating"
                type="number"
                min="1"
                max="10"
                class="form-control"
                placeholder="Рейтинг"
                required
                @input="validateRating"
              />
            </div>
            <div class="mb-2">
              <input
                v-model="movie.photo"
                type="text"
                class="form-control"
                placeholder="URL Фото"
                required
              />
            </div>
            <div class="mb-2">
              <textarea
                v-model="movie.description"
                class="form-control auto-resize-textarea"
                placeholder="Описание"
                required
                @input="handleTextareaInput"
                ref="descriptionTextarea"
              ></textarea>
            </div>
            <div class="mb-2">
              <input
                type="submit"
                class="btn btn-info text-white w-100"
                value="Обновить"
              />
            </div>
          </form>
        </div>
        <div
          class="col-lg-6 col-md-4 col-sm-12 d-flex justify-content-center align-items-center"
        >
          <img
            :src="movie.photo"
            alt="User Icon"
            class="movie-img img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MovieService } from '../services/MovieService';
import { useTextareaResize } from '../utils/useTextareaResize';
import { validateNumber } from '../utils/validation';

interface Movie {
  id: string;
  name: string;
  year: number | null;
  genre: string;
  rating: number | null;
  description: string;
  photo: string;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const movieId = String(route.params.movieId);
    const movie = ref<Movie>({
      id: movieId,
      name: '',
      year: null,
      genre: '',
      rating: null,
      description: '',
      photo: '',
    });

    const isLoading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);

    const validateYear = () =>
      (movie.value.year = validateNumber(movie.value.year, 2024));
    const validateRating = () =>
      (movie.value.rating = validateNumber(movie.value.rating, 10));

    const updateSubmit = async () => {
      try {
        isLoading.value = true;
        await MovieService.updateMovie(movie.value, movieId);
        router.push('/');
      } catch (error) {
        console.log(error);
        errorMessage.value = (error as Error).message;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      try {
        isLoading.value = true;
        movie.value = await MovieService.getMovie(movieId);
      } catch (error) {
        errorMessage.value = (error as Error).message;
      } finally {
        isLoading.value = false;
      }
    });

    // Auto Size Text Area
    const { descriptionTextarea, handleTextareaInput, adjustTextareaOnMount } =
      useTextareaResize();

    onMounted(adjustTextareaOnMount);
    // Auto Size Text Area

    return {
      movie,
      isLoading,
      errorMessage,
      updateSubmit,
      validateYear,
      validateRating,
      handleTextareaInput,
      descriptionTextarea,
    };
  },
});
</script>

<style scoped>
.movie-img {
  max-width: 100%;
  height: auto;
}
.auto-resize-textarea {
  box-sizing: border-box;
  overflow: hidden;
  min-height: 50px; /* Минимальная высота для textarea */
  resize: none; /* Запретить изменение размера пользователем */
}
@media (max-width: 767.98px) {
  .movie-img {
    display: none;
  }
}
</style>
