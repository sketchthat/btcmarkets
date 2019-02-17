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
    create(instrument, currency, price, volume, orderSide, ordertype, clientRequestId, triggerPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                instrument: instrument.toUpperCase(),
                currency: currency.toUpperCase(),
                price: this.common.convertFigure(true, price),
                volume: this.common.convertFigure(true, volume),
                orderSide,
                ordertype,
                clientRequestId,
                triggerPrice: this.common.convertFigure(true, triggerPrice),
            };
            if (ordertype !== 'Stop Limit') {
                delete body.triggerPrice;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsOERBQXVEO0FBUXZEO0lBTUUsWUFDRSxTQUFrQixFQUNsQixVQUFtQjtRQUVuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLE1BQU0sQ0FDakIsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsS0FBYSxFQUNiLE1BQWMsRUFDZCxTQUE4QixFQUM5QixTQUE4QixFQUM5QixlQUF1QixFQUN2QixZQUFxQjs7WUFFckIsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BDLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDN0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7Z0JBQy9DLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxlQUFlO2dCQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO2FBQzVELENBQUM7WUFFRixJQUFJLFNBQVMsS0FBSyxZQUFZLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjtZQUVELE1BQU0sQ0FBQyxHQUFHLDJCQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVB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