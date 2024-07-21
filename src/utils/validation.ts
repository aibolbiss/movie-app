// import { Ref } from 'vue';

// export const validateNumber = (
//   movie: Ref<{ [key: string]: any }>,
//   field: string,
//   max: number
// ) => {
//   const value = movie.value[field];

//   if (typeof value !== 'number' || value === null) {
//     return;
//   }

//   if (value === 0) {
//     movie.value[field] = null;
//   } else if (value > max) {
//     movie.value[field] = max;
//   } else if (value < 1) {
//     movie.value[field] = null;
//   }

//   const numberStr = String(movie.value[field]);
//   if (numberStr.length > 4) {
//     movie.value[field] = parseInt(numberStr.slice(0, 4), 10);
//   }
// };

export const validateNumber = (
  value: number | null,
  max: number
): number | null => {
  if (typeof value !== 'number' || value === null) {
    return null;
  }

  if (value === 0 || value < 1) {
    return null;
  } else if (value > max) {
    return max;
  }

  const numberStr = String(value);
  if (numberStr.length > 4) {
    return parseInt(numberStr.slice(0, 4), 10);
  }

  return value;
};
