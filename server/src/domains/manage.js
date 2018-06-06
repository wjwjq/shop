const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const router = require('koa-router')();
// koa app

const app = new Koa();

router.get('*', sendIndex);

async function sendIndex(ctx) {
  await send(ctx, ctx.path, { root: path.resolve('public/test/index.html') });
}

app.use(router.routes());

module.exports = app;
