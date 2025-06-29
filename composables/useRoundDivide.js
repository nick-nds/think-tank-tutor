import { useRound } from './useRound.js'

/**
 * Truncates a number to specified decimal places (for division operations)
 * @param {number} answer - Number to truncate
 * @param {number} places - Number of decimal places (default: 4)
 * @returns {number} Truncated number
 */
export const useRoundDivide = (answer, places = 4) => {
  if (typeof answer !== 'number') {
    throw new Error('Answer must be a number')
  }
  if (typeof places !== 'number' || places < 0) {
    throw new Error('Places must be a non-negative number')
  }
  
  const truncateTo = 10 ** places
  return Math.trunc(answer * truncateTo) / truncateTo
}

