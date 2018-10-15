'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { BTCMarkets } from './index';
import * as createHmac from './services/authentication';

import * as rp from 'request-promise';

describe('Index', () => {
  let rpStub: SinonStub;
  let hmacStub: SinonStub;

  before(() => {
    rpStub = stub(rp, 'Request');
    hmacStub = stub(createHmac, 'createHmac');
  });

  beforeEach(() => {
    rpStub.reset();
    hmacStub.reset();
  });

  after(() => {
    rpStub.restore();
    hmacStub.restore();
  });

  it('should call account/balance', async () => {
    hmacStub.returns({
      path: '/account/balance',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    rpStub.resolves([{
      balance: 15000000000,
      pendingFunds: 9955000000,
    }]);

    const btcm = new BTCMarkets('MyApiKey', 'MySecretKey');

    const resp: any = await btcm.account().balance();

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/account/balance',
          json: true,
          method: 'GET',
          qs: null,
          body: null,
          headers: {
            apiKey: 'MyApiKey',
            timestamp: 1541581502000,
            signature: 'YWJjMTIz',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);

    const expectedResponse = [{
      balance: 150,
      pendingFunds: 99.55,
    }];

    assert.deepEqual(resp, expectedResponse);

    assert.strictEqual(hmacStub.callCount, 1);
  });

  it('should call fundTransfer/withdrawCrypto', async () => {
    hmacStub.returns({
      path: '/fundtransfer/withdrawCrypto',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    rpStub.resolves({ response: true });

    const btcm = new BTCMarkets('MyApiKey', 'MySecretKey');

    const resp: any = await btcm.fundTransfer().withdrawCrypto(1.55, 'x12abc', 'BTC');

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/fundtransfer/withdrawCrypto',
          json: true,
          method: 'POST',
          qs: null,
          body: {
            amount: 155000000,
            address: 'x12abc',
            currency: 'BTC',
          },
          headers: {
            apiKey: 'MyApiKey',
            timestamp: 1541581502000,
            signature: 'YWJjMTIz',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);

    const expectedResponse = { response: true };

    assert.deepEqual(resp, expectedResponse);

    assert.strictEqual(hmacStub.callCount, 1);
  });

  it('should call market/active', async () => {
    rpStub.resolves({ response: true });

    const btcm = new BTCMarkets('MyApiKey', 'MySecretKey');

    const resp: any = await btcm.market().active();

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/v2/market/active',
          json: true,
          method: 'GET',
          qs: null,
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.strictEqual(hmacStub.callCount, 0);

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);

    const expectedResponse = { response: true };

    assert.deepEqual(resp, expectedResponse);
  });

  it('should call trading/create', async () => {
    hmacStub.returns({
      path: '/order/create',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      body: {
        clientRequestId: 'abc123',
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        price: 850043000000,
        volume: 155000000,
      },
    });

    rpStub.resolves({ response: true });

    const btcm = new BTCMarkets('MyApiKey', 'MySecretKey');

    const resp: any = await btcm.trading().create('BTC', 'AUD', 8500.43, 1.55, 'Ask', 'Limit', 'abc123');

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/order/create',
          json: true,
          method: 'POST',
          qs: null,
          body: {
            clientRequestId: 'abc123',
            currency: 'AUD',
            instrument: 'BTC',
            orderSide: 'Ask',
            ordertype: 'Limit',
            price: 850043000000,
            volume: 155000000,
          },
          headers: {
            apiKey: 'MyApiKey',
            timestamp: 1541581502000,
            signature: 'YWJjMTIz',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);

    const expectedResponse = { response: true };

    assert.deepEqual(resp, expectedResponse);

    assert.strictEqual(hmacStub.callCount, 1);
  });

  it('should call transaction/history', async () => {
    hmacStub.returns({
      path: '/v2/transaction/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    rpStub.resolves({ transactions: [] });

    const btcm = new BTCMarkets('MyApiKey', 'MySecretKey');

    const resp: any = await btcm.transaction().history();

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/v2/transaction/history',
          json: true,
          method: 'GET',
          qs: null,
          body: null,
          headers: {
            apiKey: 'MyApiKey',
            timestamp: 1541581502000,
            signature: 'YWJjMTIz',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);

    const expectedResponse = { transactions: [] };

    assert.deepEqual(resp, expectedResponse);

    assert.strictEqual(hmacStub.callCount, 1);
  });
});
