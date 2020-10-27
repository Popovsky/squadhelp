const createHttpError = require('http-errors');
const { User, RefreshToken } = require('./../models');
const AuthService = require('./../services/authService');

exports.signInUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const userInstance = await User.findOne({
      where: { email },
    });

    if (userInstance && (await userInstance.comparePassword(password))) {
      const data = await AuthService.createSession(userInstance);
      return res.send({
        data,
      });
    }
    next(createHttpError(401, 'Incorrect password or email'));
  } catch (err) {
    next(err);
  }
};
exports.signUpUser = async (req, res, next) => {
  try {
    const { body } = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      return res.send({
        data,
      });
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};

exports.refreshAuth = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (refreshTokenInstance && refreshTokenInstance.isUnexpired()) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      return res.send({
        data,
      });
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};
