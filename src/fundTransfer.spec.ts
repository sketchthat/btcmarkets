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
      path: '/fundtransfer/withdrawCrypto',
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
        '/fundtransfer/withdrawCrypto',
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
        '/fundtransfer/withdrawCrypto',
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

  it('should call withdrawEFT', async () => {
    hmacStub.returns({
      path: '/fundtransfer/withdrawEFT',
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
        '/fundtransfer/withdrawEFT',
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
        '/fundtransfer/withdrawEFT',
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

  it('should call history without parameters', async () => {
    hmacStub.returns({
      path: '/fundtransfer/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      fundTransfers: [{
        amount: 535633000000,
        fee: 534000000,
      }],
    });

    const resp: any = await fundTransfer.history();

    const expectedMockReturn = {
      fundTransfers: [{
        amount: 5356.33,
        fee: 5.34,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          limit: null,
          since: undefined,
        },
        null,
        true,
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/fundtransfer/history',
        {
          indexForward: undefined,
          limit: null,
          since: undefined,
        },
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

  it('should call history with parameters', async () => {
    hmacStub.returns({
      path: '/fundtransfer/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      fundTransfers: [{
        amount: 535633000000,
        fee: 534000000,
      }],
    });

    const resp: any = await fundTransfer.history(5, 565, true);

    const expectedMockReturn = {
      fundTransfers: [{
        amount: 5356.33,
        fee: 5.34,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: true,
          limit: 5,
          since: 565,
        },
        null,
        true,
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/fundtransfer/history',
        {
          indexForward: true,
          limit: 5,
          since: 565,
        },
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

  it('should call history with paging', async () => {
    hmacStub.returns({
      path: '/fundtransfer/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      fundTransfers: [{
        amount: 535633000000,
        fee: 534000000,
      }],
      paging: {
        newer: {
          limit: '5',
          since: '565',
          indexForward: 'true',
        },
        older: {},
      },
    });

    const resp: any = await fundTransfer.history();

    const expectedMockReturn = {
      fundTransfers: [{
        amount: 5356.33,
        fee: 5.34,
      }],
      paging: {
        newer: {
          limit: 5,
          since: 565,
          indexForward: true,
        },
        older: {},
      },
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          limit: null,
          since: undefined,
        },
        null,
        true,
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/fundtransfer/history',
        {
          indexForward: undefined,
          limit: null,
          since: undefined,
        },
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

  it('should call history with invalid limit', async () => {
    hmacStub.returns({
      path: '/fundtransfer/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      fundTransfers: [{
        amount: 535633000000,
        fee: 534000000,
      }],
    });

    const resp: any = await fundTransfer.history(5500, 565, true);

    const expectedMockReturn = {
      fundTransfers: [{
        amount: 5356.33,
        fee: 5.34,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/fundtransfer/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: true,
          limit: 200,
          since: 565,
        },
        null,
        true,
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/fundtransfer/history',
        {
          indexForward: true,
          limit: 200,
          since: 565,
        },
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
