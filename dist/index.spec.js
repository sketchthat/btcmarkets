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
const index_1 = require("./index");
const createHmac = require("./services/authentication");
const rp = require("request-promise");
describe('Index', () => {
    let rpStub;
    let hmacStub;
    before(() => {
        rpStub = sinon_1.stub(rp, 'Request');
        hmacStub = sinon_1.stub(createHmac, 'createHmac');
    });
    beforeEach(() => {
        rpStub.reset();
        hmacStub.reset();
    });
    after(() => {
        rpStub.restore();
        hmacStub.restore();
    });
    it('should call account/balance', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/account/balance',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        rpStub.resolves([{
                balance: 15000000000,
                pendingFunds: 9955000000,
            }]);
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = yield btcm.account().balance();
        const expectedArgs = [
            [
                {
                    uri: 'https://api.btcmarkets.net/account/balance',
                    json: true,
                    method: 'GET',
                    qs: null,
                    body: null,
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
        const expectedResponse = [{
                balance: 150,
                pendingFunds: 99.55,
            }];
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
    }));
    it('should call fundTransfer/withdrawCrypto', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/withdrawCrypto',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        rpStub.resolves({ response: true });
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = yield btcm.fundTransfer().withdrawCrypto(1.55, 'x12abc', 'BTC');
        const expectedArgs = [
            [
                {
                    uri: 'https://api.btcmarkets.net/fundtransfer/withdrawCrypto',
                    json: true,
                    method: 'POST',
                    qs: null,
                    body: {
                        amount: 155000000,
                        address: 'x12abc',
                        currency: 'BTC',
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
        const expectedResponse = { response: true };
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
    }));
    it('should call market/active', () => __awaiter(this, void 0, void 0, function* () {
        rpStub.resolves({ response: true });
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = yield btcm.market().active();
        const expectedArgs = [
            [
                {
                    uri: 'https://api.btcmarkets.net/v2/market/active',
                    json: true,
                    method: 'GET',
                    qs: null,
                    body: null,
                    callback: undefined,
                },
            ],
        ];
        chai_1.assert.strictEqual(hmacStub.callCount, 0);
        chai_1.assert.deepEqual(rpStub.args, expectedArgs);
        chai_1.assert.strictEqual(rpStub.callCount, 1);
        const expectedResponse = { response: true };
        chai_1.assert.deepEqual(resp, expectedResponse);
    }));
    it('should call trading/create', () => __awaiter(this, void 0, void 0, function* () {
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
        rpStub.resolves({ response: true });
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = yield btcm.trading().create('BTC', 'AUD', 8500.43, 1.55, 'Ask', 'Limit', 'abc123');
        const expectedArgs = [
            [
                {
                    uri: 'https://api.btcmarkets.net/order/create',
                    json: true,
                    method: 'POST',
                    qs: null,
                    body: {
                        clientRequestId: 'abc123',
                        currency: 'AUD',
                        instrument: 'BTC',
                        orderSide: 'Ask',
                        ordertype: 'Limit',
                        price: 850043000000,
                        volume: 155000000,
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
        const expectedResponse = { response: true };
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
    }));
    it('should call transaction/history', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/v2/transaction/history',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        rpStub.resolves({ transactions: [] });
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = yield btcm.transaction().history();
        const expectedArgs = [
            [
                {
                    uri: 'https://api.btcmarkets.net/v2/transaction/history',
                    json: true,
                    method: 'GET',
                    qs: null,
                    body: null,
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
        const expectedResponse = { transactions: [] };
        chai_1.assert.deepEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
    }));
    it('should call getFloat', () => __awaiter(this, void 0, void 0, function* () {
        const btcm = new index_1.BTCMarkets('MyApiKey', 'MySecretKey');
        const resp = btcm.getFloat();
        const expectedResponse = 100000000;
        chai_1.assert.strictEqual(resp, expectedResponse);
        chai_1.assert.strictEqual(rpStub.callCount, 0);
        chai_1.assert.strictEqual(hmacStub.callCount, 0);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUViLCtCQUE4QjtBQUM5QixpQ0FBd0M7QUFFeEMsbUNBQXFDO0FBQ3JDLHdEQUF3RDtBQUV4RCxzQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDckIsSUFBSSxNQUFpQixDQUFDO0lBQ3RCLElBQUksUUFBbUIsQ0FBQztJQUV4QixNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxHQUFHLFlBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0IsUUFBUSxHQUFHLFlBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsR0FBUyxFQUFFO1FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDZixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsU0FBUyxFQUFFLGFBQWE7Z0JBQ3hCLFNBQVMsRUFBRSxVQUFVO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNmLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixZQUFZLEVBQUUsVUFBVTthQUN6QixDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsTUFBTSxJQUFJLEdBQVEsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakQsTUFBTSxZQUFZLEdBQUc7WUFDbkI7Z0JBQ0U7b0JBQ0UsR0FBRyxFQUFFLDRDQUE0QztvQkFDakQsSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsRUFBRSxFQUFFLElBQUk7b0JBQ1IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFO3dCQUNQLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixTQUFTLEVBQUUsYUFBYTt3QkFDeEIsU0FBUyxFQUFFLFVBQVU7cUJBQ3RCO29CQUNELFFBQVEsRUFBRSxTQUFTO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztRQUVGLGFBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1QyxhQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsR0FBRztnQkFDWixZQUFZLEVBQUUsS0FBSzthQUNwQixDQUFDLENBQUM7UUFFSCxhQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXpDLGFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLEdBQVMsRUFBRTtRQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2YsSUFBSSxFQUFFLDhCQUE4QjtZQUNwQyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLFNBQVMsRUFBRSxhQUFhO2dCQUN4QixTQUFTLEVBQUUsVUFBVTthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFVLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxGLE1BQU0sWUFBWSxHQUFHO1lBQ25CO2dCQUNFO29CQUNFLEdBQUcsRUFBRSx3REFBd0Q7b0JBQzdELElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxNQUFNO29CQUNkLEVBQUUsRUFBRSxJQUFJO29CQUNSLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsU0FBUzt3QkFDakIsT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLFFBQVEsRUFBRSxLQUFLO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLFNBQVMsRUFBRSxhQUFhO3dCQUN4QixTQUFTLEVBQUUsVUFBVTtxQkFDdEI7b0JBQ0QsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO1FBRUYsYUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzVDLGFBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4QyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRTVDLGFBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFekMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBUyxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFVLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRS9DLE1BQU0sWUFBWSxHQUFHO1lBQ25CO2dCQUNFO29CQUNFLEdBQUcsRUFBRSw2Q0FBNkM7b0JBQ2xELElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxLQUFLO29CQUNiLEVBQUUsRUFBRSxJQUFJO29CQUNSLElBQUksRUFBRSxJQUFJO29CQUNWLFFBQVEsRUFBRSxTQUFTO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztRQUVGLGFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxQyxhQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDNUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFNUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQVMsRUFBRTtRQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2YsSUFBSSxFQUFFLGVBQWU7WUFDckIsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsU0FBUyxFQUFFLFVBQVU7YUFDdEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osZUFBZSxFQUFFLFFBQVE7Z0JBQ3pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFVLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVyRyxNQUFNLFlBQVksR0FBRztZQUNuQjtnQkFDRTtvQkFDRSxHQUFHLEVBQUUseUNBQXlDO29CQUM5QyxJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsTUFBTTtvQkFDZCxFQUFFLEVBQUUsSUFBSTtvQkFDUixJQUFJLEVBQUU7d0JBQ0osZUFBZSxFQUFFLFFBQVE7d0JBQ3pCLFFBQVEsRUFBRSxLQUFLO3dCQUNmLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixTQUFTLEVBQUUsS0FBSzt3QkFDaEIsU0FBUyxFQUFFLE9BQU87d0JBQ2xCLEtBQUssRUFBRSxZQUFZO3dCQUNuQixNQUFNLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixTQUFTLEVBQUUsYUFBYTt3QkFDeEIsU0FBUyxFQUFFLFVBQVU7cUJBQ3RCO29CQUNELFFBQVEsRUFBRSxTQUFTO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztRQUVGLGFBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1QyxhQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEMsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUU1QyxhQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXpDLGFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQVMsRUFBRTtRQUMvQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2YsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLFNBQVMsRUFBRSxhQUFhO2dCQUN4QixTQUFTLEVBQUUsVUFBVTthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0QyxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFVLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXJELE1BQU0sWUFBWSxHQUFHO1lBQ25CO2dCQUNFO29CQUNFLEdBQUcsRUFBRSxtREFBbUQ7b0JBQ3hELElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxLQUFLO29CQUNiLEVBQUUsRUFBRSxJQUFJO29CQUNSLElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRTt3QkFDUCxNQUFNLEVBQUUsVUFBVTt3QkFDbEIsU0FBUyxFQUFFLGFBQWE7d0JBQ3hCLFNBQVMsRUFBRSxVQUFVO3FCQUN0QjtvQkFDRCxRQUFRLEVBQUUsU0FBUztpQkFDcEI7YUFDRjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDNUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFOUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUV6QyxhQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxHQUFTLEVBQUU7UUFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBVSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0IsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFFbkMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUUzQyxhQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9