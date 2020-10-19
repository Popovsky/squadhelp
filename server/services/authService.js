const _ = require('lodash');
const JWTService = require('./jwtService');
const { DEVICES_PER_USER_LIMIT } = require('../constants');

exports.createSession = async userInstance => {
  const { accessToken, refreshToken } = await JWTService.signTokenPair({
    id: userInstance.getDataValue('id'),
    role: userInstance.getDataValue('role'),
  });

  if ((await userInstance.countRefreshTokens()) >= DEVICES_PER_USER_LIMIT) {
    const [
      oldestUserRefreshTokenInstance,
    ] = await userInstance.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldestUserRefreshTokenInstance.update({
      token: refreshToken,
    });
  } else {
    await userInstance.createRefreshToken({
      token: refreshToken,
    });
  }
  return {
    user: prepareUser(userInstance),
    tokenPair: {
      accessToken,
      refreshToken,
    },
  };
};

exports.refreshSession = async refreshTokenInstance => {
  const userInstance = await refreshTokenInstance.getUser();
  if (userInstance) {
    const { accessToken, refreshToken } = await JWTService.signTokenPair({
      id: userInstance.getDataValue('id'),
      role: userInstance.getDataValue('role'),
    });

    await refreshTokenInstance.update({
      token: refreshToken,
    });
    return {
      user: prepareUser(userInstance),
      tokenPair: {
        accessToken,
        refreshToken,
      },
    };
  }
};

function prepareUser(userInstance) {
  const userDataValues = userInstance.get();
  return _.omit(userDataValues, ['password']);
}
