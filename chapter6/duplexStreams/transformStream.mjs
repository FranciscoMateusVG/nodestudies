import { parse } from 'csv-parse'
import { createReadStream } from 'fs'
import {
  FilterByCountry,
  SumProfit
} from './transformFilteringAndAgregating.mjs'

const csvParser = parse({ columns: true })

createReadStream('sales.csv')
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(new SumProfit())
  .pipe(process.stdout)
