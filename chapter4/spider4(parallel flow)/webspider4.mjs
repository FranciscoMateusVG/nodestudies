import fs from 'fs'

import { urlToFilename } from '../utils.mjs'
import { download } from './download.mjs'
import { spiderLinks } from './spiderLinks.mjs'

//Solution for fixing the race condtion
// const spidering = new Set()
export function spider(url, nesting, cb) {
  // if (spidering.has(url)) return process.nextTick(cb)

  // spidering.add(url)

  const filename = urlToFilename(url)
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') return cb(err)

      return download(url, filename, (err, requestContent) => {
        if (err) return cb(err)
        spiderLinks(url, requestContent, nesting, cb)
      })
    }

    // If the file exists, it’s read and its content is passed to spiderLinks.
    spiderLinks(url, fileContent, nesting, cb)
  })
}
