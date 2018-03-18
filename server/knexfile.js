const config = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: config.dbUrl,
  },

  production: {
    client: 'pg',
    connection: config.dbUrl,
  },
};
