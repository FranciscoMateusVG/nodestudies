function createTask(target, ...args) {
  return () => {
    target(...args)
  }
}

//Is similar to the following:
const task = target.bind(null, ...args)
