import Chance from 'chance'
import { createServer } from 'http'

const chance = new Chance()

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Encoding': 'text/plain' })
  while (chance.bool({ likelihood: 99 })) {
    res.write(`${chance.string()}\n`)
  }
  res.end('\n\n\n')
  res.on('finish', () => console.log('All data was sent'))
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
