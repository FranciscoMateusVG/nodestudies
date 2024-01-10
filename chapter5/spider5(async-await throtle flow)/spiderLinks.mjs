import { getPageLinks } from '../utils.mjs'
import { spiderTask } from './spider.mjs'

export function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return Promise.resolve()
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map((link) => spiderTask(link, nesting - 1, queue))

  return Promise.all(promises)
}
