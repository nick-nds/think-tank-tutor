import { useRandomizeArray } from './useRandomizeArray.js'

/**
 * Generates unique mathematical expressions when possible combinations exceed requested size
 * @param {number} minA - Minimum value for operand A
 * @param {number} maxA - Maximum value for operand A  
 * @param {number} minB - Minimum value for operand B
 * @param {number} maxB - Maximum value for operand B
 * @param {Array<string>} operations - Array of selected operations
 * @param {number} size - Number of expressions to generate
 * @returns {Array<{a: number, b: number, operator: string}>} Array of unique expression combinations
 */
export const useGenerateUniqueExpressions = (minA, maxA, minB, maxB, operations, size) => {
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
  
  // Calculate total possible unique combinations
  const rangeA = sortedMaxA - sortedMinA + 1
  const rangeB = sortedMaxB - sortedMinB + 1
  const totalCombinations = rangeA * rangeB * operations.length
  
  // Generate all possible combinations
  const allCombinations = []
  for (let a = sortedMinA; a <= sortedMaxA; a++) {
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
  
  // If requested size exceeds total combinations, cycle through with repetition
  const result = []
  let combinationIndex = 0
  const shuffledCombinations = useRandomizeArray(allCombinations)
  
  for (let i = 0; i < parsedSize; i++) {
    result.push({ ...shuffledCombinations[combinationIndex] })
    combinationIndex = (combinationIndex + 1) % shuffledCombinations.length
  }
  
  return useRandomizeArray(result)
}