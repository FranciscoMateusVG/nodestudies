import { promisify } from 'util'
import { deflateRaw, inflateRaw } from 'zlib'

export class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket
    this.inboundMiddleware = []
    this.outboundMiddleware = []

    this.handleIncomingMessages().catch((err) => console.error(err))
  }

  async handleIncomingMessages() {
    for await (const [message] of this.socket) {
      await this.executeMiddleware(this.inboundMiddleware, message).catch(
        (err) => {
          console.error('Error while processing the message', err)
        }
      )
    }
  }

  async send(message) {
    const finalMessage = await this.executeMiddleware(
      this.outboundMiddleware,
      message
    )
    return this.socket.send(finalMessage)
  }

  use(middleware) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound)
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound)
    }
  }

  async executeMiddleware(middlewares, initialMessage) {
    let message = initialMessage
    for await (const middlewareFunc of middlewares) {
      message = await middlewareFunc.call(this, message)
    }
    return message
  }
}

export const jsonMiddleware = function () {
  return {
    inbound(message) {
      return JSON.parse(message.toString())
    },
    outbound(message) {
      return Buffer.from(JSON.stringify(message))
    }
  }
}

const inflateRawAsync = promisify(inflateRaw)
const deflateRawAsync = promisify(deflateRaw)

export const zlibMiddleware = function () {
  return {
    inbound(message) {
      return inflateRawAsync(Buffer.from(message))
    },
    outbound(message) {
      return deflateRawAsync(message)
    }
  }
}