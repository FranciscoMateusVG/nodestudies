import jsonOverTcp from 'json-over-tcp-2'

const server = jsonOverTcp.createServer({ port: 60900 })

server.on('connection', (socket) => {
  socket.on('data', (data) => {
    console.log('Client data', data)
  })
})

server.listen(60900, () => {
  console.log('Server listening on port 60900')
})
