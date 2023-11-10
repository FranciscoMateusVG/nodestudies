import { nextTick } from 'process'

function add(a, b) {
  return a + b
}

function addCps(a, b, callback) {
  // This puts the callback on the event loop phase
  // after all I/O events are processed
  // Can NOT cause IO starvation
  // are executed before I/O callbacks
  // so it is slower than setImmediate
  setTimeout(() => callback(a + b), 1)
}

function addCps2(a, b, callback) {
  // This puts the callback on the event loop queue
  // called microtask queue
  // executes after the current operation completes
  // even before any other I/O events are processed
  // Can Cause IO starvation
  nextTick(() => callback(a + b), 1)
}

function addCps3(a, b, callback) {
  // This puts the callback on the event loop phase
  // after all I/O events are processed
  // Can NOT cause IO starvation
  // BUT FASTER
  setImmediate(() => callback(a + b), 1)
}

console.log('before')
addCps(1, 2, (result) => console.log('Result: ' + result))
console.log('after 1')
console.log('after 2')
console.log('after 3')
console.log('after 4')
console.log('after 5')
addCps2(2, 2, (result) => console.log('Result: ' + result))
console.log('after 6')
console.log('after 7')
console.log('after 8')
addCps3(2, 3, (result) => console.log('Result: ' + result))
console.log('after 9')
console.log('after 10')
