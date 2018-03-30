const http = require('http');
const events = require('events');
const UserBean = require('./UserBean');
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    if (request.url !== '/favicon.ico') {
        user = new UserBean();
        user.eventEmit.once('zhuceSuc', (username, password) => {
            response.write('注册成功');
            console.log('username:' + username);
            console.log(`username:${username}`);
            user.login(request, response);
            response.end('')
        })
        user.zhuce(request, response);
    }
}).listen(3000);