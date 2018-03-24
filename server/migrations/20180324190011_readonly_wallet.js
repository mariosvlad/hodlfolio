exports.up = async function (knex) {
  await knex.schema.table('wallet', (table) => {
    table.string('readonlyId').unique();
    table.string('label');
  });
  await knex('wallet').update({
    readonlyId: knex.raw('substr(??,1,8)', ['id']),
  });
};

exports.down = async function (knex) {
  await knex.schema.table('wallet', (table) => {
    table.dropColumn('readonlyId');
    table.dropColumn('label');
  });
};
