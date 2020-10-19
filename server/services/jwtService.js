const util = require('util');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const {
  env: {
    ACCESS_TOKEN_SECRET = uuidv4(),
    ACCESS_TOKEN_EXP = '1h',
    REFRESH_TOKEN_EXP = '20 days',
    REFRESH_TOKEN_SECRET = uuidv4(),
  },
} = process;

const sign = util.promisify(jwt.sign);

const signAccessToken = payload =>
  sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });

const signRefreshToken = payload =>
  sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  });

const signTokenPair = async (accessTokenPayload, refreshTokenPayload = {}) => {
  return {
    accessToken: await signAccessToken(accessTokenPayload),
    refreshToken: await signRefreshToken(refreshTokenPayload),
  };
};

module.exports = {
  signTokenPair,
};
