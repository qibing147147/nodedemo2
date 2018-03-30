const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zqb85382926',
    database: 'test',
    port: 3306
});
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connect succeed');
})
let userAddSql = 'insert into user (username, password) value(?,?)';
let param = ['zqb', '85382926'];
connection.query(userAddSql, param, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('insert success');
})
connection.query('select * from user', (err, res, fileds)=> {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res, fileds);
})
connection.end(err => {
    if (err) {
        console.log(err.toString());
        return;
    }
    console.log('connect end succeed');
})