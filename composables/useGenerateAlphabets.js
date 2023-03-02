export const useGenerateAlphabets = (size)  => {
  const index = useRandomIntFromInterval(1, 26)
  let alpha = []
  for(let i = 0; i < size; i++) {
    const index = useRandomIntFromInterval(1, 26)
    alpha.push([alphabets[index][0], index, alphabets[index][1]])
  }
  return alpha
}

export const alphabets = [
  ['', ''],
  ['A', 'Z'],
  ['B', 'Y'],
  ['C', 'X'],
  ['D', 'W'],
  ['E', 'V'],
  ['F', 'U'],
  ['G', 'T'],
  ['H', 'S'],
  ['I', 'R'],
  ['J', 'Q'],
  ['K', 'P'],
  ['L', 'O'],
  ['M', 'N'],
  ['N', 'M'],
  ['O', 'L'],
  ['P', 'K'],
  ['Q', 'J'],
  ['R', 'I'],
  ['S', 'H'],
  ['T', 'G'],
  ['U', 'F'],
  ['V', 'E'],
  ['W', 'D'],
  ['X', 'C'],
  ['Y', 'B'],
  ['Z', 'A'],
]
