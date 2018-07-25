const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '10.1.20.201',
  user: 'root',
  password: 'inteast.com',
  database: 'xfdz_data',
  port: 3306
});
connection.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connect succeed');
});
app.use(bodyParser.json());
app.use('/', express.static(__dirname));
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
  else next();
}); 
app.use(bodyParser.urlencoded({ extended: false }));
//指定静态文件的位置
app.use('/', express.static(__dirname));
app.post('/insertDegree', (req, res, next) => {
  let darr = req.body.arr;
  JSON.parse(darr).forEach(item => {
    let userAddSql = 'insert into maintenance_link (longitude, latitude, elevation) value(?,?,?)';
    let param = [item.lng, item.lat, item.elevation];
    console.log(param);
    
    connection.query(userAddSql, param, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('insert success');
    })
  })
  res.send('123');
});
app.post('/insertLocation', (req, res, next) => {
    let darr = req.body.obj;
    let userAddSql = 'insert into maintenance_link (info, longitude, latitude) value(?,?,?)';
    let param = [darr.add, darr.lng, darr.lat];
    console.log(param);
    connection.query(userAddSql, param, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('insert success');
    })
  res.send('123');
});
app.listen(3000, () => {
  console.log('app is listening at port 3000');
})