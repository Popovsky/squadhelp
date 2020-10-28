const config = {
  port: process.env.PORT || 5000,
  jwt: {
    tokenExpiresIn: process.env.ACCESS_TOKEN_EXP,
    tokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};

module.exports = config;
