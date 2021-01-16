import UIDGenerator from 'uid-generator';
import Wallet from './wallet.model';

const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);

export async function add(ctx) {
  const id = await uidgen.generate();
  const readonlyId = id.slice(0, 9);
  try {
    await Wallet.query().insert({ id, readonlyId });
    ctx.body = { id };
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function get(ctx) {
  const { id } = ctx.params;
  try {
    let dbResult;
    if (id.length > 8) {
      dbResult = await Wallet.query()
        .where('id', id)
        .withGraphFetched('assets');
    } else {
      dbResult = await Wallet.query()
        .where('readonlyId', id)
        .withGraphFetched('assets')
        .omit(['id']);
    }

    if (dbResult.length === 0) {
      ctx.throw(404);
    } else {
      [ctx.body] = dbResult;
    }
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function setLastSeen(ctx) {
  const asset = ctx.request.body;
  try {
    ctx.body = await Wallet.query()
      .patch({ lastValue: asset.value })
      .where({
        walletId: asset.walletId,
      });
  } catch (err) {
    ctx.throw(400, err);
  }
}
