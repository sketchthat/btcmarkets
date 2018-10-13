'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Common } from './common';
import { Market } from './market';

describe('Market', () => {
  let market: Market;
  let commonStub: SinonStub;

  before(() => {
    market = new Market();

    commonStub = stub(Common.prototype, 'request');
  });

  beforeEach(() => {
    commonStub.reset();
  });

  after(() => {
    commonStub.restore();
  });

  it('should call active', async () => {
    commonStub.returns({
      response: true,
    });

    const resp: any = await market.active();

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/market/active',
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call tick', async () => {
    commonStub.returns({
      response: true,
    });

    const resp: any = await market.tick('BTC', 'AUD');

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/market/BTC/AUD/tick',
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call orderbook', async () => {
    commonStub.returns({
      response: true,
    });

    const resp: any = await market.orderbook('btc', 'aud');

    const expectedMockReturn = {
      response: true,
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/market/BTC/AUD/orderbook',
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call trades without parameters', async () => {
    commonStub.returns({
      trades: [
        {
          id: 116082007,
          price: 881180000000,
          volume: 11898000,
          creationTime: 1468115880783,
        },
      ],
    });

    const resp: any = await market.trades('btc', 'aud');

    const expectedMockReturn = {
      trades: [{
        id: 116082007,
        price: 8811.8,
        volume: 0.11898,
        creationTime: 1468115880783,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/market/BTC/AUD/trades',
        {
          indexForward: undefined,
          limit: undefined,
          since: undefined,
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call trades with parameters', async () => {
    commonStub.returns({
      trades: [
        {
          id: 116082007,
          price: 881180000000,
          volume: 11898000,
          creationTime: 1468115880783,
        },
      ],
    });

    const resp: any = await market.trades('btc', 'aud', 5, 1122, true);

    const expectedMockReturn = {
      trades: [{
        id: 116082007,
        price: 8811.8,
        volume: 0.11898,
        creationTime: 1468115880783,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/market/BTC/AUD/trades',
        {
          indexForward: true,
          limit: 5,
          since: 1122,
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call historicTicks without parameters', async () => {
    commonStub.returns({
      ticks: [{
        timestamp: 1537671600000,
        open: 908800000000,
        high: 909771000000,
        low: 906053000000,
        close: 906935000000,
        volume: 1113664994,
      }],
    });

    const resp: any = await market.historicTicks('btc', 'aud', 'hour');

    const expectedMockReturn = {
      ticks: [{
        timestamp: 1537671600000,
        open: 9088,
        high: 9097.71,
        low: 9060.53,
        close: 9069.35,
        volume: 11.13664994,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/market/BTC/AUD/tickByTime/hour',
        {
          indexForward: undefined,
          limit: undefined,
          since: undefined,
          sortForward: undefined,
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });

  it('should call historicTicks with parameters', async () => {
    commonStub.returns({
      ticks: [{
        timestamp: 1537671600000,
        open: 908800000000,
        high: 909771000000,
        low: 906053000000,
        close: 906935000000,
        volume: 1113664994,
      }],
    });

    const resp: any = await market.historicTicks('btc', 'aud', 'hour', 5, 565, true, false);

    const expectedMockReturn = {
      ticks: [{
        timestamp: 1537671600000,
        open: 9088,
        high: 9097.71,
        low: 9060.53,
        close: 9069.35,
        volume: 11.13664994,
      }],
    };

    assert.deepEqual(resp, expectedMockReturn);

    const expectedCommonArgs = [
      [
        'GET',
        '/v2/market/BTC/AUD/tickByTime/hour',
        {
          indexForward: true,
          limit: 5,
          since: 565,
          sortForward: false,
        },
      ],
    ];

    assert.deepEqual(commonStub.args, expectedCommonArgs);
    assert.strictEqual(commonStub.callCount, 1);
  });
});
