import { Ref } from 'vue';

export const validateNumber = (
  movie: Ref<{ [key: string]: any }>,
  field: string,
  max: number
) => {
  const value = movie.value[field];

  if (typeof value !== 'number' || value === null) {
    return;
  }

  if (value === 0) {
    movie.value[field] = null;
  } else if (value > max) {
    movie.value[field] = max;
  } else if (value < 1) {
    movie.value[field] = null;
  }

  const numberStr = String(movie.value[field]);
  if (numberStr.length > 4) {
    movie.value[field] = parseInt(numberStr.slice(0, 4), 10);
  }
};
