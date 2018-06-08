const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const home = require('../api/main/home/routes');

const upload = require('../api/commons/upload/routes');

router.use(home);
router.use('/upload', upload);

app.use(router.routes());

module.exports = app;
