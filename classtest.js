const express = require('express');
const Teacher = require('./models/Teacher');
const app = express();
app.get('/', (req, res, next) => {
    let teacher = new Teacher.Teacher(1, '张三', 20, '语文');
    teacher.enter();
    teacher.teach();
    res.end('');
})
app.listen(3000, () => {
    console.log('app is listening at port 3000');
})