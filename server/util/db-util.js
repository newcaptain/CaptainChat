const mysql = require('mysql');

let pool = mysql.createPool({
  connectionLimit: 30,
  host: 'localhost',
  user: 'root',
  password: '0216',
  database: 'captain_chat'
})


module.exports = {
  query: (sql, values) => new Promise((resolved, reject) => {
    pool.getConnection((err, cnn) => {
      if (err) {
        reject(err);
      } else {
        cnn.query(sql, values, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolved(res);
          }
          cnn.release();
        });
      }
    })
  }),
  getConnection: () => {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0216',
      database: 'captain_chat'
    });
  }
  
}