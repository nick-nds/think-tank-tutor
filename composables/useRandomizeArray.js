export const useRandomizeArray = (arr) => {
  arr.sort(function(){return 0.5 - Math.random()})
  return arr
}
