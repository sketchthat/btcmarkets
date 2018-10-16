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
const trading_1 = require("./trading");
const createHmac = require("./services/authentication");
describe('Trading', () => {
    let trading;
    let commonStub;
    let hmacStub;
    before(() => {
        trading = new trading_1.Trading('MyApiKey', 'MyApiSecret');
        commonStub = sinon_1.stub(common_1.Common.prototype, 'request');
        hmacStub = sinon_1.stub(createHmac, 'createHmac');
    });
    beforeEach(() => {
        commonStub.reset();
        hmacStub.reset();
    });
    after(() => {
        commonStub.restore();
        hmacStub.restore();
    });
    it('should call create', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.create('BTC', 'AUD', 8500.43, 1.55, 'Ask', 'Limit', 'abc123');
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call cancel', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.cancel([1122, 3344]);
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history without parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.history('BTC', 'AUD');
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.history('BTC', 'AUD', 5, 565, false);
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with paging', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.history('BTC', 'AUD');
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call open', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.open('BTC', 'AUD');
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call detail', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.detail([1122]);
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call tradeHistory without parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.tradeHistory('BTC', 'AUD');
        const expectedMockReturn = {
            trades: [{
                    price: 12,
                    volume: 0.05,
                    fee: 0.00509999,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call tradeHistory with parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield trading.tradeHistory('BTC', 'AUD', 5, 565, true);
        const expectedMockReturn = {
            trades: [{
                    price: 12,
                    volume: 0.05,
                    fee: 0.00509999,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGluZy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RyYWRpbmcuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7QUFFYiwrQkFBOEI7QUFDOUIsaUNBQXdDO0FBRXhDLHFDQUFrQztBQUNsQyx1Q0FBb0M7QUFFcEMsd0RBQXdEO0FBRXhELFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLElBQUksT0FBZ0IsQ0FBQztJQUNyQixJQUFJLFVBQXFCLENBQUM7SUFDMUIsSUFBSSxRQUFtQixDQUFDO0lBRXhCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVqRCxVQUFVLEdBQUcsWUFBSSxDQUFDLGVBQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsUUFBUSxHQUFHLFlBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDVCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFLEdBQVMsRUFBRTtRQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2YsSUFBSSxFQUFFLGVBQWU7WUFDckIsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsU0FBUyxFQUFFLFVBQVU7YUFD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