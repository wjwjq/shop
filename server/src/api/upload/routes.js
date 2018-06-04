const router = require('koa-router')();
const fileUpload = require('../../lib/fileUpload');

router
  .get('/', get)
  .post('/', post);

async function get(ctx) {
  await ctx.render('upload', { csrf: ctx.csrf });
}

async function post(ctx, next) {
  try {
    const filepaths = await fileUpload(ctx, next);
    ctx.body = {
      message: '上传成功',
      data: filepaths
    };
  } catch (err) {
    ctx.body = {
      message: '上传失败',
      data: []
    };
  }
}

module.exports = router.routes();
