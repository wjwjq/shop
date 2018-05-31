const path = require('path');
const fs = require('fs-extra');
const router = require('koa-router')();

router
  .get('/', get)
  .post('/', post);

async function get(ctx) {
  await ctx.render('upload', { csrf: ctx.csrf });
}

async function post(ctx, next) {
  const tmpdir = path.join('public/upload/', uid());
  await fs.mkdir(tmpdir);
  ctx.body = await saveFile(ctx, next, tmpdir);
}

function saveFile(ctx, next, tmpdir) {
  const filePaths = [];
  const files = ctx.request.body.files || {};
  return new Promise((resolve, reject) => {
    for (let key in files) {
      const file = files[key];
      const filePath = path.join(tmpdir, file.name);
      const reader = fs.createReadStream(file.path);
      const writer = fs.createWriteStream(filePath);
      const result = reader.pipe(writer);
      filePaths.push(filePath.replace('public\\', ''));

      result.on('finish', () => {
        resolve({
          message: '上传成功',
          data: filePaths
        });
      });

      result.on('error', () => {
        resolve({
          message: '上传失败',
          data: null
        });
      });
    }
  });
}

function uid() {
  return Math.random().toString(36).slice(2);
}

module.exports = router.routes();
