import { FailSafeSocket } from './failSafeSocket.mjs'
const failsafeSocket = new FailSafeSocket({ port: 60900 })

setInterval(() => {
  failsafeSocket.send(process.memoryUsage())
}, 1000)
