const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017';
const express = require('express');
const url = require('url');
const app = express();
var bodyParser = require('body-parser');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
app.use(bodyParser.json());
let insertData = (db, data) => {
    return new Promise((resolve, reject) => {
        const mydb = db.db('zqb');
        mydb.collection('test').insert(data, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}
app.post('/addUser', (req, res) => {

    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        //执行插入数据操作，调用自定义方法
        insertData(db, req.body).then(result => {
            //显示结果
            console.log(result);
            //关闭数据库
            db.close();
        });
    });
})
app.listen(3000, () => {
    console.log('app is listening at port 3000');
});