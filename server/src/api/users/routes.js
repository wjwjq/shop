const router = require('koa-router')();
const controller = require('./controller');

router
  .get('/', get)
  .post('/', post)
  .put('/:id', put)
  .del('/:id', del);

async function get(ctx) {
  const users = await controller.get();
  await ctx.render('users', { users, csrf: ctx.csrf });
}

async function post(ctx) {
  const data = ctx.request.body;

  const user = await controller.create({ data });

  ctx.body = user;
}

async function put(ctx) {
  const data = ctx.request.body;

  const user = await controller.create({ data });

  ctx.body = user;
}

async function del(ctx) {
  const data = ctx.request.body;

  const user = await controller.create({ data });

  ctx.body = user;
}

module.exports = router.routes();
