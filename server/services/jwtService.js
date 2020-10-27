const util = require('util');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const {
  env: { ACCESS_TOKEN_SECRET = uuidv4(), ACCESS_TOKEN_EXP = '1h' },
} = process;

const sign = util.promisify(jwt.sign);

exports.signAccessToken = payload =>
  sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
