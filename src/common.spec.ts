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

  it('should call GET request with paging', async () => {
    rpStub.resolves({
      paging: {
        newer: '/mock/request?since=5&indexForward=true&string=yes',
        older: '/mock/request',
      },
     });

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

    const expectedResponse = {
      paging: {
        newer: {
          indexForward: 'true',
          since: '5',
          string: 'yes',
        },
        older: {},
      },
    };

    assert.deepEqual(resp, expectedResponse);
  });

  it('should call convertType with valid params', () => {
    const paging = {
      newer: {
        boolTrue: 'true',
        numberSmall: '5',
        nullVar: null,
      },
      older: {
        boolFalse: 'false',
        stringDefault: 'hello',
        undefinedVar: undefined,
      },
      nullDirection: null,
    };

    const adjustment = {
      boolTrue: 'boolean',
      boolFalse: 'boolean',
      numberSmall: 'number',
      stringDefault: 'string',
    };

    const resp = common.convertType(paging, adjustment);

    const expectedResponse = {
      newer: {
        boolTrue: true,
        numberSmall: 5,
      },
      older: {
        boolFalse: false,
        stringDefault: 'hello',
      },
    };

    assert.deepEqual(resp, expectedResponse);
    assert.strictEqual(rpStub.callCount, 0);
  });

  it('should call convertType with invalid paging', () => {
    const paging = null;

    const adjustment = {
      boolTrue: 'boolean',
    };

    const resp = common.convertType(paging, adjustment);

    const expectedResponse = {
      newer: {},
      older: {},
    };

    assert.deepEqual(resp, expectedResponse);
    assert.strictEqual(rpStub.callCount, 0);
  });
});
