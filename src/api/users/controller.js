const User = require('./model');

exports.get = async () => {
  return User.find();
};

exports.create = async ({ data = {} } = {}) => {
  return User.create(data);
}
;
