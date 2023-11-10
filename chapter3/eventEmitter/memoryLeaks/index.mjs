const thisTakesMemory = 'A big string.....'
const listener = () => console.log(thisTakesMemory)
emmiter.on('an_event', listener)

// Remember to always remove listeners when you are done with them
emmiter.removeListener('an_event', listener)

// You can also remove all listeners for an event
emmiter.removeAllListeners('an_event')

// You can also remove all listeners for all events
emmiter.removeAllListeners()

// You can also use the once method to add a listener that will be removed after it is called
emmiter.once('an_event', () => console.log('This will only be called once'))
