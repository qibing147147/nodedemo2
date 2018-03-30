var express = require('express');
var app = express();
const path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
let str = '';
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
app.use(express.static(path.join(__dirname, '')))

io.of('/jump').on('connection', function (socket) {
    socket.on('message', function (data) {
        socket.broadcast.emit('message', data);
        console.log(data);
    });
});
// app.get('/padAction', (req, res, next) => {
//     str = req.query.action;
//     console.log(str);
//     res.end('');
// });
server.listen(3000, () => {
    console.log('app is listening at port 3000');
});