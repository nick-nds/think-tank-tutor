import { useSortMinMax } from './useSortMinMax.js'
import { useRandomIntFromInterval } from './useRandomIntFromInterval.js'

/**
 * Generates perfect powers/roots within a specified range
 * @param {number|string} minimum - Minimum value for the range
 * @param {number|string} maximum - Maximum value for the range
 * @param {Array<number|string>} roots - Array of root values to generate
 * @param {number|string} size - Number of items (currently unused but kept for compatibility)
 * @returns {Array<number>} Array of perfect powers
 */
export const useGenerateRootList = (minimum, maximum, roots, size) => {
  const parsedMin = parseInt(minimum)
  const parsedMax = parseInt(maximum)
  const parsedSize = parseInt(size)
  
  if (isNaN(parsedMin) || isNaN(parsedMax) || isNaN(parsedSize)) {
    throw new Error('Minimum, maximum, and size must be valid numbers')
  }
  if (!Array.isArray(roots) || roots.length === 0) {
    throw new Error('Roots must be a non-empty array')
  }
  
  const parsedRoots = roots.map(root => {
    const parsed = parseInt(root)
    if (isNaN(parsed) || parsed <= 0) {
      throw new Error('All roots must be positive numbers')
    }
    return parsed
  })
  
  const [min, max] = useSortMinMax(parsedMin, parsedMax)
  const result = []
  
  for (const root of parsedRoots) {
    const perfectPower = generatePerfectPower(min, max, root)
    result.push(perfectPower)
  }
  
  return result
}

/**
 * Generates a random perfect power within the specified range
 * @param {number} minimum - Minimum value for the range
 * @param {number} maximum - Maximum value for the range
 * @param {number} root - Root value for the power
 * @returns {number} Perfect power within range
 */
const generatePerfectPower = (minimum, maximum, root) => {
  const minBase = Math.ceil(minimum ** (1 / root))
  const maxBase = Math.floor(maximum ** (1 / root))
  
  if (minBase > maxBase) {
    throw new Error(`No valid perfect ${root}th powers exist in range [${minimum}, ${maximum}]`)
  }
  
  const base = useRandomIntFromInterval(minBase, maxBase)
  return base ** root
}
