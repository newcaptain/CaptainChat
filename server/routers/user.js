const router = require('koa-router')();

const userController = require('./../controllers/user');

const routers = router
  .post('/user/login', userController.login)
  .post('/user/register', userController.register);

  module.exports = routers;