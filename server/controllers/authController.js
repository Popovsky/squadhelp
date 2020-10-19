const createHttpError = require('http-errors');
const { User } = require('./../models');
const jwtService = require('./../services/jwtService');

exports.signInUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const userInstance = await User.findOne({
      where: { email },
    });
    if (userInstance && (await userInstance.comparePassword(password))) {
      return res.end();
    }

    next(createHttpError(401, 'Incorrect password or email'));
  } catch (err) {
    next(err);
  }
};
exports.signUpUser = async (req, res, next) => {};
exports.refreshAuth = async (req, res, next) => {};
