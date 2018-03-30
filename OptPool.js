const mysql = require('mysql');
class OptPool {
    constructor () {
        this.flag = true;
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'zqb85382926',
            database: 'test',
            port: '3306'
        });
    }
    getPool() {
        if (this.flag) {
            this.pool.on('connection', connection => {
                connection.query('SET SESSION auto_increment_increment');
                this.flag = false;
            })
        }
        return this.pool;
    }
}
module.exports = OptPool;