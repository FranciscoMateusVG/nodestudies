import { promises as fsPromises } from 'fs'
import mkdirp from 'mkdirp'
import { dirname } from 'path'
import superagent from 'superagent'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

export async function download(url, filename) {
  console.log(`Downloading ${url}`)
  const { text: content } = await superagent.get(url)
  await mkdirpPromises(dirname(filename))
  await fsPromises.writeFile(filename, content)
  console.log(`Downloaded and saved: ${url}`)
  return content
}
