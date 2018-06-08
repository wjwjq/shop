const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const router = require('koa-router')();

const app = new Koa();
const user = require('../api/commons/users/routes');
const goods = require('../api/manage/goods/routes');

router.use('/api/user', user);
router.use('/api/goods', goods);

router.get('*', async ctx => {
  await send(ctx, ctx.path, { root: path.resolve('public/manage/index.html') });
});

app.use(router.routes());

module.exports = app;
