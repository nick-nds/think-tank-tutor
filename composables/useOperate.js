export const useOperate = (a, b, operator) => {
  const ans = operations[operator](a, b)
  if(operator == "divide") {
    return useRoundDivide(ans)
  } else {
    return useRound(ans)
  }
}

const operations = {
  divide: (a, b) => {
    return a/b
  },
  multiply: (a, b) => {
    return a*b
  },
  add: (a, b) => {
    return a+b
  },
  subtract: (a, b) => {
    return a-b
  },
  exponent: (a, b) => {
    return a**b
  },
  root: (a, b) => {
    return a**(1/b)
  },
}
