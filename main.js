var fs = require("fs");
fs.readFile('./datingTestSet.txt', (err, data) => {
    if (err) {
        return console.error(err)
    }
    console.log(data.toString());    
})
console.log('程序执行结束！');