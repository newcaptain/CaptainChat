
const userService = require('../service/user');

module.exports = {
  async login(ctx) {
    let queryRes = await userService.selectByNameAndPassword(ctx.request.body.user, ctx.request.body.password);
    if (queryRes.length === 0) {
      // 用户未找到
      ctx.body = {code:-1, msg: '用户名或密码不正确'};
    } else {
      ctx.session.isLogin = true;
      ctx.body = {code: 0};
    }
  },

  async register(ctx) {
    let count = await userService.countByName(ctx.request.body.user);
    if (count > 0) {
      ctx.body = {code: -1, msg: '该用户已存在'};
    } else {
      let queryRes = await userService.insertUser(ctx.request.body);
      if (queryRes === 1) {
        // 新增用户成功
        ctx.body = {code: 0};
      } else {
        ctx.body = {code: -1, msg: '注册用户失败'};
      }
    }
  }
}