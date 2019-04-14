const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const routers = require('./routers/index');
const app = new Koa();

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

const PORT = 8888;

server.listen(PORT, () => {
  console.log('服务器已经打开, 正在监听' + PORT + '端口');
});

io.on('connection', socket => {
  console.log(socket.handshake.address + '连接了');
  socket.on('send', (data) => {
    io.sockets.emit('hasMsg', { user: socket.handshake.address, msg: data });
  });
  socket.on('disconnect', () => {
    console.log(socket.handshake.address + '断开了连接');
  })
});

// 配置body解析
app.use(bodyParser());

// 静态资源托管
app.use(serve(__dirname + './../static'));

// 使用koa-router路由
app
  .use(routers.routes())
  .use(routers.allowedMethods());

