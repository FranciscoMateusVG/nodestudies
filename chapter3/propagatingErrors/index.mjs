import { readFile } from 'fs'

function readJSON(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    let parsed
    if (err)
      // propagate the error and exit the current function
      return callback(err)

    try {
      // parse the file contents
      parsed = JSON.parse(data)
    } catch (err) {
      // catch parsing errors
      return callback(err)
    }
    // no errors, propagate just the data
    callback(null, parsed)
  })
}

function readJSONThrows(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) return callback(err)
    // no try/catch block here
    // JSON parse can fail and generate an
    // uncaught exception
    callback(null, JSON.parse(data))
  })
}

try {
  readJSONThrows('nonJSON.txt', (err, data) => console.error(err))
} catch (error) {
  console.log('This will NOT cathc the JSON.parse error')
}

process.on('uncaughtException', (error) => {
  console.log('This WILL catch the JSON.parse error: ' + error.message)
  // The following line is what closes the app
  // if you don't include it, the app will continue
  // which is bad...
  // obviously.
  process.exit(1)
})
