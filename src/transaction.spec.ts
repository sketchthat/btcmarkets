'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Common } from './common';
import { Transaction } from './transaction';

import * as createHmac from './services/authentication';

describe('Transaction', () => {
  let transaction: Transaction;
  let commonStub: SinonStub;
  let hmacStub: SinonStub;

  before(() => {
    transaction = new Transaction('MyApiKey', 'MyApiSecret');

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

  it('should call history without parameters', async () => {
    hmacStub.returns({
      path: '/v2/transaction/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      transactions: [],
    });

    const resp: any = await transaction.history();

    const expectedMockReturn = {
      transactions: [],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/transaction/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          since: undefined,
          sortForward: undefined,
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
        '/v2/transaction/history',
        {
          indexForward: undefined,
          since: undefined,
          sortForward: undefined,
        },
        null,
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

  it('should call history with parameters', async () => {
    hmacStub.returns({
      path: '/v2/transaction/history/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      transactions: [{
        balance: 153200000000,
        amount: 656311000000,
      }],
    });

    const resp: any = await transaction.history('AUD', 565, true, false);

    const expectedMockReturn = {
      transactions: [{
        balance: 1532,
        amount: 6563.11,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/transaction/history/AUD',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: true,
          since: 565,
          sortForward: false,
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
        '/v2/transaction/history/AUD',
        {
          indexForward: true,
          since: 565,
          sortForward: false,
        },
        null,
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

  it('should call history with pagination', async () => {
    hmacStub.returns({
      path: '/v2/transaction/history',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      transactions: [],
      paging: {
        newer: {
          since: '100',
          indexForward: 'true',
          sortForward: 'false',
        },
        older: {},
      },
    });

    const resp: any = await transaction.history();

    const expectedMockReturn = {
      transactions: [],
      paging: {
        newer: {
          since: 100,
          indexForward: true,
          sortForward: false,
        },
        older: {},
      },
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/transaction/history',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          since: undefined,
          sortForward: undefined,
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
        '/v2/transaction/history',
        {
          indexForward: undefined,
          since: undefined,
          sortForward: undefined,
        },
        null,
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
