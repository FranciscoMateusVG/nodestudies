// Load any dependency
const dependency = require('./anotherModule.js')

// a private function
function log() {
  console.log(`Logging from ${dependency.username} module`)
}

// the api to be exported for public consumption

module.exports.run = () => {
  log()
}
