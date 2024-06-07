import { totalSalesRaw } from './totalSalesRaw.mjs'

const runningRequests = new Map()

export function totalSalesBatch(product) {
  console.log(runningRequests)
  if (runningRequests.has(product)) {
    console.log('Batching')
    return runningRequests.get(product)
  }

  const resultPromise = totalSalesRaw(product)
  runningRequests.set(product, resultPromise)
  resultPromise.finally(() => {
    console.log('i was deleted')
    // runningRequests.delete(product)
  })

  return resultPromise
}
