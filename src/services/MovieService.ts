import axios, { AxiosResponse } from 'axios';

interface Movie {
  id: string; // ID фильма
  name: string; // Название фильма
  year: number; // Год выпуска
  genre: string; // Жанр фильма
  rating: number; // Рейтинг фильма
  description: string; // Описание фильма
  photo: string; // Фото фильма
}

export class MovieService {
  private static serverURL = 'http://localhost:8081';

  static async getAllMovies(): Promise<Movie[]> {
    try {
      const response: AxiosResponse<Movie[]> = await axios.get(
        `${this.serverURL}/movies`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  static async getMovie(movieId: string): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.get(
        `${this.serverURL}/movies/${movieId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  }

  static async createMovie(movie: Omit<Movie, 'id'>): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.post(
        `${this.serverURL}/movies`,
        movie
      );
      return response.data;
    } catch (error) {
      console.error('Error creating movies:', error);
      throw error;
    }
  }

  static async updateMovie(movie: Movie, movieId: string): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.put(
        `${this.serverURL}/movies/${movieId}`,
        movie
      );
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  static async deleteMovie(movieId: string): Promise<void> {
    try {
      await axios.delete(`${this.serverURL}/movies/${movieId}`);
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
}
