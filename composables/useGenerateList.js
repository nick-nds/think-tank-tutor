export const useGenerateList = (minimum, maximum, size) => {
  minimum = parseInt(minimum)
  maximum = parseInt(maximum)
  size = parseInt(size)
  const [min, max] = sortMinMax(minimum, maximum)
  let l = []
  if(((max - min) + 1) == size) {
    for(let i = min; i<= max; i++) {
      l.push(i)
    }
    useRandomizeArray(l)
  } else {
    for(let i = 0; i< size; i++) {
      l.push(useRandomIntFromInterval(min, max))
    }
  }
  return l
}

const sortMinMax = (min, max) => {
  return min > max ? [max, min] : [min, max]
}
