import { createReadStream } from 'fs'
import { basename } from 'path'
import { PassThrough } from 'stream'
import { createBrotliCompress } from 'zlib'
import { upload } from './upload.js'

const filepath = process.argv[2] // ①
const filename = basename(filepath)
const contentStream = new PassThrough() // ②

upload(`${filename}.br`, contentStream) // ③
  .then((response) => {
    console.log(`Server response: ${response.data}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

createReadStream(filepath) // ④
  .pipe(createBrotliCompress())
  .pipe(contentStream)
