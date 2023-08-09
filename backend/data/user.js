const { hash } = require('bcryptjs');

const { NotFoundError } = require('../util/errors');

let User = require("../models/users.model");

async function add(data) {
  const hashedPw = await hash(data.password, 12);
  
  const newUser = new User({...data, password: hashedPw});
  const userResult = await newUser.save();
  return { id: userResult.id, email: userResult.email };
}

async function get(email) {
  const users = await User.find();
  if (!users || users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }
  return user;
}

exports.add = add;
exports.get = get;
