const connect = require('connect');
const app = connect();

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}
app.use(logger);
app.listen(3000);