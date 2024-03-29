import { promises as fs } from 'fs'
import mkdirp from 'mkdirp-promise'
import { dirname, join } from 'path'
import { Writable } from 'stream'

// export class ToFileStream extends Writable {
//   constructor(options) {
//     super({ ...options, objectMode: true })
//   }

//   _write(chunk, _encoding, cb) {
//     mkdirp(dirname(chunk.path))
//       .then(() => {
//         fs.writeFile(chunk.path, chunk.content)
//       })
//       .then(() => cb())
//       .catch(cb)
//   }
// }
// const tfs = new ToFileStream()

// Simplified implementation
const tfs = new Writable({
  objectMode: true,
  write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => {
        fs.writeFile(chunk.path, chunk.content)
      })
      .then(() => cb())
      .catch(cb)
  }
})

tfs.write({ path: join('files', 'file1.txt'), content: 'Hello' })
tfs.write({ path: join('files', 'file2.txt'), content: 'Node.js' })
tfs.write({ path: join('files', 'file3.txt'), content: 'Streams' })
tfs.end(() => console.log('All files created'))
