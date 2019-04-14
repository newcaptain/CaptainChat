const router = require('koa-router')();

const user = require('./user');

router.use('/user', (ctx, next) => {
  console.log('/user');
  next();
},user.routes());

// const mysql = require('mysql');

// const router = new Router();


// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '0216',
//   database: 'captain_chat'
// })

// router.post('/user/login', async (ctx, next) => {

//   let user = ctx.request.body.user;
//   let password = ctx.request.body.password;


//   ctx.set({'Content-Type': 'application/json'});
  
//   connection.connect();
//   let sql = 'select * from user where uname="' + user + '" and password="'+ password +'"';
//   console.log(sql);
//   let rows = await connection.query(sql); 
//   console.log(rows);
//   // function(err, result, fields) {
//   //   console.log(err);
//   //   console.log(result);
//   //   if (result.length > 0) {
//   //     console.log('用户密码正确');
//   //     ctx.response.set('Content-Type', 'application/json');
//   //     ctx.body = JSON.stringify({code: 0});
//   //   } else {
//   //     console.log('用户密码错误');
//   //     console.log(JSON.stringify({code: -1}));
//   //     ctx.response.set('Content-Type', 'application/json');
//   //     ctx.body = JSON.stringify({code: -1});
//   //   }
//   // });

//   // ctx.response.set('Content-Type', 'application/json');
//   // ctx.body = JSON.stringify({code: -1});
// });


// router.post('/user/regist', (ctx, next) => {
//   let user = ctx.request.body.user;
//   let password = ctx.request.body.password;
//   ctx.response.set('Content-Type', 'application/json');
//   ctx.body = 'user: ' + user + '\n'
//     + 'password: ' + password;
// });

module.exports = router;