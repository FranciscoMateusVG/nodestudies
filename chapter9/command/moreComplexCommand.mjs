const statusUpdates = new Map()
import superagent from 'superagent'

export const statusUpdateService = {
  postUpdate(status) {
    const id = Math.floor(Math.random() * 1000000)
    statusUpdates.set(id, status)
    console.log(`Posted new status update with ID ${id}`)
    return id
  },

  destroyUpdate(id) {
    statusUpdates.delete(id)
    console.log(`Deleted status update with ID ${id}`)
  }
}

function createPostStatusCmd(service, status) {
  let postId = null

  // The command
  return {
    run() {
      postId = service.postUpdate(status)
    },
    undo() {
      if (postId) {
        service.destroyUpdate(postId)
        postId = null
      }
    },
    serialize() {
      return { type: 'status', action: 'post', status }
    }
  }
}

// The invoker
class Invoker {
  constructor() {
    this.history = []
  }

  run(cmd) {
    this.history.push(cmd)
    cmd.run()
    console.log('Command executed', cmd.serialize())
  }

  delay(cmd, delay) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
      this.run(cmd)
    }, delay)
  }

  undo() {
    const cmd = this.history.pop()
    cmd.undo()
    console.log('Command undone', cmd.serialize())
  }

  async runRemotely(cmd) {
    try {
      await superagent
        .post('http://localhost:3000/cmd')
        .send({ json: cmd.serialize() })
    } catch (e) {}

    console.log('Command executed remotely', cmd.serialize())
  }
}

const invoker = new Invoker()
const command = createPostStatusCmd(statusUpdateService, 'Hello, world!')

invoker.run(command)
invoker.undo()
invoker.delay(command, 1000 * 3)

invoker.runRemotely(command)
