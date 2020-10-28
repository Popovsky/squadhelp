const _ = require('lodash');
const { Sequelize, User, RefreshToken } = require('./../models');
const JwtService = require('./jwtService');
const { DEVICES_PER_USER_LIMIT, REFRESH_TOKEN_EXP } = require('../constants');
const { v4: uuidV4 } = require('uuid');
const config = require('../config/app');

const {
  jwt: { tokenExpiresIn, tokenSecret },
} = config;

exports.createSession = async userInstance => {
  const { accessToken, refreshToken } = await createTokenPair(userInstance);

  if ((await userInstance.countRefreshTokens()) >= DEVICES_PER_USER_LIMIT) {
    const [
      oldestUserRefreshTokenInstance,
    ] = await userInstance.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldestUserRefreshTokenInstance.update(refreshToken);
  } else {
    await userInstance.createRefreshToken(refreshToken);
  }
  return {
    user: prepareUser(userInstance),
    tokenPair: {
      accessToken,
      refreshToken: refreshToken.token,
    },
  };
};

exports.refreshSession = async refreshTokenInstance => {
  const userInstance = await refreshTokenInstance.getUser();
  if (userInstance) {
    const { accessToken, refreshToken } = await createTokenPair(userInstance);
    await refreshTokenInstance.update(refreshToken);

    return {
      user: prepareUser(userInstance),
      tokenPair: {
        accessToken,
        refreshToken: refreshToken.token,
      },
    };
  }
};

function prepareUser(userInstance) {
  const userDataValues = userInstance.get();
  return _.omit(userDataValues, ['password']);
}

async function createTokenPair(userInstance) {
  return {
    accessToken: await JwtService.sign(
      {
        userId: userInstance.get('id'),
        userRole: userInstance.get('role'),
      },
      tokenSecret,
      {
        expiresIn: tokenExpiresIn,
      }
    ),
    refreshToken: {
      token: uuidV4(),
      expiredIn: Sequelize.literal(
        `CURRENT_TIMESTAMP + '${REFRESH_TOKEN_EXP}'::interval`
      ),
    },
  };
}
