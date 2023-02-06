export const useRound = (num, places=2) => {
  const roundTo = 10*places
  return Math.round((num + Number.EPSILON) * roundTo) / (roundTo)
}
