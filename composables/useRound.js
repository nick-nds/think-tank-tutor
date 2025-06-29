/**
 * Rounds a number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} places - Number of decimal places (default: 2)
 * @returns {number} Rounded number
 */
export const useRound = (num, places = 2) => {
  if (typeof num !== 'number') {
    throw new Error('Input must be a number')
  }
  if (typeof places !== 'number' || places < 0) {
    throw new Error('Places must be a non-negative number')
  }
  
  const roundTo = 10 ** places
  return Math.round((num + Number.EPSILON) * roundTo) / roundTo
}
