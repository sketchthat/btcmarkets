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
const fundTransfer_1 = require("./fundTransfer");
const createHmac = require("./services/authentication");
describe('FundTransfer', () => {
    let fundTransfer;
    let commonStub;
    let hmacStub;
    before(() => {
        fundTransfer = new fundTransfer_1.FundTransfer('MyApiKey', 'MyApiSecret');
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
    it('should call withdrawCrypto', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/withdrawCrypto',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
            body: {
                balance: 16434000000,
                address: 'x123abc',
                currency: 'BTC',
            },
        });
        commonStub.returns({
            response: true,
        });
        const resp = yield fundTransfer.withdrawCrypto(164.34, 'x123abc', 'BTC');
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/withdrawCrypto',
                'MyApiKey',
                'MyApiSecret',
                null,
                {
                    address: 'x123abc',
                    amount: 16434000000,
                    currency: 'BTC',
                },
            ],
        ];
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
        const expectedCommonArgs = [
            [
                'POST',
                '/fundtransfer/withdrawCrypto',
                null,
                {
                    address: 'x123abc',
                    amount: 16434000000,
                    currency: 'BTC',
                },
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call withdrawEFT', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/withdrawEFT',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
            body: {
                accountName: 'John Doe',
                accountNumber: '11223344',
                amount: 5055000000,
                bankName: 'ANZ',
                bsbNumber: '011333',
                currency: 'AUD',
            },
        });
        commonStub.returns({
            response: true,
        });
        const resp = yield fundTransfer.withdrawETF('John Doe', 'ANZ', '011333', '11223344', 'AUD', 50.55);
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/withdrawEFT',
                'MyApiKey',
                'MyApiSecret',
                null,
                {
                    accountName: 'John Doe',
                    accountNumber: '11223344',
                    amount: 5055000000,
                    bankName: 'ANZ',
                    bsbNumber: '011333',
                    currency: 'AUD',
                },
            ],
        ];
        chai_1.assert.deepEqual(hmacStub.args, expectedHmacArgs);
        chai_1.assert.strictEqual(hmacStub.callCount, 1);
        const expectedCommonArgs = [
            [
                'POST',
                '/fundtransfer/withdrawEFT',
                null,
                {
                    accountName: 'John Doe',
                    accountNumber: '11223344',
                    amount: 5055000000,
                    bankName: 'ANZ',
                    bsbNumber: '011333',
                    currency: 'AUD',
                },
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history without parameters', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/history',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        commonStub.returns({
            fundTransfers: [{
                    amount: 535633000000,
                    fee: 534000000,
                }],
        });
        const resp = yield fundTransfer.history();
        const expectedMockReturn = {
            fundTransfers: [{
                    amount: 5356.33,
                    fee: 5.34,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/history',
                'MyApiKey',
                'MyApiSecret',
                {
                    indexForward: undefined,
                    limit: null,
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
                '/fundtransfer/history',
                {
                    indexForward: undefined,
                    limit: null,
                    since: undefined,
                },
                null,
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with parameters', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/history',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        commonStub.returns({
            fundTransfers: [{
                    amount: 535633000000,
                    fee: 534000000,
                }],
        });
        const resp = yield fundTransfer.history(5, 565, true);
        const expectedMockReturn = {
            fundTransfers: [{
                    amount: 5356.33,
                    fee: 5.34,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/history',
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
                '/fundtransfer/history',
                {
                    indexForward: true,
                    limit: 5,
                    since: 565,
                },
                null,
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with paging', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/history',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        commonStub.returns({
            fundTransfers: [{
                    amount: 535633000000,
                    fee: 534000000,
                }],
            paging: {
                newer: {
                    limit: '5',
                    since: '565',
                    indexForward: 'true',
                },
                older: {},
            },
        });
        const resp = yield fundTransfer.history();
        const expectedMockReturn = {
            fundTransfers: [{
                    amount: 5356.33,
                    fee: 5.34,
                }],
            paging: {
                newer: {
                    limit: 5,
                    since: 565,
                    indexForward: true,
                },
                older: {},
            },
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/history',
                'MyApiKey',
                'MyApiSecret',
                {
                    indexForward: undefined,
                    limit: null,
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
                '/fundtransfer/history',
                {
                    indexForward: undefined,
                    limit: null,
                    since: undefined,
                },
                null,
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call history with invalid limit', () => __awaiter(this, void 0, void 0, function* () {
        hmacStub.returns({
            path: '/fundtransfer/history',
            headers: {
                apiKey: 'MyApiKey',
                timestamp: 1541581502000,
                signature: 'YWJjMTIz',
            },
        });
        commonStub.returns({
            fundTransfers: [{
                    amount: 535633000000,
                    fee: 534000000,
                }],
        });
        const resp = yield fundTransfer.history(5500, 565, true);
        const expectedMockReturn = {
            fundTransfers: [{
                    amount: 5356.33,
                    fee: 5.34,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedHmacArgs = [
            [
                '/fundtransfer/history',
                'MyApiKey',
                'MyApiSecret',
                {
                    indexForward: true,
                    limit: 200,
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
                '/fundtransfer/history',
                {
                    indexForward: true,
                    limit: 200,
                    since: 565,
                },
                null,
                {
                    apiKey: 'MyApiKey',
                    timestamp: 1541581502000,
                    signature: 'YWJjMTIz',
                },
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZFRyYW5zZmVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZnVuZFRyYW5zZmVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsK0JBQThCO0FBQzlCLGlDQUF3QztBQUV4QyxxQ0FBa0M7QUFDbEMsaURBQThDO0FBQzlDLHdEQUF3RDtBQUV4RCxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixJQUFJLFlBQTBCLENBQUM7SUFDL0IsSUFBSSxVQUFxQixDQUFDO0lBQzFCLElBQUksUUFBbUIsQ0FBQztJQUV4QixNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFM0QsVUFBVSxHQUFHLFlBQUksQ0FBQyxlQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsR0FBRyxZQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1QsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFTLEVBQUU7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNmLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsU0FBUyxF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