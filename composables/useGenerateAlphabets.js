export const useGenerateAlphabets = (size)  => {
  let alphabetCopy = [ ...alphabets ]
  let count = 0
  let alpha = []
  while (count < size) {
    const index = useRandomIntFromInterval(1, alphabetCopy.length - 1)
    alpha.push([alphabetCopy[index][0], alphabetCopy[index][1], alphabetCopy[index][2]])
    alphabetCopy.splice(index, 1)
    if(alphabetCopy.length == 1 && alphabetCopy[0][0] == '') {
      alphabetCopy = [ ...alphabets ]
    }
    count ++
  }
  return alpha
}

export const alphabets = [
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
