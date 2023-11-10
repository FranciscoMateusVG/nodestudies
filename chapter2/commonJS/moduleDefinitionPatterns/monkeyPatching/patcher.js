require('./logger').customMessage = function () {
  console.log('This is a new functionality')
}

require('./logger').log = function () {
  console.log('This have being MONKEY PATCHED')
}
