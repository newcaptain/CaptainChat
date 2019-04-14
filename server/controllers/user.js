module.exports = {
  async login(ctx) {
    console.log('userController');
    ctx.body = 'userCotroller';
  },

  async register(ctx) {
    console.log('registerController');
  }
}