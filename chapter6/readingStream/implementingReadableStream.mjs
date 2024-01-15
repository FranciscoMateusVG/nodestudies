import Chance from 'chance'
import { Readable } from 'stream'

const chance = new Chance()

export class RandomStream extends Readable {
  constructor(options) {
    super(options)
    this.emmitedBytes = 0
  }

  _read(size) {
    const chunk = chance.string()
    console.log(`Pushing chunk of size: ${chunk.length}`)
    this.push(chunk, 'utf8')
    this.emmitedBytes += chunk.length
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
}

// const randomStream = new RandomStream()
// randomStream
//   .on('data', (chunk) => {
//     console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
//   })
//   .on('end', () => {
//     console.log(`End of stream: ${randomStream.emmitedBytes} bytes emmited`)
//   })

// Simplified implementation

let emmitedBytes = 0

function read(size) {
  const chunk = chance.string({ length: size })
  this.push(chunk, 'utf8')
  emmitedBytes += chunk.length
  if (chance.bool({ likelihood: 5 })) {
    this.push(null)
  }
}

const randomStream = new Readable({ read })
randomStream
  .on('data', (chunk) => {
    console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
  })
  .on('end', () => {
    console.log(`End of stream: ${emmitedBytes} bytes emmited`)
  })
