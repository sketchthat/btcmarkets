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
const crypto = require("crypto");
const rp = require("request-promise");
class BTCMarkets {
    constructor(publicKey, privateKey) {
        this.keys = { publicKey, privateKey };
        this.base = 'https://api.btcmarkets.net';
        this.accountFloat = 100000000;
    }
    callPrivate(method, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${this.base}${method}`;
            const hmac = this.generateHmac(method);
            try {
                const opts = {
                    uri: uri,
                    headers: {
                        apiKey: this.keys.publicKey,
                        timestamp: this.nonce,
                        signature: hmac
                    },
                    json: true,
                };
                if (qs) {
                    opts.qs = qs;
                }
                const resp = yield rp.get(opts);
                return resp;
            }
            catch (err) {
                throw err;
            }
        });
    }
    callPublic(method) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${this.base}${method}`;
            try {
                const opts = {
                    uri: uri,
                    json: true,
                };
                const resp = yield rp.get(opts);
                return resp;
            }
            catch (err) {
                throw err;
            }
        });
    }
    generateHmac(method) {
        this.nonce = new Date().valueOf();
        const message = [
            method,
            this.nonce
        ];
        const hash = crypto.createHmac('sha512', new Buffer(this.keys.privateKey, 'base64'))
            .update(message.join("\n") + "\n")
            .digest('base64');
        return hash;
    }
    marketOrderBook(coin, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/orderbook`);
            return resp;
        });
    }
    marketTick(coin, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/tick`);
            return resp;
        });
    }
    marketTrades(coin, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/trades`);
            return resp;
        });
    }
    tradingFee(instrument, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield this.callPrivate(`/account/${instrument}/${currency}/tradingfee`);
            if (resp.tradingFeeRate > 0) {
                resp.tradingFeeRate = resp.tradingFeeRate / this.accountFloat;
            }
            if (resp.volume30Day > 0) {
                resp.volume30Day = resp.volume30Day / this.accountFloat;
            }
            return resp;
        });
    }
    accountBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield this.callPrivate('/account/balance');
            resp = resp.map(account => {
                if (account.balance > 0) {
                    account.balance = account.balance / this.accountFloat;
                }
                if (account.pendingFunds > 0) {
                    account.pendingFunds = account.pendingFunds / this.accountFloat;
                }
                return account;
            });
            return resp;
        });
    }
}
exports.BTCMarkets = BTCMarkets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxzQ0FBc0M7QUFXdEM7SUFTRSxZQUFZLFNBQWlCLEVBQUUsVUFBa0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFYSxXQUFXLENBQUMsTUFBYyxFQUFFLEVBQVc7O1lBQ25ELE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBSXZDLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksR0FBb0I7b0JBQzVCLEdBQUcsRUFBRSxHQUFHO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7d0JBQ3JCLFNBQVMsRUFBRSxJQUFJO3FCQUNoQjtvQkFDRCxJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDO2dCQUVGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsQ0FBQztnQkFFRCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixN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