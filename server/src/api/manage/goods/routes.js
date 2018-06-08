const router = require('koa-router')();

router.get('/:id', get);
router.post('/:id', get);

const goods = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

async function get(ctx) {
  ctx.body = { status: 200, data: { ...goods, id: ctx.params.id } };
}

module.exports = router.routes();
