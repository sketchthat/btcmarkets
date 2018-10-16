'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const common_1 = require("./common");
const rp = require("request-promise");
describe('Common', () => {
    let rpStub;
    let common;
    before(() => {
        common = new common_1.Common();
        rpStub = sinon_1.stub(rp, 'Request');
    });
    beforeEach(() => {
        rpStub.reset();
    });
    after(() => {
        rpStub.restore();
    });
    it('should call GET request', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('GET', '/mock/request');
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call GET request with query-string', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('GET', '/mock/request', { sample: 'qs' });
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call POST request', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const emptyQs = {
            trade: undefined,
            amount: null,
        };
        const emptyPost = {
            volume: null,
        };
        const resp = yield common.request('POST', '/mock/request', emptyQs, emptyPost);
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call POST request with query-string', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('POST', '/mock/request', { sample: 'qs' });
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call messy POST request with query-string', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('POST', '/mock/request', { sample: 'qs', something: undefined, another: null }, { nothing: undefined, property: null });
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call POST request with query-string & post-body', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('POST', '/mock/request', { sample: 'qs' }, { sample: 'body' });
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call POST request with post-body', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const resp = yield common.request('POST', '/mock/request', null, { sample: 'body' });
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call POST request with post-body & authentication', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const headers = {
            apiKey: 'MyApiKey',
            timestamp: 1541581502000,
            signature: 'YWJjMTIz',
        };
        const resp = yield common.request('POST', '/mock/request', null, { sample: 'body' }, headers);
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        chai_1.assert.deepEqual(resp, { response: true });
    }));
    it('should call GET request with paging', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({
            paging: {
                newer: '/mock/request?since=5&indexForward=true&string=yes',
                older: '/mock/request',
            },
        });
        const resp = yield common.request('GET', '/mock/request');
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
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
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
        chai_1.assert.deepEqual(resp, expectedResponse);
    }));
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
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(rpStub.callCount, 0);
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
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(rpStub.callCount, 0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsK0JBQThCO0FBQzlCLGlDQUF3QztBQUV4QyxxQ0FBa0M7QUFFbEMsc0NBQXNDO0FBRXRDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLElBQUksTUFBaUIsQ0FBQztJQUN0QixJQUFJLE1BQWMsQ0FBQztJQUVuQixNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDdEIsTUFBTSxHQUFHLFlBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFTLEVBQUU7UUFDdkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sSUFBSSxHQUFRLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFL0QsTUFBTSxZQUFZLEdBQUc7WUFDbkI7Z0JBQ0U7b0JBQ0UsR0FBRyxFQUFFLHlDQUF5QztvQkFDOUMsSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsRUFBRSxFQUFFLElBQUk7b0JBQ1IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCO2FBQ0Y7U0FDRixD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