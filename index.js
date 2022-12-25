const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 8089

// const socket = io

// socket.on('connection', socketId => {
//   console.log(spc);
// })

io.on('connection', socket => {
  console.log('A user just connected... ', socket.id)

  socket.on('join-room', room => {
    socket.join(room)
  })

  socket.on('disconnect', () => {
    console.log('A user just disconnected...')
  })

  // socket.on('chat_message', (msg) => {
  //   console.log('message: ' + msg);
  // });

  socket.on('comment', (msg, room) => {
    // console.log('New message: ', msg);
    if (room) {
      socket.to(room).emit('comment', msg)
    }
    else {
      socket.broadcast.emit('comment', value)
    }
  })

  socket.on('writing_comment', (value, room) => {
    if (room) {
      socket.to(room).emit('writing_comment', value)
    }
    else {
      socket.broadcast.emit('writing_comment', value)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Socket-server is listening on port http://localhost:${PORT}`);
})