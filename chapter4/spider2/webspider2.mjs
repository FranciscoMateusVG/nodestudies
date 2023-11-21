import fs from 'fs'

import { urlToFilename } from '../utils.mjs'
import { download } from './download.mjs'

export function spider(url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, (err) => {
    if (!err && err.code !== 'ENOENT') {
      return cb(null, filename, false)
    }

    download(url, filename, (err) => {
      if (err) return cb(err)
      cb(null, filename, true)
    })
  })
}
