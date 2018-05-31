const path = require('path');
const fs = require('fs-extra');
const router = require('koa-router')();

router
  .get('/', get)
  .post('/', post);

async function get(ctx) {
  await ctx.render('upload', { csrf: ctx.csrf });
}

async function post(ctx) {
  const tmpdir = path.join('public/upload/', uid());
  // make the temporary directory
  await fs.mkdir(tmpdir);
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath.replace('public\\', ''));
    writer.on('finish', () => {
      console.log(2);
    });
  }

  ctx.body = {
    message: '上传成功',
    data: filePaths
  };
  console.log(1);
}

function uid() {
  return Math.random().toString(36).slice(2);
}

module.exports = router.routes();
