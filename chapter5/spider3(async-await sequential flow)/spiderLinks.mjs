import { getPageLinks } from '../utils.mjs'
import { spider } from './webspider3.mjs'

export async function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return
  }
  const links = getPageLinks(currentUrl, content)
  for (const link of links) {
    await spider(link, nesting - 1)
  }
}
