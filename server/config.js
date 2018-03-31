const defaultPort = process.env.NODE_ENV === 'test' ? 5001 : 5002;
module.exports.port = process.env.PORT || defaultPort;
module.exports.dbUrl =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/hodlfolio';
