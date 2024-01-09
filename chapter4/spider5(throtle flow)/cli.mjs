import { spider } from './spider.mjs'
import { TaskQueue } from './taskQueue.mjs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2

const spiderQueue = new TaskQueue(concurrency)
spiderQueue.on('error', (err) => console.log(err))
spiderQueue.on('empty', () => console.log('Download complete'))

spider(url, nesting, spiderQueue)
