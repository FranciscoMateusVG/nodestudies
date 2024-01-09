import { promises as fsPromises } from 'fs'
import mkdirp from 'mkdirp'
import { dirname } from 'path'
import superagent from 'superagent'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

export function download(url, filename) {
  let content
  console.log(`Downloading ${url} into ${filename}`)
  superagent
    .get(url)
    .then((res) => {
      content = res.text
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
    })
}
