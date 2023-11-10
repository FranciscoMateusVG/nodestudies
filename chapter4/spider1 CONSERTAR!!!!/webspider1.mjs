import fs from 'fs'
import { mkdirp } from 'mkdirp'
import path from 'path'
import superagent from 'superagent'
import { urlToFilename } from '../utils.mjs'

export function spider(url, callback) {
  const filename = urlToFilename(url)
  console.log('aqui')
  console.log(filename)
  fs.access(filename, (err) => {
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      superagent.get(url).end((err, res) => {
        if (err) {
          callback(err)
        } else {
          const pathString = path.dirname(filename)
          console.log(pathString)
          mkdirp(pathString, (err) => {
            if (err) {
              callback(err)
            } else {
              fs.writeFile(filename, res.text, (err) => {
                if (err) {
                  callback(err)
                } else {
                  callback(null, filename, true)
                }
              })
            }
          })
        }
      })
    } else {
      callback(null, filename, false)
    }
  })
}
