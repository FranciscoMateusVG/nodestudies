import { promises as fsPromises } from 'fs'

import { urlToFilename } from '../utils.mjs'
import { download } from './download.mjs'
import { spiderLinks } from './spiderLinks.mjs'

export async function spider(url, nesting) {
  const filename = urlToFilename(url)
  let content
  try {
    content = await fsPromises.readFile(filename, 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    content = await download(url, filename)
  }

  return spiderLinks(url, content, nesting)
}
