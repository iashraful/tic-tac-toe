const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('dist'))

let playerList = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/clients', (req, res) => {
  res.send(Object.keys(io.sockets.clients().connected))
})

io.on('connection', socket => {
  console.log(`connected with socket id ${socket.id}`)

  socket.on('new_player', playerName => {
    playerList.push(playerName)
    socket.broadcast.emit('NEW_PLAYER_ADDED', playerName)
  })
})

http.listen(5001, () => {
  console.log('🚀 Listening on http://127.0.0.1:5001')
})