const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const home = require('../api/home/routes');
const users = require('../api/users/routes');
const upload = require('../api/upload/routes');

router.use(home);
router.use('/users', users);
router.use('/upload', upload);

app.use(router.routes());

module.exports = app;
