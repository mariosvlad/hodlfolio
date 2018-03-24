import { Model } from 'objection';
import path from 'path';
import { omit } from 'lodash';

export default class Wallet extends Model {
  static tableName = 'wallet';

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      readonlyId: { type: 'string' },
      label: { type: 'string' },
      lastValue: { type: 'number' },
    },
  };

  static relationMappings = {
    assets: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, '..', 'asset', 'asset.model.js'),
      join: {
        from: 'wallet.id',
        to: 'asset.walletId',
      },
    },
  };

  $formatJson(obj) {
    const json = super.$formatJson(obj);
    return omit(json, ['id', 'readonlyId', 'created_at', 'updated_at']);
  }
}
