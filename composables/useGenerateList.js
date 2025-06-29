import { useSortMinMax } from './useSortMinMax.js'
import { useRandomIntFromInterval } from './useRandomIntFromInterval.js'
import { useRandomizeArray } from './useRandomizeArray.js'

/**
 * Generates a list of unique random integers within a specified range
 * @param {number|string} minimum - Minimum value
 * @param {number|string} maximum - Maximum value
 * @param {number|string} size - Number of items to generate
 * @returns {Array<number>} Array of random integers
 */
export const useGenerateList = (minimum, maximum, size) => {
  const parsedMin = parseInt(minimum)
  const parsedMax = parseInt(maximum)
  const parsedSize = parseInt(size)
  
  if (isNaN(parsedMin) || isNaN(parsedMax) || isNaN(parsedSize)) {
    throw new Error('All parameters must be valid numbers')
  }
  if (parsedSize <= 0) {
    throw new Error('Size must be greater than 0')
  }
  
  const [min, max] = useSortMinMax(parsedMin, parsedMax)
  const range = max - min + 1
  
  if (parsedSize > range) {
    console.warn(`Requested size (${parsedSize}) exceeds range (${range}). Will cycle through available numbers.`)
  }
  
  let availableNumbers = generateNumberRange(min, max)
  const result = []

  while (result.length < parsedSize) {
    if (availableNumbers.length === 0) {
      availableNumbers = generateNumberRange(min, max)
    }
    const index = useRandomIntFromInterval(0, availableNumbers.length - 1)
    result.push(availableNumbers[index])
    availableNumbers.splice(index, 1)
  }
  
  return useRandomizeArray(result)
}

/**
 * Generates array of consecutive integers from min to max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array<number>} Array of consecutive integers
 */
const generateNumberRange = (min, max) => {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i)
}
