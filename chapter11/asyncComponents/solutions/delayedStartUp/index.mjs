import { once } from 'events'
import { db } from '../../theProblem.mjs'

async function initialize() {
  db.connect()
  await once(db, 'connected')
}

async function updateLastAccess() {
  await db.query('UPDATE users SET lastAccess = NOW()')
}

initialize().then(() => {
  // Both will give the same result
  updateLastAccess()
  setTimeout(() => {
    updateLastAccess()
  }, 2000)
})
