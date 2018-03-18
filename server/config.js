module.exports.port = process.env.PORT || 5000;
module.exports.dbUrl =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/hodlfolio';
