import { EventEmitter } from 'events'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { ProcessPool } from './process-pool.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers', 'subsetSumProcess.mjs')

const workers = new ProcessPool(workerFile, 4)

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start() {
    const worker = await workers.aquire()
    worker.send({ sum: this.sum, set: this.set })

    const onMessage = (message) => {
      if (message.event === 'end') {
        workers.release(worker)
      }
      this.emit(message.event, message.data)
    }

    worker.on('message', onMessage)
  }
}
