const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const views = require('koa-views');
const serve = require('koa-static');

const router = require('./src/router');
const database = require('./src/database');
const responseTime = require('koa-response-time');

const app = new Koa();

// 错误处理
async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
};

async function setCookies(ctx, next) {
  await next();
  ctx.cookies.set('x-csrf-token', ctx.csrf);
}

app.keys = ['session key'];

app.use(responseTime());

app.use(logger());
app.use(session(app));
app.use(koaBody({ multipart: true }));
// csrf 需要 session
app.use(setCookies);
// app.use(new CSRF());

app.use(errorHandler);
app.use(serve(path.join(__dirname, './public')));
app.use(views(path.join(__dirname, 'src/views'), { extension: 'ejs' }));
app.use(router.routes());
app.use(ctx => { ctx.type = 'json'; });

app.on('error', err => {
  console.error('server error', err);
});

async function startUp() {
  try {
    await database.connect();
    console.log('Connect to database');
    await app.listen(3000);
    console.log('Connected on port 3000');
  } catch (error) {
    console.log('Something went wrong');
  }
}
startUp();
