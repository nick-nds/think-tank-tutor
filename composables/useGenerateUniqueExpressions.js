import { useRandomizeArray } from './useRandomizeArray.js'

/**
 * Generates unique mathematical expressions when possible combinations exceed requested size
 * @param {number} minA - Minimum value for operand A
 * @param {number} maxA - Maximum value for operand A
 * @param {number} minB - Minimum value for operand B
 * @param {number} maxB - Maximum value for operand B
 * @param {Array<string>} operations - Array of selected operations
 * @param {number} size - Number of expressions to generate
 * @param {Array<number>|null} validOperandAValues - Optional array of valid A values (for perfect powers)
 * @returns {Array<{a: number, b: number, operator: string}>} Array of unique expression combinations
 */
export const useGenerateUniqueExpressions = (minA, maxA, minB, maxB, operations, size, validOperandAValues = null) => {
  const parsedMinA = parseInt(minA)
  const parsedMaxA = parseInt(maxA)
  const parsedMinB = parseInt(minB)
  const parsedMaxB = parseInt(maxB)
  const parsedSize = parseInt(size)
  
  if (isNaN(parsedMinA) || isNaN(parsedMaxA) || isNaN(parsedMinB) || isNaN(parsedMaxB) || isNaN(parsedSize)) {
    throw new Error('All numeric parameters must be valid numbers')
  }
  
  if (!Array.isArray(operations) || operations.length === 0) {
    throw new Error('Operations must be a non-empty array')
  }
  
  if (parsedSize <= 0) {
    throw new Error('Size must be greater than 0')
  }
  
  // Sort ranges to ensure min <= max
  const [sortedMinA, sortedMaxA] = parsedMinA <= parsedMaxA ? [parsedMinA, parsedMaxA] : [parsedMaxA, parsedMinA]
  const [sortedMinB, sortedMaxB] = parsedMinB <= parsedMaxB ? [parsedMinB, parsedMaxB] : [parsedMaxB, parsedMinB]
  
  // Determine A values to use
  const aValues = validOperandAValues ||
    Array.from({ length: sortedMaxA - sortedMinA + 1 }, (_, i) => sortedMinA + i)

  // Calculate total possible unique combinations
  const rangeA = aValues.length
  const rangeB = sortedMaxB - sortedMinB + 1
  const totalCombinations = rangeA * rangeB * operations.length

  // Generate all possible combinations
  const allCombinations = []
  for (const a of aValues) {
    for (let b = sortedMinB; b <= sortedMaxB; b++) {
      for (const operator of operations) {
        allCombinations.push({ a, b, operator })
      }
    }
  }
  
  // If requested size is less than or equal to total combinations, ensure uniqueness
  if (parsedSize <= totalCombinations) {
    const shuffled = useRandomizeArray(allCombinations)
    return shuffled.slice(0, parsedSize)
  }
  
  // If requested size exceeds total combinations, create fair duplicates then shuffle
  const pool = []
  const timesEach = Math.floor(parsedSize / allCombinations.length)
  const remainder = parsedSize % allCombinations.length

  // Add each combination the calculated number of times
  for (const combo of allCombinations) {
    for (let i = 0; i < timesEach; i++) {
      pool.push({ ...combo })
    }
  }

  // Add remainder items randomly from all combinations
  const shuffledForRemainder = useRandomizeArray([...allCombinations])
  for (let i = 0; i < remainder; i++) {
    pool.push({ ...shuffledForRemainder[i] })
  }

  // Shuffle entire pool for random distribution
  return useRandomizeArray(pool)
}