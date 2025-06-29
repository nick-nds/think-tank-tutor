/**
 * Shuffles an array using Fisher-Yates algorithm (returns new array)
 * @param {Array} arr - Array to shuffle
 * @returns {Array} New shuffled array
 */
export const useRandomizeArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array')
  }
  
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
