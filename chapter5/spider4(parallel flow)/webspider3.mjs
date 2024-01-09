import { promises as fsPromises } from 'fs'

import { urlToFilename } from '../utils.mjs'
import { download } from './download.mjs'
import { spiderLinks } from './spiderLinks.mjs'

const spidering = new Set()
export function spider(url, nesting) {
  if (spidering.has(url)) {
    return Promise.resolve()
  }
  spidering.add(url)

  const filename = urlToFilename(url)
  return fsPromises
    .readFile(filename, 'utf8')
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err
      }

      // The file doesn't exist, so let’s download it
      return download(url, filename)
    })
    .then((content) => spiderLinks(url, content, nesting))
}
