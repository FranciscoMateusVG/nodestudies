import { SubsetSum } from './subsetsum-child.mjs'

process.on('message', (message) => {
  const { sum, set } = message
  const subsetSum = new SubsetSum(sum, set)

  subsetSum.on('match', (subset) => {
    process.send({ event: 'match', data: subset })
  })

  subsetSum.on('end', () => {
    process.send({ event: 'end' })
  })

  subsetSum.start()
})

process.send('ready')
