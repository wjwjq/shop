const path = require('path');

const Koa = require('koa');
const compose = require('koa-compose');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const views = require('koa-views');
const serve = require('koa-static');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');

const database = require('./database');

const app = new Koa();
const wwwSubdomain = composer(require('./domains'));
const manageSubdomain = composer(require('./domains/manage'));

app.keys = ['session key'];

app.use(compress({
  filter: function (contentType) {
    return true;
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(responseTime());

app.use(logger());
app.use(session(app));
app.use(koaBody({ multipart: true }));
// app.use(setCookies);
// csrf 需要 session
app.use(new CSRF());
app.use(errorHandler);
app.use(serve(path.join(__dirname, '../public')));
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));

app.use(vhost);

app.use(ctx => { ctx.type = 'json'; ctx.compress = true; });

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

function composer(app) {
  const middleware = app instanceof Koa ? app.middleware : app;
  return compose(middleware);
}

async function vhost(ctx, next) {
  console.log(`Loading from domain: ${ctx.hostname} `);
  if (ctx.hostname === 'manage.shop.com') {
    return await manageSubdomain.apply(this, [ctx, next]);
  } else {
    return await wwwSubdomain.apply(this, [ctx, next]);
  }
}
