const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('dist'))

let playerSocketMapping = {}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

function getPlayerList () {
  return Object.values(playerSocketMapping)
}

function ifAValidUser (uuid) {
  return getPlayerList().find((u) => u.id === uuid)
}

io.on('connection', socket => {
  // console.log(`connected with socket id ${socket.id}`)
  socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  socket.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))

  socket.on('new_player', (player) => {
    playerSocketMapping[socket.id] = player
    socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
    // socket.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  })

  socket.on("PLAY_REQUEST", (data) => {
    socket.broadcast.emit('PLAY_REQ_TO_CLIENT', data)
  })

  socket.on("PLAY_REQ_ACCEPTED", (data) => {
    socket.broadcast.emit('PLAY_REQ_ACCEPTED_BY_USER', data)
    socket.emit('PLAY_REQ_ACCEPTED_BY_USER', data)
  })

  socket.on("PLAY_REQ_REJECTED", (data) => {
    socket.broadcast.emit('PLAY_REQ_REJECTED_BY_USER', data)
    socket.emit('PLAY_REQ_REJECTED_BY_USER', data)
  })

  socket.on("PLAYED_BY_A_PLAYER", (data) => {
    socket.broadcast.emit(`PLAYED_BY_ANOTHER_${data.playerInfo.id}`, data)
    socket.emit(`PLAYED_BY_ANOTHER_${data.playerInfo.id}`, data)
  })

  socket.on("PLAY_AGAIN", (data) => {
    socket.broadcast.emit(`PLAY_AGAIN_REQ_${data.to.id}`, data)
  })

  socket.on("disconnect", () => {
    delete playerSocketMapping[socket.id]
    socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  })
})

http.listen(5001, () => {
  console.log('🚀 Listening on http://127.0.0.1:5001')
})
