import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'

export function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) return cb(err)

    fs.writeFile(filename, contents, (err) => {
      if (err) return cb(err)

      cb(null, filename, true)
    })
  })
}
