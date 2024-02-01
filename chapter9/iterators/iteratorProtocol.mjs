const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

function createAlphabetIterator() {
  let currentLetter = A_CHAR_CODE
  return {
    next() {
      if (currentLetter <= Z_CHAR_CODE) {
        return {
          done: false,
          value: String.fromCharCode(currentLetter++)
        }
      } else {
        return { done: true }
      }
    }
  }
}

const iterator = createAlphabetIterator()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}

// This will throw an error because even though its an iterator, it's not an iterable
// for (const letter of iterator) {
//   console.log(letter)
// }
