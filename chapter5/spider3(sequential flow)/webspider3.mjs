import { promises as fsPromises } from 'fs'

import { urlToFilename } from '../utils.mjs'
import { download } from './download.mjs'
import { spiderLinks } from './spiderLinks.mjs'

export function spider(url, nesting) {
  const filename = urlToFilename(url)

  return fsPromises
    .readFile(filename, 'utf8')
    .catch((err) => {
      console.log(2)
      if (err.code !== 'ENOENT') {
        throw err
      }

      // The file doesn't exist, so let's download it
      return download(url, filename)
    })
    .then((content) => {
      return spiderLinks(url, content, nesting)
    })
}
