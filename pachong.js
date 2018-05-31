const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

async function run() {
  for (let i = 0; i < 60; i++) {
    await getImage(i + 1);
  }
}


function downloadPic(src, dest) {
  return new Promise((resolve, reject) => {
    request(src).pipe(fs.createWriteStream(dest)).on('error', () => {
      console.log('save error');
      reject();
    }).on('close', function () {
      console.log('pic saved!')
      resolve();
    })
  })
}

function getImage(page) {
  return new Promise(async (resolve, reject) => {
    superagent.get(`https://cnodejs.org/?tab=all&page=${page}`).charset('utf-8')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        let $ = cheerio.load(sres.text);
        $('#topic_list .cell img').each(async (idx, element) => {
          let src = element.attribs.src;
          if (src.indexOf('http') < 0) {
            src = `https:${src}`
          }
          let picsrc = src.split('?')[0].split('/');
          picsrc = `./imgs/${picsrc[picsrc.length - 1]}.jpg`;
          await downloadPic(src, picsrc);
        });
        resolve();
      });
  })
}

run();