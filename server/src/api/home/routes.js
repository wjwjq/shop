const router = require('koa-router')();

router.get('/', get);

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

async function get(ctx) {
  await ctx.render('index', { ...user, csrf: ctx.csrf });
}

module.exports = router.routes();
