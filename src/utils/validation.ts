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
