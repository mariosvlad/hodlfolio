exports.up = async function(knex) {
  await knex('wallet').update({
    readonlyId: knex.raw('substr(??,1,8)', ['id']),
  });
};

exports.down = function() {};
