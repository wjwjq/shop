const config = require('../config');

exports.get = key => {
  return config[key];
}
;
