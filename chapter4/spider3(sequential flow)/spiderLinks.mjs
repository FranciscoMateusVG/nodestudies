import { getPageLinks } from '../utils.mjs'
import { spider } from './webspider3.mjs'

export function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) return process.nextTick(cb)

  const links = getPageLinks(currentUrl, body)

  if (links.length === 0) return process.nextTick(cb)

  // This just goes rambo mode in parallel
  //   for (const link of links) {
  //     spider(link, nesting - 1, cb)
  //   }

  // This goes sequential
  iterate(0, links, nesting, cb)
}

function iterate(index, links, nesting, cb) {
  if (index === links.length) return cb()

  spider(links[index], nesting - 1, (err) => {
    if (err) return cb(err)
    iterate(index + 1, links, nesting, cb)
  })
}
