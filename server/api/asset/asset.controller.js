import Asset from './asset.model';

export async function add(ctx) {
  const asset = ctx.request.body;
  try {
    ctx.body = await Asset.query().insert({
      walletId: asset.walletId,
      coin: asset.coin,
      amount: asset.amount,
    });
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function update(ctx) {
  const asset = ctx.request.body;
  try {
    ctx.body = await Asset.query()
      .patch({ amount: asset.amount })
      .where({
        walletId: asset.walletId,
        coin: asset.coin,
      })
      .first()
      .returning('*');
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function remove(ctx) {
  const asset = ctx.request.body;
  try {
    ctx.body = await Asset.query()
      .delete()
      .where({
        walletId: asset.walletId,
        coin: asset.coin,
      });
  } catch (err) {
    ctx.throw(400, err);
  }
}
