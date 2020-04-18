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

io.on('connection', socket => {
  console.log(`connected with socket id ${socket.id}`)
  socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  socket.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))

  socket.on('new_player', (player) => {
    playerSocketMapping[socket.id] = player
    socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
    // socket.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  })

  socket.on("disconnect", () => {
    delete playerSocketMapping[socket.id]
    socket.broadcast.emit('ALL_PLAYERS', getPlayerList(playerSocketMapping))
  });
})

http.listen(5001, () => {
  console.log('🚀 Listening on http://127.0.0.1:5001')
})
