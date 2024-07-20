<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">
            Приложение для создания фильмов&nbsp;
            <router-link
              to="/movies/add"
              class="btn btn-info text-white btn-sm"
            >
              <i class="fa fa-plus-circle"></i>&nbsp;Добавить новый фильм
            </router-link>
          </p>
          <p>Супер приложение для добавления фильмов</p>
          <form @submit.prevent="searchMovies">
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col">
                    <input
                      v-model="searchTerm"
                      type="text"
                      class="form-control"
                      placeholder="Поиск по имени"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="submit"
                      class="btn btn-outline-dark"
                      value="Поиск"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
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
      class="container mt-3"
      v-if="movies.length > 0"
    >
      <div class="row">
        <div
          class="col-md-6"
          v-for="movie in [...movies].reverse()"
          :key="movie.id"
        >
          <div class="card my-2 list-group-item-info shadow-lg">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <img
                    :src="movie.photo"
                    alt="User Icon"
                    class="movie-img"
                  />
                </div>
                <div class="col-sm-7">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Название:
                      <span class="fw-bold">{{ movie.name }}</span>
                    </li>
                    <li class="list-group-item">
                      Год выпуска:
                      <span class="fw-bold">{{ movie.year }}</span>
                    </li>
                    <li class="list-group-item">
                      Жанр:
                      <span class="fw-bold">{{ movie.genre }}</span>
                    </li>
                    <li class="list-group-item">
                      Рейтинг:
                      <span class="fw-bold">{{ movie.rating }}</span>
                    </li>
                    <li class="list-group-item truncated-text">
                      Описание:
                      <span class="fw-bold">{{ movie.description }}</span>
                    </li>
                  </ul>
                </div>
                <div
                  class="col-sm-1 d-flex flex-column justify-content-center align-items-center"
                >
                  <router-link
                    :to="`/movies/view/${movie.id}`"
                    class="btn btn-warning my-1"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link
                    :to="`/movies/edit/${movie.id}`"
                    class="btn btn-primary my-1"
                  >
                    <i class="fa fa-pen"></i>
                  </router-link>
                  <button
                    type="button"
                    class="btn btn-danger my-1"
                    @click="openDeleteModal(movie)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5"
              id="deleteModalLabel"
            >
              Удаление
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Вы точно хотите удалить фильм "{{ selectedMovie?.name }}"?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="clickDeleteMovie"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
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
  components: { Spinner },
  setup() {
    const loading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);
    const movies = ref<Movie[]>([]);
    const searchTerm = ref<string>('');
    const selectedMovie = ref<Movie | null>(null);

    const fetchMovies = async () => {
      try {
        loading.value = true;
        const response = await MovieService.getAllMovies();
        movies.value = response;
      } catch (error) {
        errorMessage.value =
          error instanceof Error ? error.message : 'Unknown error';
      } finally {
        loading.value = false;
      }
    };

    const openDeleteModal = (movie: Movie) => {
      selectedMovie.value = movie;
      const modalElement = document.getElementById(
        'deleteModal'
      ) as HTMLElement;
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    };

    const clickDeleteMovie = async () => {
      if (selectedMovie.value) {
        try {
          loading.value = true;
          await MovieService.deleteMovie(selectedMovie.value.id);
          await fetchMovies();
          selectedMovie.value = null;
        } catch (error) {
          errorMessage.value =
            error instanceof Error ? error.message : 'Unknown error';
        } finally {
          loading.value = false;
        }
      }
    };

    // const searchMovies = async () => {
    //   console.log('Searching for movies with term:', searchTerm.value);
    // };

    onMounted(fetchMovies);

    return {
      loading,
      movies,
      errorMessage,
      searchTerm,
      openDeleteModal,
      clickDeleteMovie,
      selectedMovie,
    };
  },
});
</script>

<style scoped>
.movie-img {
  max-width: 100%;
  height: auto;
}
.truncated-text {
  white-space: nowrap; /* Отключает перенос текста */
  overflow: hidden; /* Прячет текст, выходящий за пределы контейнера */
  text-overflow: ellipsis; /* Заменяет обрезанный текст многоточием */
  width: 100%;
}
</style>
