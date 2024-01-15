import { Transform, pipeline } from 'stream'
import { promisify } from 'util'
import { createGunzip, createGzip } from 'zlib'

const uppercasify = new Transform({
  transform(chunk, _enc, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

// pipeline(
//   process.stdin,
//   createGunzip(),
//   uppercasify,
//   createGzip(),
//   process.stdout,
//   (err) => {
//     if (err) {
//       console.error(err)
//       process.exit(1)
//     }
//   }
// )

// With promisify
const pipelinePromise = promisify(pipeline)

pipelinePromise(
  process.stdin,
  createGunzip(),
  uppercasify,
  createGzip(),
  process.stdout
).catch((err) => {
  console.error(err)
  process.exit(1)
})
