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
  
  // If requested size > 26, create fair duplicates then shuffle
  const pool = []
  const timesEach = Math.floor(parsedSize / validAlphabets.length)
  const remainder = parsedSize % validAlphabets.length

  // Add each alphabet triplet the calculated number of times
  for (const triplet of validAlphabets) {
    for (let i = 0; i < timesEach; i++) {
      pool.push([...triplet])
    }
  }

  // Add remainder items: shuffle alphabets and take first N
  const shuffledForRemainder = [...validAlphabets]
  for (let i = shuffledForRemainder.length - 1; i > 0; i--) {
    const j = useRandomIntFromInterval(0, i)
    ;[shuffledForRemainder[i], shuffledForRemainder[j]] = [shuffledForRemainder[j], shuffledForRemainder[i]]
  }
  for (let i = 0; i < remainder; i++) {
    pool.push([...shuffledForRemainder[i]])
  }

  // Shuffle entire pool for random distribution
  for (let i = pool.length - 1; i > 0; i--) {
    const j = useRandomIntFromInterval(0, i)
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool
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
