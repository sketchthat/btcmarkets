"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const authentication_1 = require("./services/authentication");
class Trading {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.common = new common_1.Common();
    }
    create(instrument, currency, price, volume, orderSide, ordertype, clientRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                instrument: instrument.toUpperCase(),
                currency: currency.toUpperCase(),
                price: this.common.convertFigure(true, price),
                volume: this.common.convertFigure(true, volume),
                orderSide,
                ordertype,
                clientRequestId,
            };
            const r = authentication_1.createHmac('/order/create', this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    cancel(orderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                orderIds,
            };
            const r = authentication_1.createHmac('/order/cancel', this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    history(instrument, currency, limit, since, indexForward) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            const response = yield this.commonHistoryOpen('history', instrument, currency, qs);
            if (response.paging) {
                const adjustment = {
                    since: 'number',
                    indexForward: 'boolean',
                    limit: 'number',
                };
                response.paging = this.common.convertType(response.paging, adjustment);
            }
            return response;
        });
    }
    open(instrument, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commonHistoryOpen('open', instrument, currency);
        });
    }
    detail(orderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                orderIds,
            };
            const r = authentication_1.createHmac('/order/detail', this.publicKey, this.privateKey, null, body);
            const response = yield this.common.request('POST', r.path, null, body, r.headers);
            response.orders = response.orders.map((o, i) => {
                response.orders[i].trades = response.orders[i].trades.map(t => this.common.adjustBalance(t, ['price', 'volume', 'fee']));
                return this.common.adjustBalance(o, ['price', 'volume', 'openVolume']);
            });
            return response;
        });
    }
    tradeHistory(instrument, currency, limit, since, indexForward) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            const path = `/v2/order/trade/history/${instrument.toUpperCase()}/${currency.toUpperCase()}`;
            const r = authentication_1.createHmac(path, this.publicKey, this.privateKey, qs, null, true);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            response.trades = response.trades.map(t => this.common.adjustBalance(t, ['price', 'volume', 'fee']));
            return response;
        });
    }
    commonHistoryOpen(path, instrument, currency, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestPath = `/v2/order/${path}/${instrument.toUpperCase()}/${currency.toUpperCase()}`;
            const r = authentication_1.createHmac(requestPath, this.publicKey, this.privateKey, qs, null, true);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            response.orders = response.orders.map((o, i) => {
                response.orders[i] = response.orders[i].trades.map(t => {
                    return this.common.adjustBalance(t, ['price', 'volume', 'fee']);
                });
                return this.common.adjustBalance(o, ['price', 'volume', 'openVolume']);
            });
            return response;
        });
    }
}
exports.Trading = Trading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsOERBQXVEO0FBUXZEO0lBTUUsWUFDRSxTQUFrQixFQUNsQixVQUFtQjtRQUVuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLE1BQU0sQ0FDakIsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLE1BQWMsRUFDZCxTQUE4QixFQUM5QixTQUE4QixFQUM5QixlQUF1Qjs7WUFFdkIsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BDLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDN0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7Z0JBQy9DLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxlQUFlO2FBQ2hCLENBQUM7WUFFRixNQUFNLENBQUMsR0FBRywyQkFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRW5GLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsQ0FBQztL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