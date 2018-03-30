const user = require('./User');
class Teacher extends user {
    constructor(id, name, age, subject) {
        super(id, name, age);
        this.subject = subject;
    }
    teach() {
        console.log(`${this.subject}老师${this.name}讲课！`);
    }
}
module.exports = {Teacher};