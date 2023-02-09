export const useSortMinMax = (min, max) => {
  return min > max ? [max, min] : [min, max]
}

