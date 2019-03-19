const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

server.listen(8888, ()=> {
  console.log('服务器已经打开');
})

io.on('connection', function (socket) {
  socket.on('send', (data) => {
    io.sockets.emit('hasMsg',{user: socket.handshake.address, msg: data});
  })
  console.log(socket.handshake.address + '连接了');
});

app.use(serve('.'));
