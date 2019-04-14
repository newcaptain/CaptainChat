const router = require('koa-router')();

const userController = require('./../controllers/user');

const routers = router
  .post('/login', userController.login)
  .post('/register', userController.register);

  module.exports = routers;