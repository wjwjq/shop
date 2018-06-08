const User = require('./model');

exports.get = async id => {
  return id ? User.find({_id: id}) : User.find();
};

exports.create = async ({ data = {} } = {}) => {
  return data;
};
