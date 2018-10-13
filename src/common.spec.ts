'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';

import { Common } from './common';

import * as rp from 'request-promise';

describe('Common', () => {
  let rpStub: SinonStub;
  let common: Common;

  before(() => {
    common = new Common();
    rpStub = stub(rp, 'Request');
  });

  beforeEach(() => {
    rpStub.reset();
  });

  after(() => {
    rpStub.restore();
  });

  it('should call GET request', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request('GET', '/mock/request');

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'GET',
          qs: null,
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call GET request with query-string', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request('GET', '/mock/request', { sample: 'qs' });

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'GET',
          qs: {
            sample: 'qs',
          },
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call POST request', async () => {
    rpStub.resolves({ response: true });

    const emptyQs = {
      trade: undefined,
      amount: null,
    };

    const emptyPost = {
      volume: null,
    };

    const resp: any = await common.request('POST', '/mock/request', emptyQs, emptyPost);

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: null,
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call POST request with query-string', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request('POST', '/mock/request', { sample: 'qs' });

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: {
            sample: 'qs',
          },
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call messy POST request with query-string', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request(
      'POST',
      '/mock/request',
      { sample: 'qs', something: undefined, another: null },
      { nothing: undefined, property: null },
    );

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: {
            sample: 'qs',
          },
          body: null,
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call POST request with query-string & post-body', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request('POST', '/mock/request', { sample: 'qs' }, { sample: 'body' });

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: {
            sample: 'qs',
          },
          body: {
            sample: 'body',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call POST request with post-body', async () => {
    rpStub.resolves({ response: true });

    const resp: any = await common.request('POST', '/mock/request', null, { sample: 'body' });

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: null,
          body: {
            sample: 'body',
          },
          callback: undefined,
        },
      ],
    ];

    assert.deepEqual(rpStub.args, expectedArgs);
    assert.strictEqual(rpStub.callCount, 1);
    assert.deepEqual(resp, { response: true });
  });

  it('should call POST request with post-body & authentication', async () => {
    rpStub.resolves({ response: true });

    const headers = {
      apiKey: 'MyApiKey',
      timestamp: 1541581502000,
      signature: 'YWJjMTIz',
    };

    const resp: any = await common.request('POST', '/mock/request', null, { sample: 'body' }, headers);

    const expectedArgs = [
      [
        {
          uri: 'https://api.btcmarkets.net/mock/request',
          json: true,
          method: 'POST',
          qs: null,
          body: {
            sample: 'body',
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
    assert.deepEqual(resp, { response: true });
  });
});
