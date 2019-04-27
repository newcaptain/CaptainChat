const router = require('koa-router')();

const userController = require('./../controllers/user');

const routers = router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .get('/name', userController.name);

  module.exports = routers;