let express = require('express') ()
const shortid = require('shortid')
let {rooms} = require('./bin/Room')

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')
    socket.on('chat message', (msg) => {
       console.log('message: ' + msg);
       io.emit('chat message', msg);
  });
});

express.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connect', (socket)=>{
  console.log('un nuevo usuario conectado con id' + socket.id);
  socket.on('newRoom', ()=>{
      const roomId = shortid.generate()
      rooms.push({
             id: roomId,
             players: []
      })
      console.log('Room created')
      socket.emit('newRoomCreated', {roomId, rooms})
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});

