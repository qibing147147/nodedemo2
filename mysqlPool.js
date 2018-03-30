const OptPool = require('./OptPool');
const optPool = new OptPool();
const pool = optPool.getPool();
pool.getConnection((err, conn) => {
    let userAddSql = 'insert into user (username, password) values(?,?)'
    let param = ['aaa', 'aaa'];
    conn.query(userAddSql, param, (err,res) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('insert succeed');
        // conn.release();
    });
    
    conn.query('SELECT * from user where id = ?',1 , (err,res) => {
        if (err) {
            console.log(err.message);
            return;
        }
        for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        conn.release();
    });
    
})