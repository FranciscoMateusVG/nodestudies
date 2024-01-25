import { Level } from 'level'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {
    db.on('put', (key, value) => {
      const match = Object.keys(pattern).every((k) => {
        return pattern[k] === value[k]
      })
      if (match) {
        listener(key, value)
      }
    })
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbPath = join(__dirname, 'db')
const db = new Level('example', { valueEncoding: 'json' })
levelSubscribe(db)

db.subscribe({ doctype: 'tweet', language: 'en' }, (key, value) => {
  console.log('New matching tweet:', value)
})

db.put('1', { doctype: 'tweet', text: 'Hi', language: 'en' })
db.put('2', { doctype: 'company', name: 'ACME Co.' })
db.put('3', { doctype: 'tweet', text: 'Bonjour', language: 'en' })
db.put('4', { doctype: 'person', name: 'Mary' })
