import UIDGenerator from 'uid-generator';
import Wallet from './wallet.model';

const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);

export async function add(ctx) {
  const id = await uidgen.generate();
  try {
    await Wallet.query().insert({ id });
    ctx.body = { id };
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function get(ctx) {
  const { id } = ctx.params;
  try {
    const dbResult = await Wallet.query()
      .where('id', id)
      .eager('assets');

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
