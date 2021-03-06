const express = require('express');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const users = require('./user');
app.use(bodyParser.json());
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
app.use('/users', users);
app.get('/index', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    let pagenumber = req.query.pagenumber ? req.query.pagenumber : 1;
    superagent.get('https://cnodejs.org/?tab=all&page=' + pagenumber).charset('utf-8')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            let $ = cheerio.load(sres.text);
            let items = [];
            $('#topic_list .cell').each(function (idx, element) {
                let topicTitle = $(element).find('.topic_title');
                let userAvatar = $(element).find('.user_avatar').find('img');
                let lastActiveTime = $(element).find('.last_active_time');
                items.push({
                    title: topicTitle.attr('title'),
                    href: topicTitle.attr('href'),
                    author: userAvatar.attr('title'),
                    activeTime: lastActiveTime.html()
                });
            });
            // fs.writeFile('./test.txt', JSON.stringify(items), { flag: 'a', encoding: 'utf-8', mode: '0666' }, function (err) {
            //     if (err) {
            //         console.log("文件写入失败")
            //     } else {
            //         console.log("文件写入成功");

            //     }

            // }) 
            res.send(items);
        });
});
app.get('/index/getPageNumber', (req, res, next) => {
    superagent.get('https://cnodejs.org/').charset('gbk').end((err, sres) => {
        if (err) {
            return next(err);
        }
        let $ = cheerio.load(sres.text);
        let allPageNumber = $('.pagination ul li:last-child a').attr('href').split('=')[2];
        res.send(allPageNumber);
    })
})
app.get('/getVideo', (req, res, next) => {
    var mp4 = '1.mp4';
    var stat = fs.statSync(mp4);
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    })

    var readableStream = fs.createReadStream(mp4);
    readableStream.pipe(res);
})
app.post('/index/proxy', (req, res, next) => {
    var url = req.body.url;
    console.log(url);
    req.pipe(request(url)).pipe(res);
})
app.post('/index/postText', (req, res, next) => {
    res.send(req.body);
})
app.get('/index/:url', (req, res, next) => {
    var url = `http://localhost:3000/${req.params.url}`;
    console.log(url);
    req.pipe(request(url)).pipe(res);
})
app.get('/axiosTest', (req, res, next) => {
    let id = req.query.id;
    res.send(id);
})
app.post('/insertDegree', (req, res, next) => {
    let darr = req.body.arr;
    console.log(darr);
    
    res.send('123');
})
app.listen(3000, () => {
    console.log('app is listening at port 3000');
})