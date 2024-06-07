import { createServer } from 'http'

import { totalSalesBatch } from './totalSalesBatch.mjs'

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000')
  const product = url.searchParams.get('product')
  console.log(`Request for total sales of ${product}`)

  const sum = await totalSalesBatch(product)

  res.setHeader('Content-Type', 'application/json')
  res.writeHeader(200)
  res.end(JSON.stringify({ product, total: sum }))
}).listen(8000, () => console.log('Server running at http://localhost:8000/'))
