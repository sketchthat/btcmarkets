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
const market_1 = require("./market");
describe('Market', () => {
    let market;
    let commonStub;
    before(() => {
        market = new market_1.Market();
        commonStub = sinon_1.stub(common_1.Common.prototype, 'request');
    });
    beforeEach(() => {
        commonStub.reset();
    });
    after(() => {
        commonStub.restore();
    });
    it('should call active', () => __awaiter(this, void 0, void 0, function* () {
        commonStub.returns({
            response: true,
        });
        const resp = yield market.active();
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedCommonArgs = [
            [
                'GET',
                '/v2/market/active',
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call tick', () => __awaiter(this, void 0, void 0, function* () {
        commonStub.returns({
            response: true,
        });
        const resp = yield market.tick('BTC', 'AUD');
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedCommonArgs = [
            [
                'GET',
                '/market/BTC/AUD/tick',
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call orderbook', () => __awaiter(this, void 0, void 0, function* () {
        commonStub.returns({
            response: true,
        });
        const resp = yield market.orderbook('btc', 'aud');
        const expectedMockReturn = {
            response: true,
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
        const expectedCommonArgs = [
            [
                'GET',
                '/market/BTC/AUD/orderbook',
            ],
        ];
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call trades without parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield market.trades('btc', 'aud');
        const expectedMockReturn = {
            trades: [{
                    id: 116082007,
                    price: 8811.8,
                    volume: 0.11898,
                    creationTime: 1468115880783,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call trades with parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield market.trades('btc', 'aud', 5, 1122, true);
        const expectedMockReturn = {
            trades: [{
                    id: 116082007,
                    price: 8811.8,
                    volume: 0.11898,
                    creationTime: 1468115880783,
                }],
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call trades with paging', () => __awaiter(this, void 0, void 0, function* () {
        commonStub.returns({
            trades: [
                {
                    id: 116082007,
                    price: 881180000000,
                    volume: 11898000,
                    creationTime: 1468115880783,
                },
            ],
            paging: {
                newer: {
                    limit: '5',
                    since: '565',
                    indexForward: 'false',
                },
                older: {},
            },
        });
        const resp = yield market.trades('btc', 'aud');
        const expectedMockReturn = {
            trades: [{
                    id: 116082007,
                    price: 8811.8,
                    volume: 0.11898,
                    creationTime: 1468115880783,
                }],
            paging: {
                newer: {
                    limit: 5,
                    since: 565,
                    indexForward: false,
                },
                older: {},
            },
        };
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call historicTicks without parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield market.historicTicks('btc', 'aud', 'hour');
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
    it('should call historicTicks with parameters', () => __awaiter(this, void 0, void 0, function* () {
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
        const resp = yield market.historicTicks('btc', 'aud', 'hour', 5, 565, true, false);
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
        chai_1.assert.deepEqual(resp, expectedMockReturn);
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
        chai_1.assert.deepEqual(commonStub.args, expectedCommonArgs);
        chai_1.assert.strictEqual(commonStub.callCount, 1);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFya2V0LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsK0JBQThCO0FBQzlCLGlDQUF3QztBQUV4QyxxQ0FBa0M7QUFDbEMscUNBQWtDO0FBRWxDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksVUFBcUIsQ0FBQztJQUUxQixNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFFdEIsVUFBVSxHQUFHLFlBQUksQ0FBQyxlQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDVCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBUyxFQUFFO1FBQ2xDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBUSxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV4QyxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztRQUVGLGFBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFM0MsTUFBTSxrQkFBa0IsR0FBRztZQUN6QjtnQkFDRSxLQUFLO2dCQUNMLG1CQUFtQjthQUNwQjtTQUNGLENBQUM7UUFFRixhQUFNLENBQUMs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