import { createWriteStream } from 'fs'

function createLoggingWritable(writable) {
  const proxy = new Proxy(writable, {
    get: function (target, prop) {
      if (prop === 'write') {
        return function (...args) {
          const [chunk] = args
          console.log('Writing via proxy the', chunk)
          return target.write(...args)
        }
      }
      return target[prop]
    }
  })

  return proxy
}

const writable = createWriteStream('test.txt')
const writableProxy = createLoggingWritable(writable)

writableProxy.write('First chunk')
writableProxy.write('Second chunk')
writable.write('This is not logged')
writableProxy.end()
