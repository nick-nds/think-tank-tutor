export const useGenerateRootList = (minimum, maximum, roots, size) => {
  console.log("generate root")
  minimum = parseInt(minimum)
  maximum = parseInt(maximum)
  size = parseInt(size)
  roots = roots.map(root => {
    return parseInt(root)
  })
  let a = []
  const [min, max] = useSortMinMax(minimum, maximum)
  for(let r in roots) {
    const l = randomPerfectSquare(min, max, roots[r])
    a.push(l)
  }
  return a
}

const randomPerfectSquare = (minimum, maximum, r) => {
  const min = parseInt(minimum**(1/r))
  const max = parseInt(maximum**(1/r))
  const l = useRandomIntFromInterval(min + 1, max)
  return l**r
}
