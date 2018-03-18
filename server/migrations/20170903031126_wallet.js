exports.up = (knex) => {
  function wallet() {
    return knex.schema.createTable('wallet', (table) => {
      table.string('id').primary();
      table.decimal('lastValue', 20, 3);
      table.timestamps(false, true);
    });
  }

  function asset() {
    return knex.schema.createTable('asset', (table) => {
      table.increments('id').primary();
      table.string('coin');
      table.string('walletId');
      table.decimal('amount', 28, 8);
      table.foreign('walletId').references('wallet.id');
      table.timestamps(false, true);
    });
  }

  return wallet().then(asset);
};

exports.down = (knex) => {
  function wallet() {
    return knex.schema.dropTable('wallet');
  }

  function asset() {
    return knex.schema.dropTable('asset');
  }

  return asset().then(wallet);
};
