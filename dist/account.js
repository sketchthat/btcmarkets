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
class Account {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.apiPrefix = '/account';
        this.common = new common_1.Common();
    }
    balance() {
        return __awaiter(this, void 0, void 0, function* () {
            const r = authentication_1.createHmac(`${this.apiPrefix}/balance`, this.publicKey, this.privateKey);
            const balances = yield this.common.request('GET', r.path, null, null, r.headers);
            return balances.map(b => this.common.adjustBalance(b, ['balance', 'pendingFunds']));
        });
    }
    tradingFees(instrument, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = authentication_1.createHmac(`${this.apiPrefix}/${instrument}/${currency}/tradingfee`, this.publicKey, this.privateKey);
            const tradingFee = yield this.common.request('GET', r.path, null, null, r.headers);
            return this.common.adjustBalance(tradingFee, ['tradingFeeRate', 'volume30Day']);
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsOERBQXVEO0FBS3ZEO0lBT0UsWUFDRSxTQUFrQixFQUNsQixVQUFtQjtRQUVuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLDJCQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqRixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7S0FBQTtJQUVZLFdBQVcsQ0FBQyxVQUFrQixFQUFFLFFBQWdCOztZQUMzRCxNQUFNLENBQUMsR0FBRywyQkFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLElBQUksUUFBUSxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFaEgsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQztLQUFBO0NBQ0Y7QUFsQ0QsMEJBa0NDIn0=