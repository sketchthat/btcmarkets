'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Common } from './common';
import { FundTransfer } from './fundTransfer';
import * as createHmac from './services/authentication';

describe('FundTransfer', () => {
  let fundTransfer: FundTransfer;
  let commonStub: SinonStub;
  let hmacStub: SinonStub;

  before(() => {
    fundTransfer = new FundTransfer('MyApiKey', 'MyApiSecret');

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

  it('should call withdrawCrypto', async () => {
    hmacStub.returns({
      path: '/fundtransfer/withdrawcrypto',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      body: {
        balance: 16434000000,
        address: 'x123abc',
        currency: 'BTC',
      },
    });

    commonStub.returns({
      response: true,
    });

    const resp: any = await fundTransfer.withdrawCrypto(164.34, 'x123abc', 'BTC');

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/withdrawcrypto',
        'MyApiKey',
        'MyApiSecret',
        null,
        {
          address: 'x123abc',
          amount: 16434000000,
          currency: 'BTC',
        },
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'POST',
        '/fundtransfer/withdrawcrypto',
        null,
        {
          address: 'x123abc',
          amount: 16434000000,
          currency: 'BTC',
        },
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

  it('should call withdraweft', async () => {
    hmacStub.returns({
      path: '/fundtransfer/withdraweft',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      body: {
        accountName: 'John Doe',
        accountNumber: '11223344',
        amount: 5055000000,
        bankName: 'ANZ',
        bsbNumber: '011333',
        currency: 'AUD',
      },
    });

    commonStub.returns({
      response: true,
    });

    const resp: any = await fundTransfer.withdrawETF('John Doe', 'ANZ', '011333', '11223344', 'AUD', 50.55);

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/withdraweft',
        'MyApiKey',
        'MyApiSecret',
        null,
        {
          accountName: 'John Doe',
          accountNumber: '11223344',
          amount: 5055000000,
          bankName: 'ANZ',
          bsbNumber: '011333',
          currency: 'AUD',
        },
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'POST',
        '/fundtransfer/withdraweft',
        null,
        {
          accountName: 'John Doe',
          accountNumber: '11223344',
          amount: 5055000000,
          bankName: 'ANZ',
          bsbNumber: '011333',
          currency: 'AUD',
        },
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
