import { getPageLinks } from '../utils.mjs'
import { spider } from './webspider3.mjs'

export function spiderLinks(currentUrl, body, nesting) {
  let promise = Promise.resolve()
  if (nesting === 0) {
    return promise
  }

  const links = getPageLinks(currentUrl, body)
  for (const link of links) {
    promise = promise.then(() => spider(link, nesting - 1))
  }

  return promise
}
