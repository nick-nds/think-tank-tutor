export const useRoundDivide = (ans, places=4) => {
  const fixedAns = ans.toFixed(10).split(".")
  if(fixedAns.length > 1) {
    const decimal = fixedAns[1].substring(0, places)
    return Number(fixedAns[0] + "." + decimal)
  } else {
    return useRound(ans)
  }
}

