const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const routers = require('./routers/index');
const app = new Koa();

const session = require('koa-session');
const CONFIG = require('../config/config');

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

const PORT = 8080;

app.keys = ['peng'];

server.listen(PORT, () => {
  console.log('服务器已经打开, 正在监听' + PORT + '端口');
});

let userList = [];
io.on('connection', socket => {
  // let de = session.decode(socket.handshake.headers.cookie);
  // console.log(app.session);
  console.log(socket.handshake.address + '连接了');
  socket.on('send', (data) => {
    let name;
    for (let i=0; i<userList.length; i++) {
      if (userList[i].sid === socket.id) {
        name = userList[i].name;
        break;
      }
    }
    io.sockets.emit('hasMsg', { user: name, msg: data });
  });
  socket.on('addUser', (data) => {
    userList.push({name: data, sid: socket.id});
    // userList[socket.id] = data;
    io.sockets.emit('user', userList.length);
    let ul = [];
    for (let i=0; i<userList.length; i++) {
      ul.push(userList[i].name);
    }
    io.sockets.emit('userList', ul);
  });
  socket.on('disconnect', () => {
    console.log(socket.handshake.address + '断开了连接');
    for (let i=0; i<userList.length; i++) {
      //
      if (socket.id === userList[i].sid) {
        userList.splice(i, 1);
      }
    }
    io.sockets.emit('user', userList.length);
    let ul = [];
    for (let i=0; i<userList.length; i++) {
      ul.push(userList[i].name);
    }
    io.sockets.emit('userList', ul);
  });
});

// 配置session
app.use(session(CONFIG, app));

// 配置body解析
app.use(bodyParser());

// 登录拦截
app.use(async (ctx, next) => {
  if (ctx.request.url === '/') {
    if (ctx.session.uname !== undefined) {
      // 有权进行聊天
      await next();
    } else {
      ctx.redirect('/login.html');
    }
  } else {
    await next();
  }
});

// 静态资源托管
app.use(serve(__dirname + './../static'));

// 使用koa-router路由
app
  .use(routers.routes())
  .use(routers.allowedMethods());

