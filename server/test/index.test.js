// require supertest
const request = require('supertest');
// require the Koa server
const server = require('../index');
// close the server after each test
afterEach(() => {
  server.close();
});
describe('routes: index', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/api/data/coins');
    expect(response.status).toEqual(200);
  });

  test('create a new wallet', async () => {
    const response = await request(server).post('/api/wallets/');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
    const walletId = response.body.id;

    const getWalletResponse = await request(server).get(`/api/wallets/${walletId}`);
    expect(getWalletResponse.status).toEqual(200);
    expect(getWalletResponse.body).toHaveProperty('assets');

    const coinData = {
      walletId,
      coin: 'ETH',
      amount: 1.0003,
    };
    const addAssetResponse = await request(server)
      .post('/api/assets/')
      .send(coinData);

    expect(addAssetResponse.status).toEqual(200);
    expect(addAssetResponse.body.coin).toEqual(coinData.coin);
    expect(addAssetResponse.body.amount).toEqual(coinData.amount);
  });

  test('should get ethereum 180 days history', async () => {
    const response = await request(server).get('/api/data/history/ethereum/180day');

    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveLength(0);
  });
});
