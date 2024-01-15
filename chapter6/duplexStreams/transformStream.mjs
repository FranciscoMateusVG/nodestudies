import { Transform } from 'stream'

// export class ReplaceStream extends Transform {
//   constructor(searchString, replaceString, options) {
//     super({ ...options })
//     this.searchString = searchString
//     this.replaceString = replaceString
//     this.tailPiece = ''
//   }

//   _transform(chunk, _encoding, cb) {
//     const pieces = (this.tailPiece + chunk).split(this.searchString)
//     const lastPiece = pieces[pieces.length - 1]
//     const tailPieceLen = this.searchString.length - 1
//     this.tailPiece = lastPiece.slice(-tailPieceLen)
//     pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)
//     this.push(pieces.join(this.replaceString))
//     cb()
//   }

//   _flush(cb) {
//     this.push(this.tailPiece)
//     cb()
//   }
// }

// const replaceStream = new ReplaceStream('World', 'Xerox to Xerox')

// Simplified Version
const searchString = 'World'
const replaceString = 'Xerox to Xerox'
let tail = ''

const replaceStream = new Transform({
  transform(chunk, encoding, cb) {
    const pieces = (tail + chunk).split(searchString)
    const lastPiece = pieces[pieces.length - 1]
    const tailLen = searchString.length - 1
    tail = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
    this.push(pieces.join(replaceString))
    cb()
  },
  flush(cb) {
    this.push(tail)
    cb()
  }
})

replaceStream.on('data', (chunk) => console.log(chunk.toString()))
replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end()
