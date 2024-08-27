import { EventEmitter } from 'events'

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
    this.totalSubsets = 0
  }

  _combineInterleaved(set, subsets) {
    this.runningCombine++
    setImmediate(() => {
      this._combine(set, subsets)
      this.runningCombine--
      if (this.runningCombine === 0) {
        this.emit('end')
      }
    })
  }

  _combine(set, subsets) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subsets
      this._combineInterleaved(set.slice(i + 1), newSubset)
      this._processSubset(newSubset)
    }
  }

  _processSubset(subset) {
    console.log('Subset:', ++this.totalSubsets, subset)
    const res = subset.reduce((prev, item) => prev + item, 0)
    if (res === this.sum) {
      this.emit('match', subset)
    }
  }

  start() {
    this.runningCombine = 0
    this._combineInterleaved(this.set, [])
  }
}
