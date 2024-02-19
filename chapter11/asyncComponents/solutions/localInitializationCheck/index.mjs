import { once } from 'events'
import { db } from '../../theProblem.mjs'

db.connect()

async function updateLastAccess() {
  if (!db.connected) {
    console.log('Not connected')
    await once(db, 'connected')
  }

  await db.query('UPDATE users SET lastAccess = NOW()')
}

// This will give the not connected update
updateLastAccess()

// This will not, since by the time its called the connection is already established
setTimeout(() => {
  updateLastAccess()
}, 2000)
