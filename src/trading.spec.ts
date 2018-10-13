'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Common } from './common';
import { Trading } from './trading';

import * as createHmac from './services/authentication';

describe('Trading', () => {
  let trading: Trading;
  let commonStub: SinonStub;
  let hmacStub: SinonStub;

  before(() => {
    trading = new Trading('MyApiKey', 'MyApiSecret');

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

  it('should call create', async () => {
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

    commonStub.returns({
      response: true,
    });

    const resp: any = await trading.create('BTC', 'AUD', 8500.43, 1.55, 'Ask', 'Limit', 'abc123');

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/order/create',
        'MyApiKey',
        'MyApiSecret',
        null,
        {
          clientRequestId: 'abc123',
          currency: 'AUD',
          instrument: 'BTC',
          orderSide: 'Ask',
          ordertype: 'Limit',
          price: 850043000000,
          volume: 155000000,
        },
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'POST',
        '/order/create',
        null,
        {
          clientRequestId: 'abc123',
          currency: 'AUD',
          instrument: 'BTC',
          orderSide: 'Ask',
          ordertype: 'Limit',
          price: 850043000000,
          volume: 155000000,
        },
        {
          apiKey: 'MyApiKey',
          signature: 'YWJjMTIz',
          timestamp: 1541581502000,
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });
});
