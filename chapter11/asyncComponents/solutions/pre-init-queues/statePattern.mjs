import { EventEmitter } from 'events'

class InitializedState {
  async query(queryString) {
    console.log('Querying:', queryString)
  }
}

const METHODS_REQUIRING_CONNECTION = ['query']
const deactivate = Symbol('deactivate')

class QueuingState {
  constructor(db) {
    this.db = db
    this.commandsQueue = []

    METHODS_REQUIRING_CONNECTION.forEach((methodName) => {
      this[methodName] = function (...args) {
        console.log(`command queued: ${methodName} with args: ${args}`)
        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args).then(resolve, reject)
          }
          this.commandsQueue.push(command)
        })
      }
    })
  }

  [deactivate]() {
    this.commandsQueue.forEach((command) => {
      command()
    })
    this.commandsQueue = []
  }
}

class DB extends EventEmitter {
  constructor() {
    super()
    this.state = new QueuingState(this)
    this.connected = false
  }

  async query(queryString) {
    return this.state.query(queryString)
  }

  connect() {
    //Simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      const oldState = this.state
      this.state = new InitializedState(this)
      oldState[deactivate] && oldState[deactivate]()
    }, 3000)
  }
}

const db = new DB()

db.connect()

db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
db.query('UPDATE users SET lastAccess = NOW()')
