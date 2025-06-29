/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
export const useRandomIntFromInterval = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Min and max must be numbers')
  }
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}
