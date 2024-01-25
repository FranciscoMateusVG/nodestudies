// import fs from 'fs'
import { Level } from 'level'
import { resolve } from 'path'

function createFSAdapter(db) {
  return {
    writeFile: (filename, contents, options, cb) => {
      if (typeof options === 'function') {
        cb = options
        options = {}
      } else if (typeof options === 'string') {
        options = { encoding: options }
      }

      db.put(
        resolve(filename),
        contents,
        { valueEncoding: options.encoding },
        cb
      )
    },
    readFile: (filename, options, cb) => {
      if (typeof options === 'function') {
        cb = options
        options = {}
      } else if (typeof options === 'string') {
        options = { encoding: options }
      }

      db.get(
        resolve(filename),
        { valueEncoding: options.encoding },
        (err, value) => {
          if (err) {
            if (err.type === 'NotFoundError') {
              err = new Error(`ENOENT, open "${filename}"`)
              err.code = 'ENOENT'
              err.errno = 34
              err.path = filename
            }
            return cb && cb(err)
          }
          cb && cb(null, value)
        }
      )
    }
  }
}

const db = new Level('example', { valueEncoding: 'json' })
const fs = createFSAdapter(db)

fs.writeFile('test.txt', 'Hello World', () => {
  fs.readFile('test.txt', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })
})

// try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err)
  }
})
