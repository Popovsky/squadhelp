'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {}
  }
  RefreshToken.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      token: {
        type: DataTypes.TEXT,
        unique: true,
      },
      userAgent: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    }
  );
  return RefreshToken;
};
