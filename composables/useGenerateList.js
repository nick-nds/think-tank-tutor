export const useGenerateList = (minimum, maximum, size) => {
  minimum = parseInt(minimum)
  maximum = parseInt(maximum)
  size = parseInt(size)
  const [min, max] = useSortMinMax(minimum, maximum)
  let list = generateList(min, max)
  let l = []

  while (l.length < size) {
    if(list.length == 0) {
      list = generateList(min, max)
    }
    const index = useRandomIntFromInterval(0, list.length - 1)
    l.push(list[index])
    list.splice(index, 1)
  }
  return useRandomizeArray(l)
}

const generateList = (min, max) => {
  let list = []
  let l = []
  for(let i = min; i <= max; i++) {
    list.push(i)
  }
  return list
}
