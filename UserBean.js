const event = require('events');
class UserBean {
    constructor() {
        this.eventEmit = new event.EventEmitter();
    }
    zhuce (req, res) {
        console.log('注册');
        req['username'] = 'aa';
        req['password'] = 'bb';
        this.eventEmit.emit('zhuceSuc', 'aa', 'bb');
    }
    login (req, res) {
        console.log('登录');
        res.write('用户名：' + req['username']);
        res.write('密码：' + req['password']);
        res.write('登录');
    }
}
module.exports = UserBean;