import { spiderTask } from './spiderTask.mjs'

const spidering = new Set()
export function spider(url, nesting, queue) {
  if (spidering.has(url)) return
  spidering.add(url)
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done)
  })
}

// nodemon spider-cli.mjs https://www.construtoraquebec.com.br/index.html 1
