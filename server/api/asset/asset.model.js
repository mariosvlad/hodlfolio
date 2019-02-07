import { Model } from 'objection';
import path from 'path';
import { omit } from 'lodash';

module.exports = class Asset extends Model {
  static tableName = 'asset';

  static jsonSchema = {
    type: 'object',
    required: ['walletId', 'coin', 'amount'],
    properties: {
      id: { type: 'integer' },
      coin: { type: 'string' },
      walletId: { type: 'string' },
      amount: { type: 'number' },
    },
  };

  static relationMappings = {
    wallet: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, '..', 'wallet/wallet.model.js'),
      join: {
        from: 'asset.walletId',
        to: 'wallet.id',
      },
    },
  };

  $formatJson(obj) {
    const json = super.$formatJson(obj);
    return omit(json, ['id', 'walletId', 'created_at', 'updated_at']);
  }
};
