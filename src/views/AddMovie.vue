<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Создайте новый фильм</p>
          <p>Супер приложение для добавления фильмов</p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-3">
          <form @submit.prevent="submitCreate">
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
                class="btn btn-info text-white"
                value="Создать"
              />
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <img
            src="../assets//movie.png"
            alt="Movie Icon"
            class="movie-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { MovieService } from '../services/MovieService';
import { useTextareaResize } from '../utils/useTextareaResize';
import { validateNumber } from '../utils/validation';

interface Movie {
  name: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  photo: string;
}

export default defineComponent({
  setup() {
    const movie = ref<Movie>({
      name: '',
      year: null,
      genre: '',
      rating: null,
      description: '',
      photo: '',
    });

    const router = useRouter();

    const validateYear = () =>
      (movie.value.year = validateNumber(movie.value.year, 2024));
    const validateRating = () =>
      (movie.value.rating = validateNumber(movie.value.rating, 10));

    const submitCreate = async () => {
      try {
        const response = await MovieService.createMovie(movie.value);
        if (response) {
          router.push('/'); // Перенаправление на главную страницу после успешного создания
        }
      } catch (error) {
        console.error('Ошибка при создании фильма:', error);
      }
    };

    // Auto Size Text Area
    const { descriptionTextarea, handleTextareaInput, adjustTextareaOnMount } =
      useTextareaResize();

    onMounted(adjustTextareaOnMount);
    // Auto Size Text Area

    return {
      movie,
      submitCreate,
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
</style>
