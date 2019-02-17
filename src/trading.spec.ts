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

  it('should call create for stop limit order', async () => {
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
        ordertype: 'Stop Limit',
        price: 850043000000,
        volume: 155000000,
        triggerPrice: 830015000000,
      },
    });

    commonStub.returns({
      response: true,
    });

    const resp: any = await trading.create('BTC', 'AUD', 8500.43, 1.55, 'Ask', 'Stop Limit', 'abc123', 8300.15);

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
          ordertype: 'Stop Limit',
          price: 850043000000,
          volume: 155000000,
          triggerPrice: 830015000000,
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
          ordertype: 'Stop Limit',
          price: 850043000000,
          volume: 155000000,
          triggerPrice: 830015000000,
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

  it('should call cancel', async () => {
    hmacStub.returns({
      path: '/order/cancel',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      body: {
        orderIds: [1122, 3344],
      },
    });

    commonStub.returns({
      response: true,
    });

    const resp: any = await trading.cancel([1122, 3344]);

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/order/cancel',
        'MyApiKey',
        'MyApiSecret',
        null,
        {
          orderIds: [1122, 3344],
        },
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'POST',
        '/order/cancel',
        null,
        {
          orderIds: [1122, 3344],
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

  it('should call history without parameters', async () => {
    hmacStub.returns({
      path: '/v2/order/history/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 1000000000,
        volume: 100000000,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 2600000000,
          volume: 100000000,
          side: 'Ask',
          fee: 22099974,
          orderId: 701335,
        }],
      }],
    });

    const resp: any = await trading.history('BTC', 'AUD');

    const expectedMockReturn = {
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 10,
        volume: 1,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 26,
          volume: 1,
          side: 'Ask',
          fee: 0.22099974,
          orderId: 701335,
        }],
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/history/BTC/AUD',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          limit: undefined,
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
        '/v2/order/history/BTC/AUD',
        {
          indexForward: undefined,
          limit: undefined,
          since: undefined,
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
      path: '/v2/order/history/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      qs: {
        limit: 5,
        since: 565,
        indexForward: false,
      },
    });

    commonStub.returns({
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 1000000000,
        volume: 100000000,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 2600000000,
          volume: 100000000,
          side: 'Ask',
          fee: 22099974,
          orderId: 701335,
        }],
      }],
    });

    const resp: any = await trading.history('BTC', 'AUD', 5, 565, false);

    const expectedMockReturn = {
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 10,
        volume: 1,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 26,
          volume: 1,
          side: 'Ask',
          fee: 0.22099974,
          orderId: 701335,
        }],
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/history/BTC/AUD',
        'MyApiKey',
        'MyApiSecret',
        {
          limit: 5,
          since: 565,
          indexForward: false,
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
        '/v2/order/history/BTC/AUD',
        {
          limit: 5,
          since: 565,
          indexForward: false,
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

  it('should call history with paging', async () => {
    hmacStub.returns({
      path: '/v2/order/history/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      orders: [{
        price: 1000000000,
        volume: 100000000,
        openVolume: 0,
        trades: [{
          price: 2600000000,
          volume: 100000000,
          fee: 22099974,
        }],
      }],
      paging: {
        older: {
          since: '565',
          indexForward: 'true',
          limit: '5',
        },
        newer: {},
      },
    });

    const resp: any = await trading.history('BTC', 'AUD');

    const expectedMockReturn = {
      orders: [{
        price: 10,
        volume: 1,
        openVolume: 0,
        trades: [{
          price: 26,
          volume: 1,
          fee: 0.22099974,
        }],
      }],
      paging: {
        older: {
          since: 565,
          indexForward: true,
          limit: 5,
        },
        newer: {},
      },
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/history/BTC/AUD',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          limit: undefined,
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
        '/v2/order/history/BTC/AUD',
        {
          indexForward: undefined,
          limit: undefined,
          since: undefined,
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

  it('should call open', async () => {
    hmacStub.returns({
      path: '/v2/order/open/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      qs: {
        limit: 5,
        since: 565,
        indexForward: false,
      },
    });

    commonStub.returns({
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 1000000000,
        volume: 100000000,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 2600000000,
          volume: 100000000,
          side: 'Ask',
          fee: 22099974,
          orderId: 701335,
        }],
      }],
    });

    const resp: any = await trading.open('BTC', 'AUD');

    const expectedMockReturn = {
      orders: [{
        id: 701335,
        currency: 'AUD',
        instrument: 'BTC',
        orderSide: 'Ask',
        ordertype: 'Limit',
        creationTime: 1525903561732,
        status: 'Fully Matched',
        errorMessage: null,
        price: 10,
        volume: 1,
        openVolume: 0,
        clientRequestId: null,
        trades: [{
          id: 701347,
          creationTime: 1525903561932,
          description: null,
          price: 26,
          volume: 1,
          side: 'Ask',
          fee: 0.22099974,
          orderId: 701335,
        }],
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/open/BTC/AUD',
        'MyApiKey',
        'MyApiSecret',
        undefined,
        null,
        true,
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/order/open/BTC/AUD',
        undefined,
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

  it('should call detail', async () => {
    hmacStub.returns({
      path: '/order/detail',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
      qs: {
        limit: 5,
        since: 565,
        indexForward: false,
      },
    });

    commonStub.returns({
      orders: [{
        price: 1200000000,
        volume: 5000000,
        openVolume: 0,
        trades: [{
          price: 1200000000,
          volume: 5000000,
          fee: 22099974,
        }],
      }],
    });

    const resp: any = await trading.detail([1122]);

    const expectedMockReturn = {
      orders: [{
        price: 12,
        volume: 0.05,
        openVolume: 0,
        trades: [{
          price: 12,
          volume: 0.05,
          fee: 0.22099974,
        }],
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/order/detail',
        'MyApiKey',
        'MyApiSecret',
        null,
        {
          orderIds: [1122],
        },
      ],
    ];

    assert.deepEqual(hmacStub.args, expectedHmacArgs);
    assert.strictEqual(hmacStub.callCount, 1);

    const expectedCommonArgs = [
      [
        'POST',
        '/order/detail',
        null,
        {
          orderIds: [1122],
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

  it('should call tradeHistory without parameters', async () => {
    hmacStub.returns({
      path: '/v2/order/trade/history/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      trades: [{
        price: 1200000000,
        volume: 5000000,
        fee: 509999,
      }],
    });

    const resp: any = await trading.tradeHistory('BTC', 'AUD');

    const expectedMockReturn = {
      trades: [{
        price: 12,
        volume: 0.05,
        fee: 0.00509999,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/trade/history/BTC/AUD',
        'MyApiKey',
        'MyApiSecret',
        {
          indexForward: undefined,
          limit: undefined,
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
        '/v2/order/trade/history/BTC/AUD',
        {
          indexForward: undefined,
          limit: undefined,
          since: undefined,
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

  it('should call tradeHistory with parameters', async () => {
    hmacStub.returns({
      path: '/v2/order/trade/history/BTC/AUD',
      headers: {
        apiKey: 'MyApiKey',
        timestamp: 1541581502000,
        signature: 'YWJjMTIz',
      },
    });

    commonStub.returns({
      trades: [{
        price: 1200000000,
        volume: 5000000,
        fee: 509999,
      }],
    });

    const resp: any = await trading.tradeHistory('BTC', 'AUD', 5, 565, true);

    const expectedMockReturn = {
      trades: [{
        price: 12,
        volume: 0.05,
        fee: 0.00509999,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedHmacArgs = [
      [
        '/v2/order/trade/history/BTC/AUD',
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
        '/v2/order/trade/history/BTC/AUD',
        {
          indexForward: true,
          limit: 5,
          since: 565,
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
