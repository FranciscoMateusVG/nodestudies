import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false
  commandsQueue = []
  connect() {
    //Simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      this.commandsQueue.forEach((command) => {
        command()
      })
      this.commandsQueue = []
    }, 1000)
  }

  async query(queryString) {
    if (!this.connected) {
      console.log('Received a query while not connected, queuing it')
      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject)
        }
        this.commandsQueue.push(command)
      })
    }

    console.log('Querying:', queryString)
  }
}

const db = new DB()

db.connect()

db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
