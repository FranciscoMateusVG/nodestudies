import superagent from 'superagent'
import { saveFile } from './saveFile.mjs'

export function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`)
  superagent.get(url).end((err, res) => {
    if (err) return cb(err)

    saveFile(filename, res.text, (err) => {
      if (err) return cb(err)
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}
