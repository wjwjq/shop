const router = require('koa-router')();

const home = require('../api/home/routes');
const users = require('../api/users/routes');
const upload = require('../api/upload/routes');

router.use(home);
router.use('/users', users);
router.use('/upload', upload);

module.exports = router;
