'use strict';

import { assert } from 'chai';
import { SinonStub, stub } from 'sinon';
import * as sinon from 'sinon';

import { createHmac } from './authentication';

import * as crypto from 'crypto';

describe('Authentication', () => {
  let cryptoStub: SinonStub;

  before(() => {
    cryptoStub = stub(crypto, 'createHmac');
  });

  beforeEach(() => {
    cryptoStub.reset();

    const utcDate = new Date(Date.UTC(2018, 10, 7, 9, 5, 2));
    this.clock = sinon.useFakeTimers(utcDate);
  });

  after(() => {
    cryptoStub.restore();
  });

  afterEach(() => {
    this.clock.restore();
  });

  it('should call v1 createHmac without params', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v1/private/endpoint\n1541581502000\n';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const response = createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret');

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v1/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v1 createHmac with query string params', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v1/private/endpoint\n1541581502000\n';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const qs = {
      currency: 'aud',
      instrument: 'btc',
    };

    const response = createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', qs);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v1/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v1 createHmac with post', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v1/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc"}';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const post = {
      currency: 'aud',
      instrument: 'btc',
    };

    const response = createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v1/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v1 createHmac with some undefined post data', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v1/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc","empty":null}';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const post = {
      currency: 'aud',
      instrument: 'btc',
      empty: null,
      undefinedProperty: undefined,
    };

    const response = createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v1/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });







  it('should call v2 createHmac without params', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v2/private/endpoint\n1541581502000\n';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const response = createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret');

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v2/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v2 createHmac with query string params', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v2/private/endpoint\ncurrency=aud&instrument=btc\n1541581502000\n';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const qs = {
      currency: 'aud',
      instrument: 'btc',
    };

    const response = createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', qs);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v2/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v2 createHmac with post', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v2/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc"}';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const post = {
      currency: 'aud',
      instrument: 'btc',
    };

    const response = createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v2/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });

  it('should call v2 createHmac with some undefined post data', () => {
    const cryptoReturns = {
      update(update) {
        const expectedUpdate = '/v2/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc","empty":null}';

        assert.strictEqual(update, expectedUpdate);

        return cryptoReturns;
      },
      digest(digest) {
        assert.strictEqual(digest, 'base64');

        return 'YWJjMTIz';
      },
    };

    cryptoStub.returns(cryptoReturns);

    const post = {
      currency: 'aud',
      instrument: 'btc',
      empty: null,
      undefinedProperty: undefined,
    };

    const response = createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);

    const expectedResponse = {
      headers: {
        apiKey: 'MyApiKey',
        signature: 'YWJjMTIz',
        timestamp: 1541581502000,
      },
      path: '/v2/private/endpoint',
    };

    assert.deepEqual(response, expectedResponse);
    assert.strictEqual(cryptoStub.callCount, 1);
  });
});
