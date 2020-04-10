var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})

app.get('/clients', (req, res) => {
  res.send(Object.keys(io.sockets.clients().connected))
})

io.on('connection', socket => {
  console.log(`connected with socket id ${socket.id}`)

  socket.on('test_sock', data => {
    console.log(data)
  })
})

http.listen(5001, () => {
  console.log('Listening on 127.0.0.1:5001')
})