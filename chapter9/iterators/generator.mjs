// Basic generator
function* generator() {
  yield 1
  yield 2
  return 3
}

const generatorObj = generator()
console.log(generatorObj.next()) // { value: 1, done: false }
console.log(generatorObj.next()) // { value: 2, done: false }
console.log(generatorObj.next()) // { value: 3, done: true }
console.log(generatorObj.next()) // { value: undefined, done: true }
console.log('-------------------')
console.log('Generator with for...of loo')
for (const value of generator()) {
  console.log(value)
}
console.log('-------------------')
console.log('Controlling a generator iterator')
function* generator2() {
  let i = 0
  while (true) {
    yield i++
  }
}
const generatorObj2 = generator2()
console.log(generatorObj2.next())
console.log(generatorObj2.next())
console.log(generatorObj2.next())
console.log(generatorObj2.next())
console.log('-------------------')
console.log('Generator with arguments')
function* generator3() {
  const what = yield 'It does not matter what i put here, it will be ignored.'
  yield 'hello ' + what
}
const generatorObj3 = generator3()
generatorObj3.next()
console.log(generatorObj3.next('Zawarudo!!!!')) // { value: 1, done: false }
console.log('-------------------')
console.log('Generator with error/return')
function* generator4() {
  try {
    const what = yield 'It does not matter what i put here, it will be ignored.'
    yield 'hello ' + what
  } catch (e) {
    yield 'Hello error: ' + e.message
  }
}
console.log('Using throw():')
const twoWayExceptionGenerator = generator4()
twoWayExceptionGenerator.next()
console.log(twoWayExceptionGenerator.throw(new Error('BOOM!')))

console.log('Using return():')
const twoWayReturnGenerator = generator4()
console.log(twoWayReturnGenerator.return('Random Return Value'))
console.log('-------------------')
console.log('How to use generators in place of iterators')
export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix
  }

  *[Symbol.iterator]() {
    let nextRow = 0
    let nextCol = 0

    while (nextRow !== this.data.length) {
      yield this.data[nextRow][nextCol]

      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++
        nextCol = 0
      } else {
        nextCol++
      }
    }
  }
}

const matrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

for (const value of matrix) {
  console.log(value)
}
console.log('-------------------')
