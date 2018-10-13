'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Account } from './account';
import { Common } from './common';
import * as createHmac from './services/authentication';

describe('Account', () => {
  let account: Account;
  let commonStub: SinonStub;
  let hmacStub: SinonStub;

  before(() => {
    account = new Account('MyApiKey', 'MyApiSecret');

    commonStub = stub(Common.prototype, 'request');
    hmacStub = stub(createHmac, 'createHmac');
  });

  beforeEach(() => {
    commonStub.reset();
    hmacStub.reset();
  });

  after(() => {
    commonStub.restore();
    hmacStub.restore();
  });

  it('should call balance', async () => {
    hmacStub.returns({
      path: '/account/balance',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns([
      {
        balance: 15000000000,
        pendingFunds: 9955000000,
      },
    ]);

    const resp: any = await account.balance();

    const expectedMockReturn = [
      {
        balance: 150,
        pendingFunds: 99.55,
      },
    ];

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/account/balance',
        'MyApiKey',
        'MyApiSecret',
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/account/balance',
        null,
        null,
        {
          apiKey: 'MyApiKey',
          timestamp: 1541581502000,
          signature: 'YWJjMTIz',
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call trading fees', async () => {
    hmacStub.returns({
      path: '/account/BTC/AUD/tradingfee',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      tradingFeeRate: 74999999,
      volume30Day: 1245211000000,
    });

    const resp: any = await account.tradingFees('BTC', 'AUD');

    const expectedMockReturn = {
      tradingFeeRate: 0.74999999,
      volume30Day: 12452.11,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/account/BTC/AUD/tradingfee',
        'MyApiKey',
        'MyApiSecret',
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/account/BTC/AUD/tradingfee',
        null,
        null,
        {
          apiKey: 'MyApiKey',
          timestamp: 1541581502000,
          signature: 'YWJjMTIz',
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });
});
