'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const sinon = require("sinon");
const authentication_1 = require("./authentication");
const crypto = require("crypto");
describe('Authentication', () => {
    let cryptoStub;
    before(() => {
        cryptoStub = sinon_1.stub(crypto, 'createHmac');
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
    it('should call v1 createHmac without parameters', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v1/private/endpoint\n1541581502000\n';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const response = authentication_1.createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret');
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v1/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v1 createHmac with query string parameters', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v1/private/endpoint\n1541581502000\n';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const qs = {
            currency: 'aud',
            instrument: 'btc',
        };
        const response = authentication_1.createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', qs);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v1/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v1 createHmac with post', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v1/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc"}';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const post = {
            currency: 'aud',
            instrument: 'btc',
        };
        const response = authentication_1.createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v1/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v1 createHmac with some undefined post data', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v1/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc","empty":null}';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
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
        const response = authentication_1.createHmac('/v1/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v1/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v2 createHmac without parameters', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v2/private/endpoint\n1541581502000\n';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const response = authentication_1.createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret');
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v2/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v2 createHmac with query string parameters', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v2/private/endpoint\ncurrency=aud&instrument=btc\n1541581502000\n';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const qs = {
            currency: 'aud',
            instrument: 'btc',
        };
        const response = authentication_1.createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', qs, null, true);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v2/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v2 createHmac with empty query string parameters', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v2/private/endpoint\n1541581502000\n';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const qs = {};
        const response = authentication_1.createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', qs, null, true);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v2/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v2 createHmac with post', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v2/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc"}';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const post = {
            currency: 'aud',
            instrument: 'btc',
        };
        const response = authentication_1.createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', null, post);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v2/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
    it('should call v2 createHmac with some undefined get & post data', () => {
        const cryptoReturns = {
            update(update) {
                const expectedUpdate = '/v2/private/endpoint\n1541581502000\n{"currency":"aud","instrument":"btc","empty":null}';
                chai_1.assert.strictEqual(update, expectedUpdate);
                return cryptoReturns;
            },
            digest(digest) {
                chai_1.assert.strictEqual(digest, 'base64');
                return 'YWJjMTIz';
            },
        };
        cryptoStub.returns(cryptoReturns);
        const qs = {
            something: null,
            terrible: undefined,
        };
        const post = {
            currency: 'aud',
            instrument: 'btc',
            empty: null,
            undefinedProperty: undefined,
        };
        const response = authentication_1.createHmac('/v2/private/endpoint', 'MyApiKey', 'MyApiSecret', qs, post);
        const expectedResponse = {
            headers: {
                apiKey: 'MyApiKey',
                signature: 'YWJjMTIz',
                timestamp: 1541581502000,
            },
            path: '/v2/private/endpoint',
        };
        chai_1.assert.deepEqual(response, expectedResponse);
        chai_1.assert.strictEqual(cryptoStub.callCount, 1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYiwrQkFBOEI7QUFDOUIsaUNBQXdDO0FBQ3hDLCtCQUErQjtBQUUvQixxREFBOEM7QUFFOUMsaUNBQWlDO0FBRWpDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFDOUIsSUFBSSxVQUFxQixDQUFDO0lBRTFCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixVQUFVLEdBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNULFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLEdBQUcsRUFBRTtRQUN0RCxNQUFNLGFBQWEsR0FBRztZQUNwQixNQUFNLENBQUMsTUFBTTtnQkFDWCxNQUFNLGNBQWMsR0FB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