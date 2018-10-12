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
    }
    cancel(orderIds) {
        const body = {
            orderIds,
        };
        const r = authentication_1.createHmac('/order/cancel', this.publicKey, this.privateKey, null, body);
        return this.common.request('POST', r.path, null, body, r.headers);
    }
    history(instrument, currency, indexForward, limit, since) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            return this.commonHistoryOpen('history', instrument, currency, qs);
        });
    }
    open(instrument, currency) {
        return this.commonHistoryOpen('open', instrument, currency);
    }
    detail(orderIds) {
        const body = {
            orderIds,
        };
        const r = authentication_1.createHmac('detail', this.publicKey, this.privateKey, null, body);
        return this.common.request('POST', r.path, null, body, r.headers);
    }
    tradeHistory(instrument, currency, indexForward, limit, since) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            const path = `/v2/order/trade/history/${instrument.toUpperCase()}/${currency.toUpperCase()}`;
            const r = authentication_1.createHmac(path, this.publicKey, this.privateKey, qs, null);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            response.trades = response.trades.map(o => this.common.adjustBalance(o, ['price', 'volume', 'fee']));
            return response;
        });
    }
    commonHistoryOpen(path, instrument, currency, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestPath = '/v2/order';
            if (instrument && currency) {
                requestPath = `${requestPath}/${path}/${instrument.toUpperCase()}/${currency.toUpperCase()}`;
            }
            const r = authentication_1.createHmac(requestPath, this.publicKey, this.privateKey, qs, null);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            const adjustment = path.match(/trade/) ? 'trades' : 'orders';
            response[adjustment] = response[adjustment].map((o, i) => {
                response[adjustment][i] = response[adjustment][i].trades.map(t => {
                    return this.common.adjustBalance(t, ['price', 'volume', 'fee']);
                });
                return this.common.adjustBalance(o, ['price', 'volume', 'openVolume']);
            });
            return response;
        });
    }
}
exports.Trading = Trading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsOERBQXVEO0FBTXZEO0lBTUUsWUFDRSxTQUFrQixFQUNsQixVQUFtQjtRQUVuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLE1BQU0sQ0FDWCxVQUFrQixFQUNsQixRQUFnQixFQUNoQixLQUFhLEVBQ2IsTUFBYyxFQUNkLFNBQThCLEVBQzlCLFNBQThCLEVBQzlCLGVBQXVCO1FBRXZCLE1BQU0sSUFBSSxHQUFHO1lBQ1gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDcEMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7WUFDN0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7WUFDL0MsU0FBUztZQUNULFNBQVM7WUFDVCxlQUFlO1NBQ2hCLENBQUM7UUFFRixNQUFNLENBQUMsR0FBRywyQkFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5GLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVNLE1BQU0s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