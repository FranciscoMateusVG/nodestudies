import { createReadStream } from 'fs'
import { basename } from 'path'
import { pipeline } from 'stream'
import { createUploadStream } from './upload.js'

const filepath = process.argv[2]
const filename = basename(filepath)

pipeline(createReadStream(filepath), createUploadStream(filename), (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('File uploaded')
})
