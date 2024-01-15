import { PassThrough } from 'stream'

let bytesWritten = 0
const monitor = new PassThrough()

monitor.on('data', (chunk) => {
  bytesWritten += chunk.length
})

monitor.on('finish', () => {
  console.log(`Bytes written: ${bytesWritten}`)
})

monitor.write('Hello')
monitor.write('World')
monitor.end()
// Path: passThrough/observability.mjs
