const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', '/config/no-sql-db.js');
const config = require(configPath)[env];

mongoose.connect(
  `mongodb://${config.host}:27017/${config.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      process.exit(1);
    }
  }
);

mongoose.set('debug', true);

module.exports = mongoose;
