import { createProfiler } from './profiler.mjs'

function getAllFactorsFor(number) {
  const profiler = createProfiler(`Finding all factors for ${number}`)
  profiler.start()
  const factors = []
  for (let factor = 2; factor <= number; factor++) {
    while (number % factor === 0) {
      factors.push(factor)
      number /= factor
    }
  }
  profiler.end()
  return factors
}

const myNumber = process.argv[2] || 1234567890
const myFactors = getAllFactorsFor(myNumber)
console.log(`Factors for ${myNumber} are: `, myFactors)
