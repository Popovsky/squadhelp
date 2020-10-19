module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'squadhelp-dev',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {},
  production: {},
};
