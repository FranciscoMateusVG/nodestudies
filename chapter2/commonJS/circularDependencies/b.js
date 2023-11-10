exports.loaded = false
const a = require('./a.js')
module.exports = {
  a,
  loaded: true // overrides the previous export
}
