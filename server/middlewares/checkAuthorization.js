const JwtService = require('./../services/jwtService');
const createHttpError = require('http-errors');
const config = require('../configs/config');

const {
  jwt: { tokenSecret },
} = config;

module.exports = async (req, res, next) => {
  try {
    const authorizationHeaderValue = req.get('Authorization');
    if (authorizationHeaderValue) {
      const [type, credentials] = authorizationHeaderValue.split(' ');
      if (type === 'Bearer') {
        const tokenPayload = await JwtService.verify(credentials, tokenSecret);
        req.tokenPayload = tokenPayload;
        next();
        return;
      }
    }
    res.set(
      'WWW-Authenticate',
      `Bearer realm="Access to the staging site", charset="UTF-8`
    );
    next(createHttpError(401));
  } catch (err) {
    next(createHttpError(401, err?.message));
  }
};
