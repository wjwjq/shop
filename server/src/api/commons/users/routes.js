const router = require('koa-router')();
const controller = require('./controller');
router
  .get('/:id', get)
  .get('/', get)
  .post('/:id', post)
  .put('/:id', put)
  .delete('/:id', del)
  .delete('/', del)
  .del('/', del)
  .del('/:id', del);

const users = [];

for (let i = 0; i < 46; i++) {
  users.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

async function get(ctx) {
  // const users = await controller.get(ctx.params.id);
  ctx.body = {
    status: 200,
    data: {
      results: users,
      pageSize: 1,
      totalCount: users.length
    },
    csrf: ctx.csrf
  };
}

async function post(ctx) {
  const data = ctx.request.body;
  const user = await controller.create({ data });

  ctx.body = { status: 200, data: user, csrf: ctx.csrf };
}

async function put(ctx) {
  console.log(ctx.method);
  const data = ctx.request.body;
  console.log('pramas', ctx.pramas);
  console.log('data', data);
  // const user = await controller.create({ data });
  ctx.body = { status: 200, data: data, csrf: ctx.csrf };
}

async function del(ctx) {
  const data = ctx.request.body;
  console.log(ctx.method);
  console.log('query', ctx.query);
  console.log('pramas', ctx.pramas);
  console.log('data', data);
  // const data =  JSON.parse(ctx.request.query.id);

  // ctx.body = { status: 200, data: JSON.parse(ctx.request.query.id), csrf: ctx.csrf };
  ctx.body = 111;
}

module.exports = router.routes();
