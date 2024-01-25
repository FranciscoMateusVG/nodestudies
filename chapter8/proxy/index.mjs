export class StackCalulator {
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

///// Object Composition

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator
  }

  //proxied methods
  divide() {
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw new Error('Division by zero')
    }

    return this.calculator.divide()
  }

  //delegated methods
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

const calculator = new StackCalulator()
calculator.putValue(4)
calculator.putValue(2)
console.log(calculator.multiply())

const safeCalculator = new SafeCalculator(calculator)
safeCalculator.putValue(2)
// safeCalculator.putValue(0) --> this will throw
console.log(safeCalculator.divide())

// Object augmentation or monkey patching

function patchSafeCalculator(calculator) {
  const originalDivide = calculator.divide
  calculator.divide = function () {
    console.log('I was monkey patched')
    const divisor = calculator.peekValue()
    if (divisor === 0) {
      throw new Error('Division by zero')
    }
    return originalDivide.apply(calculator)
  }

  return calculator
}

const monkeyCalculator = new StackCalulator()
const safeMonkeyCalculator = patchSafeCalculator(monkeyCalculator)
safeMonkeyCalculator.putValue(2)
safeMonkeyCalculator.putValue(4)
console.log(safeMonkeyCalculator.divide())

// the built in Proxy object
const safeCalculatorHandler = {
  get: function (target, prop) {
    if (prop === 'divide') {
      return function () {
        console.log('I am using proxy object')
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw new Error('Division by zero')
        }
        return target.divide()
      }
    }
    return target[prop]
  }
}

const calculatorProxy = new StackCalulator()
const safeCalculatorProxy = new Proxy(calculatorProxy, safeCalculatorHandler)

safeCalculatorProxy.putValue(2)
safeCalculatorProxy.putValue(4)
console.log(safeCalculatorProxy.divide())

// virtualization
const evenNumbers = new Proxy([], {
  // The get trap intercepts access to the array elements,
  // returning the even number number for the given index
  get: (target, index) => index * 2,
  // The has trap intercepts the in operator, checking
  // whether given number is even or not
  has: (target, number) => number % 2 === 0
})
console.log(evenNumbers[8])
console.log(7 in evenNumbers)
console.log(8 in evenNumbers)
