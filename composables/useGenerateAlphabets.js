import { useRandomIntFromInterval } from './useRandomIntFromInterval.js'

/**
 * Generates random alphabet triplets for matrix exercises
 * @param {number|string} size - Number of triplets to generate
 * @returns {Array<Array<string>>} Array of alphabet triplets [letter, number, reverse_letter]
 */
export const useGenerateAlphabets = (size) => {
  const parsedSize = parseInt(size)
  
  if (isNaN(parsedSize) || parsedSize <= 0) {
    throw new Error('Size must be a positive number')
  }
  
  // Get valid alphabets (excluding empty placeholder at index 0)
  const validAlphabets = ALPHABET_MAPPINGS.filter(item => item[0] !== '')
  const totalAvailable = validAlphabets.length // Should be 26
  
  // If requested size is <= available alphabets, ensure no repetition
  if (parsedSize <= totalAvailable) {
    // Shuffle all valid alphabets and take the required number
    const shuffledAlphabets = [...validAlphabets]
    for (let i = shuffledAlphabets.length - 1; i > 0; i--) {
      const j = useRandomIntFromInterval(0, i)
      ;[shuffledAlphabets[i], shuffledAlphabets[j]] = [shuffledAlphabets[j], shuffledAlphabets[i]]
    }
    
    return shuffledAlphabets.slice(0, parsedSize).map(triplet => [...triplet])
  }
  
  // If requested size > 26, use the original cycling logic
  let availableAlphabets = [...validAlphabets]
  const result = []
  
  for (let i = 0; i < parsedSize; i++) {
    if (availableAlphabets.length === 0) {
      availableAlphabets = [...validAlphabets]
    }
    
    const randomIndex = useRandomIntFromInterval(0, availableAlphabets.length - 1)
    const selectedTriplet = availableAlphabets[randomIndex]
    
    result.push([...selectedTriplet])
    
    // Remove selected item from available pool
    availableAlphabets.splice(randomIndex, 1)
  }
  
  return result
}

/**
 * Alphabet mapping constants for matrix exercises
 * Each triplet represents: [letter, position_number, reverse_letter]
 */
export const ALPHABET_MAPPINGS = [
  ['', '', ''],
  ['A', '1', 'Z'],
  ['B', '2', 'Y'],
  ['C', '3', 'X'],
  ['D', '4', 'W'],
  ['E', '5', 'V'],
  ['F', '6', 'U'],
  ['G', '7', 'T'],
  ['H', '8', 'S'],
  ['I', '9', 'R'],
  ['J', '10', 'Q'],
  ['K', '11', 'P'],
  ['L', '12', 'O'],
  ['M', '13', 'N'],
  ['N', '14', 'M'],
  ['O', '15', 'L'],
  ['P', '16', 'K'],
  ['Q', '17', 'J'],
  ['R', '18', 'I'],
  ['S', '19', 'H'],
  ['T', '20', 'G'],
  ['U', '21', 'F'],
  ['V', '22', 'E'],
  ['W', '23', 'D'],
  ['X', '24', 'C'],
  ['Y', '25', 'B'],
  ['Z', '26', 'A'],
]

// Deprecated: Use ALPHABET_MAPPINGS instead
export const alphabets = ALPHABET_MAPPINGS
