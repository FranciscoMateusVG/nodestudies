import Chance from 'chance'
import { createServer } from 'http'

const chance = new Chance()

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Encoding': 'text/plain' })

  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({ length: 16 * 1024 - 1 })
      const shouldContinue = res.write(`${randomChunk}\n`)
      if (!shouldContinue) {
        console.log('Backpressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\n\n\n')
  }

  generateMore()

  res.on('finish', () => console.log('All data was sent'))
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
