import { getPageLinks } from '../utils.mjs'
import { spider } from './webspider3.mjs'

export function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return Promise.resolve()
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map((link) => spider(link, nesting - 1))

  return Promise.all(promises)
}
