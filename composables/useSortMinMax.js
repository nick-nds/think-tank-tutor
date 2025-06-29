/**
 * Ensures proper min/max order
 * @param {number} min - First value
 * @param {number} max - Second value
 * @returns {Array<number>} Array with [min, max] in correct order
 */
export const useSortMinMax = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both values must be numbers')
  }
  return min > max ? [max, min] : [min, max]
}

