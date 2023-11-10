import { readFile } from 'fs'
import { nextTick } from 'process'

const cache = new Map()

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    cb(cache.get(filename))
  } else {
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

// Fix
function consistentRead(filename, cb) {
  if (cache.has(filename)) {
    nextTick(() => cb(cache.get(filename)))
  } else {
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

function createFileReader(filename) {
  const listeners = []
  consistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value))
  })

  return {
    onDataReady: (listener) => listeners.push(listener)
  }
}

const reader1 = createFileReader('data.txt')

reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`)

  const reader2 = createFileReader('data.txt')
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`)
  })
})
