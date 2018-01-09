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
    callPrivate(method) {
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
                    json: true
                };
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
    getTradingFee(instrument, currency) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxzQ0FBc0M7QUFNdEM7SUFVRSxZQUFZLFNBQWlCLEVBQUUsVUFBa0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFYSxXQUFXLENBQUMsTUFBYzs7WUFDdEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxHQUFHO29CQUNYLEdBQUcsRUFBRSxHQUFHO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7d0JBQ3JCLFNBQVMsRUFBRSxJQUFJO3FCQUNoQjtvQkFDRCxJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDO2dCQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sR0FBRyxDQUFDO1lBQ1osQ0FBQztRQUNILENBQUM7S0FBQTtJQUVhLFVBQVUsQ0FBQyxNQUFjOztZQUNyQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJ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