import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false
  connect() {
    //Simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 1000)
  }

  async query(queryString) {
    if (!this.connected) {
      throw new Error('Not connected')
    }

    console.log('Querying:', queryString)
  }
}

export const db = new DB()
