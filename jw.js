const express = require('express');
const url = require('url');
const app = express();
let str = '';
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
app.get('/padAction', (req,res,next) => {
    str = req.query.action;
    console.log(str);
    res.end('');
});
app.get('/webAction', (req, res, next) => {
    res.send(str);
    str = '';
})
app.listen(3000, () => {
    console.log('app is listening at port 3000');
});