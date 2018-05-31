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
    if (Array.isArray(file)) {
      for (let i = 0; i < file.length; i++) {
        saveFile(file[i]);
      }
    } else {
      saveFile(file);
    }
  }

  function saveFile(file) {
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath.replace('public\\', ''));
  }

  ctx.body = {
    message: '上传成功',
    data: filePaths
  };
}

function uid() {
  return Math.random().toString(36).slice(2);
}

module.exports = router.routes();
