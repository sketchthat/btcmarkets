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
const transaction_1 = require("./transaction");
const createHmac = require("./services/authentication");
describe('Transaction', () => {
    let transaction;
    let commonStub;
    let hmacStub;
    before(() => {
        transaction = new transaction_1.Transaction('MyApiKey', 'MyApiSecret');
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
    it('should call history without parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield transaction.history();
        const expectedMockReturn = {
            transactions: [],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield transaction.history('AUD', 565, true, false);
        const expectedMockReturn = {
            transactions: [{
                    balance: 1532,
                    amount: 6563.11,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with pagination', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield transaction.history();
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2FjdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUViLCtCQUE4QjtBQUM5QixpQ0FBd0M7QUFFeEMscUNBQWtDO0FBQ2xDLCtDQUE0QztBQUU1Qyx3REFBd0Q7QUFFeEQsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxXQUF3QixDQUFDO0lBQzdCLElBQUksVUFBcUIsQ0FBQztJQUMxQixJQUFJLFFBQW1CLENBQUM7SUFFeEIsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNWLFdBQVcsR0FBRyxJQUFJLHlCQUFXLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXpELFVBQVUsR0FBRyxZQUFJLENBQUMsZUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxRQUFRLEdBQUcsWUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNULFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDZixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsU0FBUyxFQUFFLGFBQWE7Z0JBQ3hCLFNBQVMsRUFBRSxVQUFVO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNqQixZQUFZLEVBQUUsRUFBRTtTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBUSxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUU5QyxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCLFlBQVksRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkI7Z0JBQ0UseUJBQXlCO2dCQUN6QixVQUFVO2dCQUNWLGFBQWE7Z0JBQ2I7b0JBQ0UsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLEtBQUssRUFBRSxTQUFTO29CQUNoQixXQUFXLEVBQUUsU0FBUztpQkFDdkI7Z0JBQ0QsSUFBSTtnQkFDSixJQUFJO2FBQ0w7U0FDRixDQUFDO1FBRUYsYUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sa0JBQWtCLEdBQUc7WUFDekI7Z0JBQ0UsS0FBSztnQkFDTCx5QkFBeUI7Z0JBQ3pCO29CQUNFLFlBQVksRUFBRSxTQUFTO29CQUN2QixLQUFLLEVBQUUsU0FBUztvQkFDaEIsV0FBVyxFQUFFLFNBQVM7aUJBQ3ZCO2dCQUNELElBQUk7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLFNBQVMsRUFBRSxVQUFVO29CQUNyQixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN0RCxhQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFTLEVBQUU7UUFDbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNmLElBQUksRUFBRSw2QkFBNkI7WUFDbkMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsU0FBUyxFQUFFLFVBQVU7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2pCLFlBQVksRUFBRSxDQUFDO29CQUNiLE9BQU8sRUFBRSxZQUFZO29CQUNyQixNQUFNLEVBQUUsWUFBWTtpQkFDckIsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFRLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVyRSxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCLFlBQVksRUFBRSxDQUFDO29CQUNiLE9BQU8sRUFBRSxJQUFJO29CQUNiLE1BQU0sRUFBRSxPQUFPO2lCQUNoQixDQUFDO1NBQ0gsQ0FBQztRQUVGLGFBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFM0MsTUFBTSxnQkFBZ0IsR0FBRztZQUN2QjtnQkFDRSw2QkFBNkI7Z0JBQzdCLFVBQVU7Z0JBQ1YsYUFBYTtnQkFDYjtvQkFDRSxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2dCQUNELElBQUk7Z0JBQ0osSUFBSTthQUNMO1NBQ0YsQ0FBQztRQUVGLGFBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xELGFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxQyxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCO2dCQUNFLEtBQUs7Z0JBQ0wsNkJBQTZCO2dCQUM3QjtvQkFDRSxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2dCQUNELElBQUk7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLFNBQVMsRUFBRSxVQUFVO29CQUNyQixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN0RCxhQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFTLEVBQUU7UUFDbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNmLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsU0FBUyxFQUFFLFVBQVU7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2pCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLEtBQUs7b0JBQ1osWUFBWSxFQUFFLE1BQU07b0JBQ3BCLFdBQVcsRUFBRSxPQUFPO2lCQUNyQjtnQkFDRCxLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQVEsTUFBTSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUMsTUFBTSxrQkFBa0IsR0FBRztZQUN6QixZQUFZLEVBQUUsRUFBRTtZQUNoQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxHQUFHO29CQUNWLFlBQVksRUFBRSxJQUFJO29CQUNsQixXQUFXLEVBQUUsS0FBSztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkI7Z0JBQ0UseUJBQXlCO2dCQUN6QixVQUFVO2dCQUNWLGFBQWE7Z0JBQ2I7b0JBQ0UsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLEtBQUssRUFBRSxTQUFTO29CQUNoQixXQUFXLEVBQUUsU0FBUztpQkFDdkI7Z0JBQ0QsSUFBSTtnQkFDSixJQUFJO2FBQ0w7U0FDRixDQUFDO1FBRUYsYUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sa0JBQWtCLEdBQUc7WUFDekI7Z0JBQ0UsS0FBSztnQkFDTCx5QkFBeUI7Z0JBQ3pCO29CQUNFLFlBQVksRUFBRSxTQUFTO29CQUN2QixLQUFLLEVBQUUsU0FBUztvQkFDaEIsV0FBVyxFQUFFLFNBQVM7aUJBQ3ZCO2dCQUNELElBQUk7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLFNBQVMsRUFBRSxVQUFVO29CQUNyQixTQUFTLEVBQUUsYUFBYTtpQkFDekI7YUFDRjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN0RCxhQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=