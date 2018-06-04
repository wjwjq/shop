const path = require('path');
const fs = require('fs-extra');

/**
 * 文件上传 支持多文件上传 并返回文件保存路径
 * 默认上传路径 public/upload
 *
 * @param {Object} ctx
 * @param {Function} next
 * @param {String} savedPath 保存文件的路径
 * @returns
 *  Promise [filepaths]
 */
async function fileUpload(ctx, next, savedPath = '') {
  try {
    if (!fs.existsSync(path.join(`public`))) {
      await fs.mkdir(path.join(`public`));
    }

    if (!fs.existsSync(path.join(`public/upload`))) {
      await fs.mkdir(path.join(`public/upload`));
    }

    const tmpdir = path.join(`public/upload/${savedPath}`, uid());
    await fs.mkdir(tmpdir);

    const filePathPromises = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
      if (Array.isArray(files[key])) {
        for (let i = 0; i < files[key].length; i++) {
          filePathPromises.push(saveSingleFile(files[key][i], tmpdir));
        }
      } else {
        filePathPromises.push(saveSingleFile(files[key], tmpdir));
      }
    }

    return Promise.all(filePathPromises);
  } catch (err) {
    console.error('fileUpload error: ', err);
    return Promise.reject(err);
  }
};

/**
 * 单一文件保存
 *
 * @param {FileObject} file 文件对象
 * @param {String} tmpdir 临时存放文件夹名
 * @returns
 *  Promise filePath 保存后的文件存储路径
 */
function saveSingleFile(file, tmpdir) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    const result = reader.pipe(writer);
    result.on('finish', () => {
      resolve(filePath.replace('public\\', ''));
    });

    result.on('error', error => {
      console.error(`${file.name} is fail to saved. Due to ${error}`);
      reject(error);
    });
  });
}

function uid() {
  return Math.random().toString(36).slice(2);
}

module.exports = fileUpload;
