import { promises as fs } from 'fs'
import { promisify } from 'util'
import { gzip } from 'zlib'

const gzipPromise = promisify(gzip)

const fileName = process.argv[2]

async function main() {
  const data = await fs.readFile(fileName)
  const gzippedData = await gzipPromise(data)
  await fs.writeFile(fileName + '.gz', gzippedData)
  console.log('File successfully compressed by buffer')
}

main()
