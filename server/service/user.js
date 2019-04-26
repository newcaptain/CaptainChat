
const db = require('../util/db-util');

module.exports = {
  
  /**
   * 根据姓名获取用户数量
   * @param {用户名} userName 
   */
  async countByName(userName) {
    const sql = 'select COUNT(*) from user where uname = ?';
    let res = await db.query(sql, userName)
    return res[0]['COUNT(*)'];
  },

  /**
   * 根据用户名和密码查询用户
   * @param {用户名} userName 
   * @param {密码} password 
   */
  async selectByNameAndPassword(userName, password) {
    const sql = 'select * from user where uname=? and password=?';
    let res = await db.query(sql, [userName, password]);
    return res;
  },
  
  async insertUser(obj) {
    const sql = 'insert into user(uname, password) value(?, ?)';
    let res = await db.query(sql, [obj.user, obj.password]);
    return res.affectedRows;
  }
}