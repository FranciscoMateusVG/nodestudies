class StackCalulator {
  constructor() {
    this.stack = []
  }

  putValue(value) {
    this.stack.push(value)
  }

  getValue() {
    return this.stack.pop()
  }

  peekValue() {
    return this.stack[this.stack.length - 1]
  }

  clear() {
    this.stack = []
  }

  divide() {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor
    this.putValue(result)
    return result
  }

  multiply() {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplier * multiplicand
    this.putValue(result)
    return result
  }
}
// Composition
class EnhancedCalculator {
  constructor(calculator) {
    this.calculator = calculator
  }

  // new method
  add() {
    const addend = this.calculator.getValue()
    const augend = this.calculator.getValue()
    const result = addend + augend
    this.calculator.putValue(result)
    return result
  }

  // modified method
  divide() {
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw new Error('Division by zero')
    }

    return this.calculator.divide()
  }

  // delegated methods
  putValue(value) {
    return this.calculator.putValue(value)
  }

  getValue() {
    return this.calculator.getValue()
  }

  peekValue() {
    return this.calculator.peekValue()
  }

  clear() {
    return this.calculator.clear()
  }

  multiply() {
    return this.calculator.multiply()
  }
}

const stackCalculator = new StackCalulator()
const enhancedCalculator = new EnhancedCalculator(stackCalculator)

enhancedCalculator.putValue(3)
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.add())
