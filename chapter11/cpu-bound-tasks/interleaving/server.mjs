import { createServer } from 'http'

import { SubsetSum } from './subsetsum-interleaving.mjs'

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000')
  if (url.pathname !== '/subsetsum') {
    res.writeHead(200)
    return res.end('Im alive!')
  }

  const data = JSON.parse(url.searchParams.get('data'))
  const sum = JSON.parse(url.searchParams.get('sum'))
  res.writeHead(200)
  const subsetSum = new SubsetSum(sum, data)

  subsetSum.on('match', (subset) => {
    res.write(`Match found: ${subset}\n`)
  })

  subsetSum.on('end', () => {
    res.end('All done')
  })

  subsetSum.start()
}).listen(3000, () => console.log('Server running at http://localhost:3000/'))

// curl -G http://localhost:3000/subsetsum --data-urlencode "data=[1,2,3,4,5,6,7,8,9,10,-10,-2,-3,-4,-5,-6,-7,-8,-9,-10]" --data-urlencode "sum=0"

// curl -G http://localhost:3000
