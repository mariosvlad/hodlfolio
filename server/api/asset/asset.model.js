import { Model } from 'objection';
import path from 'path';
import { omit } from 'lodash';
import * as Big from 'big.js';

module.exports = class Asset extends Model {
  static tableName = 'asset';

  amount() {
    return new Big(this.amount);
  }

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
