import { useRound } from './useRound.js'
import { useRoundDivide } from './useRoundDivide.js'

/**
 * Mathematical operations handler
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @param {string} operator - Operation type
 * @returns {number} Calculated result with appropriate rounding
 */
export const useOperate = (a, b, operator) => {
  // Convert to numbers if they're strings or other types
  const numA = Number(a)
  const numB = Number(b)
  
  if (isNaN(numA) || isNaN(numB)) {
    throw new Error(`Operands must be valid numbers. Received: a=${a}, b=${b}`)
  }
  if (!operations[operator]) {
    throw new Error(`Unknown operator: ${operator}`)
  }
  if (operator === 'divide' && numB === 0) {
    throw new Error('Division by zero is not allowed')
  }
  
  const result = operations[operator](numA, numB)
  return operator === 'divide' ? useRoundDivide(result) : useRound(result)
}

const operations = {
  divide: (a, b) => a / b,
  multiply: (a, b) => a * b,
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  exponent: (a, b) => a ** b,
  root: (a, b) => a ** (1 / b),
}
