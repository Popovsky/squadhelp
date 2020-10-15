'use strict';

const bcrypt = require('bcrypt');
const CONSTANTS = require('./../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Buyer',
          lastName: 'Buyerovich',
          displayName: 'buyer',
          password: await bcrypt.hash('test1234', CONSTANTS.SALT_ROUNDS),
          email: 'customer@gmail.com',
          role: 'customer',
          balance: 1000,
        },
        {
          firstName: 'Creator',
          lastName: 'Creatvich',
          displayName: 'creator',
          password: await bcrypt.hash('test1234', CONSTANTS.SALT_ROUNDS),
          email: 'creator@gmail.com',
          role: 'creator',
          balance: 0,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
